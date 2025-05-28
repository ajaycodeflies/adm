/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:3000/api/:path*",
            },
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "adm.localserverpro.com",
                pathname: "/uploads/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "/uploads/**",
            },
        ],
    },


    staticPageGenerationTimeout: 60,
};

export default nextConfig;
