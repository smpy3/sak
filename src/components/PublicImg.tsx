/* This component renders a public/ static image using a relative URL (so it works on GitHub Pages basePath). */
/* eslint-disable @next/next/no-img-element */

import type { ImgHTMLAttributes } from "react";

export default function PublicImg({
  src,
  alt,
  className,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  // We intentionally avoid leading "/" so the path becomes relative (works on /repo-name/).
  const rawSrc = typeof src === "string" ? src : "";
  const safeSrc = rawSrc.startsWith("/") ? rawSrc.slice(1) : rawSrc;

  return (
    <img
      src={safeSrc}
      alt={alt ?? ""}
      className={className}
      {...rest}
    />
  );
}
