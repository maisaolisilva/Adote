/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ],
      },
      compiler: {
        // Ativa suporte nativo a styled-components
        styledComponents: true,
      },
};

export default nextConfig;
