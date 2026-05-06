export const platforms = {
	googlescholar: 'Google Scholar',
	github: 'GitHub',
	linkedin: 'LinkedIn',
	x: 'X (Twitter)'
};

export const formatPlatform = (icon) => {
	return platforms[icon] || icon;
};
