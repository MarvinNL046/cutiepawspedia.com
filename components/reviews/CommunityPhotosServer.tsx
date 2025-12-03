/**
 * Server component wrapper for CommunityPhotos
 *
 * Fetches approved photos for a place and renders the gallery.
 */

import { getApprovedPhotosByPlaceId } from "@/db/queries/reviewPhotos";
import { getReviewPhotoUrl } from "@/lib/storage/reviewPhotos";
import { CommunityPhotos, type CommunityPhoto } from "./CommunityPhotos";

interface CommunityPhotosServerProps {
  placeId: number;
  placeName: string;
  maxVisible?: number;
  className?: string;
}

export async function CommunityPhotosServer({
  placeId,
  placeName,
  maxVisible = 6,
  className,
}: CommunityPhotosServerProps) {
  // Fetch approved photos from database
  const dbPhotos = await getApprovedPhotosByPlaceId(placeId, 20);

  if (dbPhotos.length === 0) {
    return null;
  }

  // Transform to component format with URLs
  const photos: CommunityPhoto[] = dbPhotos.map((photo) => ({
    id: photo.id,
    url: getReviewPhotoUrl(photo.storageKey),
    width: photo.width,
    height: photo.height,
    altText: photo.altText,
    reviewId: photo.reviewId,
    createdAt: photo.createdAt.toISOString(),
  }));

  return (
    <CommunityPhotos
      photos={photos}
      placeName={placeName}
      maxVisible={maxVisible}
      className={className}
    />
  );
}
