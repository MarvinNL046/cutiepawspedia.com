import { Camera } from "lucide-react";

interface PhotoCreditProps {
  photographerName?: string;
  photographerUrl?: string;
  source?: "unsplash" | "pexels" | "custom";
  className?: string;
}

/**
 * Subtle photo credit overlay for featured images
 * Compliant with Unsplash/Pexels attribution requirements
 */
export function PhotoCredit({ 
  photographerName, 
  photographerUrl,
  source = "unsplash",
  className = "" 
}: PhotoCreditProps) {
  if (!photographerName) return null;

  const sourceLabel = {
    unsplash: "Unsplash",
    pexels: "Pexels",
    custom: "",
  };

  const content = (
    <>
      <Camera className="w-3 h-3" />
      <span>{photographerName}</span>
      {source !== "custom" && sourceLabel[source] && (
        <>
          <span className="opacity-50">•</span>
          <span className="opacity-75">{sourceLabel[source]}</span>
        </>
      )}
    </>
  );

  if (photographerUrl) {
    return (
      <a
        href={photographerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute bottom-3 right-3 flex items-center gap-1.5 text-white/80 text-xs bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 hover:bg-black/60 hover:text-white transition-all ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      className={`absolute bottom-3 right-3 flex items-center gap-1.5 text-white/80 text-xs bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 ${className}`}
    >
      {content}
    </span>
  );
}

export default PhotoCredit;
