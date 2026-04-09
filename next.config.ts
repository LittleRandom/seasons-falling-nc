import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Serve at /seasons so plainrandom.com/seasons routes correctly
  basePath: "/seasons",
};

export default nextConfig;
