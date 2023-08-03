/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'collection-creater.onrender.com',
			},
		],
	},
};

// localhost
// collection-creater.onrender.com

module.exports = nextConfig;
