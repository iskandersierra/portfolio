export const primaryRoutes = [
	{ navLabel: 'Home', path: '/', heading: 'Never stop learning.' },
	{ navLabel: 'Blog', path: '/blog', heading: 'Blog' },
	{ navLabel: 'Projects', path: '/projects', heading: 'Projects' },
	{ navLabel: 'About', path: '/about', heading: 'About' },
] as const;

interface SeoExpectation {
	name: string;
	path: string;
	title: string;
	description: string;
	canonicalUrl: string;
	pageType: 'website' | 'article';
	twitterCard: 'summary' | 'summary_large_image';
	siteName: string;
	socialImageUrl: string;
	socialImageAlt?: string;
}

export const seoExpectations: SeoExpectation[] = [
	{
		name: 'home',
		path: '/',
		title: 'Iskander Sierra | ~/iskander',
		description:
			"After 25 years in software, the most valuable thing I've learned is that there's always more to learn. This is the portfolio for current writing, current projects, and the work that connects them.",
		canonicalUrl: 'https://isksz.com/',
		pageType: 'website',
		twitterCard: 'summary_large_image',
		siteName: 'Iskander Sierra',
		socialImageUrl: 'https://isksz.com/social-card.png',
		socialImageAlt:
			"Preview card for Iskander Sierra's portfolio with a terminal-inspired visual treatment.",
	},
	{
		name: 'about',
		path: '/about',
		title: 'About | Iskander Sierra',
		description:
			'Learn more about Iskander Sierra, a senior full-stack developer, architect, and technical lead with 25 years of experience building software and teams.',
		canonicalUrl: 'https://isksz.com/about/',
		pageType: 'website',
		twitterCard: 'summary_large_image',
		siteName: 'Iskander Sierra',
		socialImageUrl: 'https://isksz.com/social-card.png',
	},
	{
		name: 'blog',
		path: '/blog',
		title: 'Blog | Iskander Sierra',
		description:
			'Read notes on software architecture, technical leadership, cloud delivery, and long-term learning from Iskander Sierra.',
		canonicalUrl: 'https://isksz.com/blog/',
		pageType: 'website',
		twitterCard: 'summary_large_image',
		siteName: 'Iskander Sierra',
		socialImageUrl: 'https://isksz.com/social-card.png',
	},
	{
		name: 'projects',
		path: '/projects',
		title: 'Projects | Iskander Sierra',
		description:
			'Browse projects from Iskander Sierra, including tools, repositories, and experiments collected under a single projects surface.',
		canonicalUrl: 'https://isksz.com/projects/',
		pageType: 'website',
		twitterCard: 'summary_large_image',
		siteName: 'Iskander Sierra',
		socialImageUrl: 'https://isksz.com/social-card.png',
	},
	{
		name: 'project detail',
		path: '/projects/uuid-ulid-generator',
		title: 'UUID / ULID Generator | Iskander Sierra',
		description:
			'Generate UUID v4 or ULID values in the browser with copy-friendly output and a lightweight interface.',
		canonicalUrl: 'https://isksz.com/projects/uuid-ulid-generator/',
		pageType: 'website',
		twitterCard: 'summary_large_image',
		siteName: 'Iskander Sierra',
		socialImageUrl: 'https://isksz.com/social-card.png',
	},
];
