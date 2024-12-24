/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Add rewrites to proxy API requests
    async rewrites() {
        return [
            {
                source: "/api/:path*", // Match all /api routes
                destination: "http://localhost:3000/api/:path*", // Replace with your backend server URL
            },
        ];
    },

    // Allow images to be loaded from localhost (or any other required domains)
    images: {
        domains: ["localhost"], // Add other domains as needed
    },

    // Add staticPageGenerationTimeout if required
    staticPageGenerationTimeout: 60,
};

export default nextConfig;
