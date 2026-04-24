import type { NextConfig } from "next";

/* This config supports normal hosting + GitHub Pages static export (no server). */

const isGitHubPages =
  process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS === "true";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")?.[1] ?? "";
const basePath = isGitHubPages && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  // We use static export for GitHub Pages, and normal server output elsewhere.
  ...(isGitHubPages ? { output: "export" } : {}),
  ...(isGitHubPages ? { trailingSlash: true } : {}),
  ...(isGitHubPages
    ? {
        basePath,
        assetPrefix: basePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
