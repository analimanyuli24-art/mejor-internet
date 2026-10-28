import type { ReactNode } from "react";
import { getIconSrc, getLogoSrc } from "../../utils/getIconSrc";

interface ImagePlaceholderProps {
  name: string;
  className?: string;
  children?: ReactNode;
  type?: "icon" | "logo";
}

function ImagePlaceholder({
  name,
  className = "",
  children,
  type = "icon",
}: ImagePlaceholderProps) {
  const src = type === "logo" ? getLogoSrc(name) : getIconSrc(name);

  return (
    <div
      data-image={name}
      className={`flex items-center justify-center ${className}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-contain" />
      ) : (
        children
      )}
    </div>
  );
}

export default ImagePlaceholder;
