/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", process.env.IMAGE_URL, "via.placeholder.com", "img.freepik.com"],
    },
};

export default nextConfig;
