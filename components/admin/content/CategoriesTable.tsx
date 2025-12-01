"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  slug: string;
  labelKey: string;
  icon: string | null;
  placeCount: number;
}

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories: initialCategories }: CategoriesTableProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({ slug: "", labelKey: "", icon: "" });

  const resetForm = () => {
    setFormData({ slug: "", labelKey: "", icon: "" });
    setError(null);
  };

  const generateLabelKey = (slug: string) => {
    return `categories.${slug.replace(/-/g, "_")}`;
  };

  const handleSlugChange = (slug: string) => {
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setFormData((prev) => ({
      ...prev,
      slug: cleanSlug,
      labelKey: prev.labelKey || generateLabelKey(cleanSlug),
    }));
  };

  const handleAdd = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        slug: formData.slug,
        labelKey: formData.labelKey,
        icon: formData.icon || null,
      };

      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create category");
      }

      const { category } = await res.json();
      setCategories((prev) => [...prev, { ...category, placeCount: 0 }]);
      setIsAddOpen(false);
      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editingCategory) return;

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        slug: formData.slug,
        labelKey: formData.labelKey,
        icon: formData.icon || null,
      };

      const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update category");
      }

      const { category } = await res.json();
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...category, placeCount: editingCategory.placeCount }
            : c
        )
      );
      setIsEditOpen(false);
      setEditingCategory(null);
      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete category");
      }

      setCategories((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      slug: category.slug,
      labelKey: category.labelKey,
      icon: category.icon || "",
    });
    setError(null);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {categories.length} categories total
        </p>

        <Dialog open={isAddOpen} onOpenChange={(open) => {
          setIsAddOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Add a new service category for places.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="e.g. pet-hotels"
                />
                <p className="text-xs text-muted-foreground">
                  Lowercase letters, numbers, and hyphens only
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="labelKey">Label Key (i18n)</Label>
                <Input
                  id="labelKey"
                  value={formData.labelKey}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, labelKey: e.target.value }))
                  }
                  placeholder="e.g. categories.pet_hotels"
                />
                <p className="text-xs text-muted-foreground">
                  Translation key for the category name
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon Name (optional)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, icon: e.target.value }))
                  }
                  placeholder="e.g. Building2"
                />
                <p className="text-xs text-muted-foreground">
                  Lucide icon name (e.g. Building2, Heart, Star)
                </p>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={isLoading || !formData.slug}>
                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No categories yet. Add your first category to get started.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slug</TableHead>
              <TableHead>Label Key</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Places</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.slug}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">
                  {category.labelKey}
                </TableCell>
                <TableCell>
                  {category.icon ? (
                    <Badge variant="outline">{category.icon}</Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{category.placeCount}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(category)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {category.slug}</span>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={category.placeCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete {category.slug}</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &quot;{category.slug}&quot;?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(category.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={(open) => {
        setIsEditOpen(open);
        if (!open) {
          setEditingCategory(null);
          resetForm();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update category information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-slug">URL Slug</Label>
              <Input
                id="edit-slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-labelKey">Label Key (i18n)</Label>
              <Input
                id="edit-labelKey"
                value={formData.labelKey}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, labelKey: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-icon">Icon Name (optional)</Label>
              <Input
                id="edit-icon"
                value={formData.icon}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, icon: e.target.value }))
                }
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
