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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface City {
  id: number;
  name: string;
  slug: string;
  countryId: number;
  countryName: string | null;
  placeCount: number;
}

interface Country {
  id: number;
  name: string;
}

interface CitiesTableProps {
  cities: City[];
  countries: Country[];
}

export function CitiesTable({ cities: initialCities, countries }: CitiesTableProps) {
  const router = useRouter();
  const [cities, setCities] = useState(initialCities);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    countryId: "",
    lat: "",
    lng: "",
  });

  const resetForm = () => {
    setFormData({ name: "", slug: "", countryId: "", lat: "", lng: "" });
    setError(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }));
  };

  const handleAdd = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        countryId: parseInt(formData.countryId, 10),
        lat: formData.lat ? parseFloat(formData.lat) : null,
        lng: formData.lng ? parseFloat(formData.lng) : null,
      };

      const res = await fetch("/api/admin/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create city");
      }

      const { city } = await res.json();
      const country = countries.find((c) => c.id === city.countryId);
      setCities((prev) => [
        ...prev,
        { ...city, countryName: country?.name || null, placeCount: 0 },
      ]);
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
    if (!editingCity) return;

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        countryId: parseInt(formData.countryId, 10),
        lat: formData.lat ? parseFloat(formData.lat) : null,
        lng: formData.lng ? parseFloat(formData.lng) : null,
      };

      const res = await fetch(`/api/admin/cities/${editingCity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update city");
      }

      const { city } = await res.json();
      const country = countries.find((c) => c.id === city.countryId);
      setCities((prev) =>
        prev.map((c) =>
          c.id === editingCity.id
            ? {
                ...city,
                countryName: country?.name || null,
                placeCount: editingCity.placeCount,
              }
            : c
        )
      );
      setIsEditOpen(false);
      setEditingCity(null);
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
      const res = await fetch(`/api/admin/cities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete city");
      }

      setCities((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (city: City) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      slug: city.slug,
      countryId: city.countryId.toString(),
      lat: "",
      lng: "",
    });
    setError(null);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {cities.length} cities total
        </p>

        <Dialog open={isAddOpen} onOpenChange={(open) => {
          setIsAddOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="sm" disabled={countries.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              Add City
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add City</DialogTitle>
              <DialogDescription>
                Add a new city to the directory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.countryId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, countryId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id.toString()}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Amsterdam"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    }))
                  }
                  placeholder="e.g. amsterdam"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="lat">Latitude (optional)</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, lat: e.target.value }))
                    }
                    placeholder="e.g. 52.3676"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lng">Longitude (optional)</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, lng: e.target.value }))
                    }
                    placeholder="e.g. 4.9041"
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={isLoading || !formData.countryId}>
                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Add City
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {cities.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No cities yet. Add cities to your countries.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Places</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell className="font-medium">{city.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {city.countryName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {city.slug}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{city.placeCount}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(city)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {city.name}</span>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={city.placeCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete {city.name}</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete City?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {city.name}? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(city.id)}
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
          setEditingCity(null);
          resetForm();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit City</DialogTitle>
            <DialogDescription>
              Update city information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-country">Country</Label>
              <Select
                value={formData.countryId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, countryId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id.toString()}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-lat">Latitude</Label>
                <Input
                  id="edit-lat"
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, lat: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-lng">Longitude</Label>
                <Input
                  id="edit-lng"
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, lng: e.target.value }))
                  }
                />
              </div>
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
