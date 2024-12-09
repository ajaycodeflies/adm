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
};

export default nextConfig;
