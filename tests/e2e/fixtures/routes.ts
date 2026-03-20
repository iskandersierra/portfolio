export const primaryRoutes = [
	{ navLabel: 'Home', path: '/', heading: '"Never stop learning."' },
	{ navLabel: 'About', path: '/about', heading: 'About' },
	{ navLabel: 'Blog', path: '/blog', heading: 'Blog' },
	{ navLabel: 'Tools', path: '/tools', heading: 'Tools' },
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
			"After 25 years in software, the most valuable thing I've learned is that there's always more to learn. This is my living portfolio, where I share what I know, experiment with new ideas, and document the journey.",
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
		name: 'blog post',
		path: '/blog/vertical-slice-architecture-in-dotnet',
		title: 'Vertical Slice Architecture in .NET: Why I stopped fighting the folder structure | Iskander Sierra',
		description:
			'A launch post about organizing .NET applications around features instead of forcing every change through a layered folder maze.',
		canonicalUrl: 'https://isksz.com/blog/vertical-slice-architecture-in-dotnet/',
		pageType: 'article',
		twitterCard: 'summary_large_image',
		siteName: 'Iskander Sierra',
		socialImageUrl: 'https://isksz.com/social-card.png',
	},
	{
		name: 'tools',
		path: '/tools',
		title: 'Tools | Iskander Sierra',
		description:
			'Browse developer tools and experiments from Iskander Sierra, starting with practical browser-based utilities built as Astro pages and islands.',
		canonicalUrl: 'https://isksz.com/tools/',
		pageType: 'website',
		twitterCard: 'summary_large_image',
		siteName: 'Iskander Sierra',
		socialImageUrl: 'https://isksz.com/social-card.png',
	},
	{
		name: 'tool detail',
		path: '/tools/uuid-ulid-generator',
		title: 'UUID / ULID generator | Iskander Sierra',
		description:
			'Generate UUID v4 or ULID values in the browser with copy-friendly output and a lightweight interface.',
		canonicalUrl: 'https://isksz.com/tools/uuid-ulid-generator/',
		pageType: 'website',
		twitterCard: 'summary_large_image',
		siteName: 'Iskander Sierra',
		socialImageUrl: 'https://isksz.com/social-card.png',
	},
];
