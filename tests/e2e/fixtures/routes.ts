export const primaryRoutes = [
	{ navLabel: 'index', path: '/', heading: '"Never stop learning."' },
	{ navLabel: 'about', path: '/about', heading: 'About' },
	{ navLabel: 'blog', path: '/blog', heading: 'Blog' },
	{ navLabel: 'tools', path: '/tools', heading: 'Tools' },
] as const;

interface SeoExpectation {
	name: string;
	path: string;
	title: string;
	description: string;
	canonicalUrl: string;
	pageType: 'website' | 'article';
	twitterCard: 'summary' | 'summary_large_image';
	socialImageUrl?: string;
}

export const seoExpectations: SeoExpectation[] = [
	{
		name: 'home',
		path: '/',
		title: 'Iskander Sierra | ~/iskander',
		description:
			"After 25 years in software, the most valuable thing I've learned is that there's always more to learn. This is my living portfolio, where I share what I know, experiment with new ideas, and document the journey.",
		canonicalUrl: 'https://isksz.com/',
		pageType: 'website',
		twitterCard: 'summary_large_image',
		socialImageUrl: 'https://isksz.com/social-card.svg',
	},
	{
		name: 'about',
		path: '/about',
		title: 'About | Iskander Sierra',
		description:
			'Learn more about Iskander Sierra, a senior full-stack developer, architect, and technical lead with 25 years of experience building software and teams.',
		canonicalUrl: 'https://isksz.com/about',
		pageType: 'website',
		twitterCard: 'summary',
	},
	{
		name: 'blog',
		path: '/blog',
		title: 'Blog | Iskander Sierra',
		description:
			'Read notes on software architecture, technical leadership, cloud delivery, and long-term learning from Iskander Sierra.',
		canonicalUrl: 'https://isksz.com/blog',
		pageType: 'website',
		twitterCard: 'summary',
	},
	{
		name: 'tools',
		path: '/tools',
		title: 'Tools | Iskander Sierra',
		description:
			'Browse developer tools and experiments from Iskander Sierra, starting with practical browser-based utilities built as Astro pages and islands.',
		canonicalUrl: 'https://isksz.com/tools',
		pageType: 'website',
		twitterCard: 'summary',
	},
];
