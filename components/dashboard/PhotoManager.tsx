"use client";

/**
 * Photo Manager Component
 *
 * Handles business photo upload, display, reordering, and deletion.
 * Enforces plan-based photo limits.
 */

import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Upload,
  Trash2,
  Star,
  MoreVertical,
  GripVertical,
  ImagePlus,
  Loader2,
  AlertCircle,
  CheckCircle,
  Edit,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Photo {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
  altText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
}

interface PhotoManagerProps {
  businessId: number;
  placeId: number;
  photos: Photo[];
  maxPhotos: number;
  planKey: string;
  locale: string;
}

const labels = {
  en: {
    title: "Business Photos",
    description: "Upload photos to showcase your business",
    uploadButton: "Upload Photos",
    noPhotos: "No photos yet",
    noPhotosDesc: "Upload photos to make your listing more attractive",
    photoLimit: "Photo Limit",
    photosUsed: "photos used",
    upgradeToAdd: "Upgrade your plan to add more photos",
    primary: "Primary",
    setPrimary: "Set as Primary",
    delete: "Delete",
    editAlt: "Edit Alt Text",
    uploading: "Uploading...",
    deleting: "Deleting...",
    uploadSuccess: "Photos uploaded successfully",
    uploadError: "Failed to upload photos",
    deleteConfirmTitle: "Delete Photo",
    deleteConfirmDesc: "Are you sure you want to delete this photo? This action cannot be undone.",
    cancel: "Cancel",
    confirm: "Delete",
    altTextLabel: "Alt Text",
    altTextPlaceholder: "Describe this image for accessibility",
    save: "Save",
    noPhotosAllowed: "Photo uploads are not available on the Free plan",
  },
  nl: {
    title: "Bedrijfsfoto's",
    description: "Upload foto's om je bedrijf te laten zien",
    uploadButton: "Foto's Uploaden",
    noPhotos: "Nog geen foto's",
    noPhotosDesc: "Upload foto's om je vermelding aantrekkelijker te maken",
    photoLimit: "Foto Limiet",
    photosUsed: "foto's gebruikt",
    upgradeToAdd: "Upgrade je abonnement om meer foto's toe te voegen",
    primary: "Primair",
    setPrimary: "Als Primair Instellen",
    delete: "Verwijderen",
    editAlt: "Alt Tekst Bewerken",
    uploading: "Uploaden...",
    deleting: "Verwijderen...",
    uploadSuccess: "Foto's succesvol geupload",
    uploadError: "Uploaden van foto's mislukt",
    deleteConfirmTitle: "Foto Verwijderen",
    deleteConfirmDesc: "Weet je zeker dat je deze foto wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.",
    cancel: "Annuleren",
    confirm: "Verwijderen",
    altTextLabel: "Alt Tekst",
    altTextPlaceholder: "Beschrijf deze afbeelding voor toegankelijkheid",
    save: "Opslaan",
    noPhotosAllowed: "Foto uploads zijn niet beschikbaar op het Gratis abonnement",
  },
  de: {
    title: "Geschäftsfotos",
    description: "Laden Sie Fotos hoch, um Ihr Unternehmen zu präsentieren",
    uploadButton: "Fotos Hochladen",
    noPhotos: "Noch keine Fotos",
    noPhotosDesc: "Laden Sie Fotos hoch, um Ihren Eintrag attraktiver zu machen",
    photoLimit: "Foto-Limit",
    photosUsed: "Fotos verwendet",
    upgradeToAdd: "Upgraden Sie Ihren Plan, um mehr Fotos hinzuzufügen",
    primary: "Primär",
    setPrimary: "Als Primär Festlegen",
    delete: "Löschen",
    editAlt: "Alt-Text Bearbeiten",
    uploading: "Hochladen...",
    deleting: "Löschen...",
    uploadSuccess: "Fotos erfolgreich hochgeladen",
    uploadError: "Fotos konnten nicht hochgeladen werden",
    deleteConfirmTitle: "Foto Löschen",
    deleteConfirmDesc: "Sind Sie sicher, dass Sie dieses Foto löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
    cancel: "Abbrechen",
    confirm: "Löschen",
    altTextLabel: "Alt-Text",
    altTextPlaceholder: "Beschreiben Sie dieses Bild für Barrierefreiheit",
    save: "Speichern",
    noPhotosAllowed: "Foto-Uploads sind im kostenlosen Plan nicht verfügbar",
  },
};

export function PhotoManager({
  businessId,
  placeId,
  photos: initialPhotos,
  maxPhotos,
  planKey,
  locale,
}: PhotoManagerProps) {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [deletePhotoId, setDeletePhotoId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [altText, setAltText] = useState("");

  const t = labels[locale as keyof typeof labels] || labels.en;
  const currentCount = photos.length;
  const canUpload = maxPhotos > 0 && currentCount < maxPhotos;
  const percentUsed = maxPhotos > 0 ? (currentCount / maxPhotos) * 100 : 0;

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("photos", file);
      });

      try {
        const response = await fetch(
          `/api/dashboard/business/${businessId}/places/${placeId}/photos`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        // Refresh the page to get updated photos
        router.refresh();

        // Optimistically update local state with uploaded photos
        if (data.uploaded) {
          const newPhotos = data.uploaded.map((p: { id: number; url: string; isPrimary: boolean; sortOrder: number }) => ({
            id: p.id,
            url: p.url,
            isPrimary: p.isPrimary,
            sortOrder: p.sortOrder,
            altText: null,
            caption: null,
            width: null,
            height: null,
            createdAt: new Date().toISOString(),
          }));
          setPhotos((prev) => [...prev, ...newPhotos]);
        }
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : t.uploadError);
      } finally {
        setIsUploading(false);
        // Reset the input
        e.target.value = "";
      }
    },
    [businessId, placeId, router, t.uploadError]
  );

  const handleDelete = useCallback(async () => {
    if (!deletePhotoId) return;

    setIsDeleting(true);
    const photoIdToDelete = deletePhotoId;
    // Clear any previous error
    setUploadError(null);

    try {
      const response = await fetch(
        `/api/dashboard/business/${businessId}/places/${placeId}/photos?photoId=${photoIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Delete failed");
      }

      if (result.success) {
        // Remove from local state first for immediate UI feedback
        setPhotos((prev) => prev.filter((p) => p.id !== photoIdToDelete));
        // Trigger server-side refresh to sync with database
        router.refresh();
      } else {
        throw new Error("Delete failed - no success response");
      }
    } catch (error) {
      console.error("Delete error:", error);
      // Show error to user - the photo wasn't actually deleted
      setUploadError(error instanceof Error ? error.message : "Failed to delete photo");
    } finally {
      setIsDeleting(false);
      setDeletePhotoId(null);
    }
  }, [deletePhotoId, businessId, placeId, router]);

  const handleSetPrimary = useCallback(
    async (photoId: number) => {
      try {
        const response = await fetch(
          `/api/dashboard/business/${businessId}/places/${placeId}/photos`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "setPrimary", photoId }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Update failed");
        }

        // Update local state
        setPhotos((prev) =>
          prev.map((p) => ({
            ...p,
            isPrimary: p.id === photoId,
          }))
        );
        router.refresh();
      } catch (error) {
        console.error("Set primary error:", error);
      }
    },
    [businessId, placeId, router]
  );

  const handleSaveAltText = useCallback(async () => {
    if (!editingPhoto) return;

    try {
      const response = await fetch(
        `/api/dashboard/business/${businessId}/places/${placeId}/photos`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photoId: editingPhoto.id, altText }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Update failed");
      }

      // Update local state
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === editingPhoto.id ? { ...p, altText } : p
        )
      );
      setEditingPhoto(null);
      router.refresh();
    } catch (error) {
      console.error("Save alt text error:", error);
    }
  }, [editingPhoto, altText, businessId, placeId, router]);

  // Sort photos by sortOrder then by isPrimary (primary first)
  const sortedPhotos = [...photos].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  return (
    <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
              <ImagePlus className="h-5 w-5 text-cpCoral" />
              {t.title}
            </CardTitle>
            <CardDescription className="dark:text-cpCream/70">{t.description}</CardDescription>
          </div>
          {canUpload && (
            <div>
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleUpload}
                disabled={isUploading}
              />
              <Button asChild disabled={isUploading}>
                <label htmlFor="photo-upload" className="cursor-pointer">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t.uploading}
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      {t.uploadButton}
                    </>
                  )}
                </label>
              </Button>
            </div>
          )}
        </div>

        {/* Plan limit indicator */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground dark:text-cpCream/70">{t.photoLimit}</span>
            <span className="font-medium text-foreground dark:text-cpCream">
              {currentCount} / {maxPhotos} {t.photosUsed}
            </span>
          </div>
          <Progress value={percentUsed} className="h-2" />
          {maxPhotos === 0 && (
            <p className="text-sm text-cpAmber flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {t.noPhotosAllowed}
            </p>
          )}
          {currentCount >= maxPhotos && maxPhotos > 0 && (
            <p className="text-sm text-cpAmber flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {t.upgradeToAdd}
            </p>
          )}
        </div>

        {uploadError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {uploadError}
          </div>
        )}
      </CardHeader>

      <CardContent>
        {sortedPhotos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground dark:text-cpCream/60">
            <ImagePlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50 dark:text-cpCream/40" />
            <p className="font-medium">{t.noPhotos}</p>
            <p className="text-sm">{t.noPhotosDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedPhotos.map((photo) => (
              <div
                key={photo.id}
                className={cn(
                  "group relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  photo.isPrimary
                    ? "border-cpCoral ring-2 ring-cpCoral/20"
                    : "border-border dark:border-cpAmber/30 hover:border-muted-foreground dark:hover:border-cpAmber/50"
                )}
              >
                <Image
                  src={photo.url}
                  alt={photo.altText || "Business photo"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Primary badge */}
                {photo.isPrimary && (
                  <Badge className="absolute top-2 left-2 bg-cpCoral text-white gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {t.primary}
                  </Badge>
                )}

                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="secondary">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {!photo.isPrimary && (
                        <DropdownMenuItem onClick={() => handleSetPrimary(photo.id)}>
                          <Star className="h-4 w-4 mr-2" />
                          {t.setPrimary}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingPhoto(photo);
                          setAltText(photo.altText || "");
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {t.editAlt}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setDeletePhotoId(photo.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deletePhotoId} onOpenChange={() => setDeletePhotoId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deleteConfirmTitle}</DialogTitle>
            <DialogDescription>{t.deleteConfirmDesc}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletePhotoId(null)}>
              {t.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t.deleting}
                </>
              ) : (
                t.confirm
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit alt text dialog */}
      <Dialog open={!!editingPhoto} onOpenChange={() => setEditingPhoto(null)}>
        <DialogContent className="dark:bg-cpSurface dark:border-cpAmber/20">
          <DialogHeader>
            <DialogTitle className="dark:text-cpCream">{t.editAlt}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-muted dark:bg-cpCharcoal">
              {editingPhoto && (
                <Image
                  src={editingPhoto.url}
                  alt={editingPhoto.altText || "Business photo"}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt-text" className="dark:text-cpCream">{t.altTextLabel}</Label>
              <Input
                id="alt-text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder={t.altTextPlaceholder}
                className="dark:bg-cpSurface dark:border-cpAmber/30 dark:text-cpCream"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPhoto(null)} className="dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10">
              {t.cancel}
            </Button>
            <Button onClick={handleSaveAltText} className="bg-cpCoral hover:bg-cpCoral/90">{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
