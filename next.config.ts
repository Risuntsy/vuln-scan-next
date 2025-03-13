import { locales } from "#/i18n";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => [
    ...locales.map((locale) => ({
      source: `/${locale}`,
      destination: `/${locale}/login`,
      permanent: true
    }))
  ]
};

export default nextConfig;
