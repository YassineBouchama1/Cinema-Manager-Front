/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
        domains: ["127.0.0.1", process.env.NEXT_PUBLIC_IMAGE_URL, "via.placeholder.com", "img.freepik.com", 'flowbite.com'],
    },
};

export default nextConfig;
