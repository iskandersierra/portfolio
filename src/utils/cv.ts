export interface CvBasics {
	name: string;
	title: string;
	description: string;
	yearsOfExperience: number;
}

export interface CvExternalProfile {
	label: string;
	href: string;
	copy: string;
}

export interface CvWorkHistoryEntry {
	company: string;
	location: string;
	role: string;
	startYear: number;
	endYear: number | 'present';
	summary: string;
	experiences: string[];
}

export interface CvLanguageEntry {
	language: string;
	proficiency: string;
}

export interface CvTechnologyEntry {
	name: string;
	proficiency: 'high' | 'fluent' | 'basic';
}

export interface CvTechnologyGroup {
	title: string;
	entries: CvTechnologyEntry[];
}

export interface CvEducationEntry {
	institution: string;
	location: string;
	degree: string;
	year: number;
	thesis?: string;
}

export interface CvPublicationEntry {
	title: string;
	type: 'paper' | 'article' | 'book' | 'course';
	venue: string;
	year: number;
	detail?: string;
	identifier?: string;
}

export interface CanonicalCv {
	basics: CvBasics;
	externalProfiles: CvExternalProfile[];
	workHistory: CvWorkHistoryEntry[];
	spokenLanguages: CvLanguageEntry[];
	programmingLanguages: CvTechnologyGroup[];
	backendTechnologies: CvTechnologyGroup[];
	frontendTechnologies: CvTechnologyGroup[];
	education: CvEducationEntry[];
	publications: CvPublicationEntry[];
}

export interface AboutExpertiseNode {
	signal: string;
	label: string;
	detail: string;
}

export interface AboutProfileModule {
	title: string;
	copy: string;
}

export interface AboutExperienceArcEntry {
	signal: string;
	span: string;
	title: string;
	copy: string;
	points: string[];
}

export interface AboutEducationModule {
	signal: string;
	title: string;
	copy: string;
}

export interface AboutProfileLink {
	signal: string;
	label: string;
	href: string;
	copy: string;
}

export interface AboutProfileRole {
	label: string;
}

export interface AboutViewModel {
	heroIntro: string;
	profileRoles: AboutProfileRole[];
	expertise: AboutExpertiseNode[];
	profileModules: AboutProfileModule[];
	experienceTimeline: AboutExperienceArcEntry[];
	educationModules: AboutEducationModule[];
	profileLinks: AboutProfileLink[];
}

export const canonicalCv: CanonicalCv = {
	basics: {
		name: 'Iskander Sierra',
		title: 'Full-Stack Developer, Software Architect, and Technical Lead',
		description:
			'Senior full-stack developer, software architect, and technical lead with 25 years of experience building software, leading delivery, and documenting continuous learning.',
		yearsOfExperience: 25,
	},
	externalProfiles: [
		{
			label: 'GitHub',
			href: 'https://github.com/iskandersierra',
			copy: 'Code, experiments, and the public trail of shipped work.',
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/iskandersierra/',
			copy: 'Professional profile, background context, and direct contact path.',
		},
	],
	workHistory: [
		{
			company: 'TEST, Tecnologia de sistemas, S.L.U.',
			location: 'USA',
			role: 'Freelance Software Analyst, Architect and Developer',
			startYear: 2020,
			endYear: 'present',
			summary:
				'Design and development of a microservice architecture using Microsoft technologies to integrate third-party smart-building systems into a single platform and user-facing application.',
			experiences: [
				'.NET Core',
				'ASP.NET Core',
				'Microsoft Orleans',
				'Microservice Architecture',
				'Docker',
				'Kubernetes',
				'Azure DevOps',
				'Azure Cosmos DB',
				'Azure Time Series Insights',
				'Azure Active Directory',
				'Azure Storage',
				'Azure Service Bus',
				'Blazor WebAssembly',
				'OpenTelemetry',
				'Seq',
				'Jaeger',
				'nginx',
				'ML.NET',
				'Azure Cognitive Services',
				'Event Sourcing',
				'CQRS',
				'NATS',
				'GraphQL',
				'OpenAPI',
			],
		},
		{
			company: 'TheNewPush LLC',
			location: 'Spain',
			role: 'Contractor Senior Developer',
			startYear: 2019,
			endYear: 2020,
			summary: 'Development of features for an identity and security analysis system.',
			experiences: ['Angular', 'NestJS', 'TypeScript'],
		},
		{
			company: 'Test JG S.A. Grupo JG Ingenieros',
			location: 'Spain',
			role: 'Freelance Software Analyst, Architect and Developer',
			startYear: 2012,
			endYear: 2019,
			summary:
				'Design, development, and maintenance of a facility-management platform for hospitals, offices, and shopping centers across backend and frontend layers.',
			experiences: ['C#', 'ASP.NET', 'Entity Framework', 'CSLA', 'WCF', 'JavaScript', 'AngularJS'],
		},
		{
			company: 'AleaSoft Energy Forecasting',
			location: 'Spain',
			role: 'Software Developer',
			startYear: 2010,
			endYear: 2011,
			summary:
				'Software component development for optimization of generation costs, supply-demand prices, and other parameters in the Spanish energy market, including heuristics for high-speed decision making.',
			experiences: ['C++', 'Optimization Algorithms', 'Spain Energy Markets'],
		},
		{
			company: 'RentACoder platform clients',
			location: 'Cuba',
			role: 'Freelance Software Developer',
			startYear: 2008,
			endYear: 2010,
			summary: 'Delivered software solutions remotely for multiple clients through the RentACoder platform.',
			experiences: [],
		},
		{
			company: 'University of la Habana',
			location: 'Cuba',
			role: 'Introduction to Programming Professor',
			startYear: 2003,
			endYear: 2008,
			summary:
				'Taught basic and object-oriented programming to computer-science students across five years, working in Java and C#.',
			experiences: ['Java', 'C#'],
		},
		{
			company: 'University of Informatics Sciences (UCI)',
			location: 'Cuba',
			role: 'Mathematical Logic Professor',
			startYear: 2002,
			endYear: 2003,
			summary: 'Taught mathematical logic to first-year students during the university\'s founding year.',
			experiences: [],
		},
	],
	spokenLanguages: [
		{ language: 'Spanish', proficiency: 'Native language' },
		{ language: 'English', proficiency: 'High proficiency' },
	],
	programmingLanguages: [
		{
			title: 'Highly proficient',
			entries: [
				{ name: 'C#', proficiency: 'high' },
				{ name: 'F#', proficiency: 'high' },
				{ name: 'JavaScript', proficiency: 'high' },
				{ name: 'TypeScript', proficiency: 'high' },
				{ name: 'HTML', proficiency: 'high' },
				{ name: 'CSS', proficiency: 'high' },
			],
		},
		{
			title: 'Fluent',
			entries: [{ name: 'Python', proficiency: 'fluent' }],
		},
		{
			title: 'Basic knowledge',
			entries: [
				{ name: 'Go', proficiency: 'basic' },
				{ name: 'Kotlin', proficiency: 'basic' },
				{ name: 'Rust', proficiency: 'basic' },
				{ name: 'Clojure', proficiency: 'basic' },
				{ name: 'Racket', proficiency: 'basic' },
				{ name: 'Haskell', proficiency: 'basic' },
			],
		},
	],
	backendTechnologies: [
		{
			title: 'Highly proficient',
			entries: [
				{ name: 'ASP.NET Core', proficiency: 'high' },
				{ name: 'Web Services', proficiency: 'high' },
				{ name: 'OpenAPI', proficiency: 'high' },
				{ name: 'MongoDB', proficiency: 'high' },
				{ name: 'MSSQL Server', proficiency: 'high' },
				{ name: 'RabbitMQ', proficiency: 'high' },
				{ name: 'PostgreSQL', proficiency: 'high' },
				{ name: 'Redis', proficiency: 'high' },
				{ name: 'Microsoft Orleans', proficiency: 'high' },
				{ name: 'Azure services', proficiency: 'high' },
				{ name: 'Entity Framework', proficiency: 'high' },
				{ name: 'Kubernetes', proficiency: 'high' },
				{ name: 'Docker', proficiency: 'high' },
				{ name: 'OpenTelemetry', proficiency: 'high' },
				{ name: 'Helm', proficiency: 'high' },
				{ name: 'GraphQL', proficiency: 'high' },
				{ name: 'Microservices Architecture', proficiency: 'high' },
				{ name: 'Event Sourcing', proficiency: 'high' },
				{ name: 'CQRS', proficiency: 'high' },
			],
		},
		{
			title: 'Fluent',
			entries: [
				{ name: 'Google Cloud Services', proficiency: 'fluent' },
				{ name: 'TensorFlow', proficiency: 'fluent' },
				{ name: 'Event Driven Architecture', proficiency: 'fluent' },
				{ name: 'Istio', proficiency: 'fluent' },
				{ name: 'Linkerd', proficiency: 'fluent' },
				{ name: 'Traefik', proficiency: 'fluent' },
				{ name: 'Akka.NET', proficiency: 'fluent' },
				{ name: 'Elastic Stack', proficiency: 'fluent' },
				{ name: 'CouchDB', proficiency: 'fluent' },
				{ name: 'Cassandra DB', proficiency: 'fluent' },
				{ name: 'Neo4j', proficiency: 'fluent' },
				{ name: 'Consul', proficiency: 'fluent' },
			],
		},
	],
	frontendTechnologies: [
		{
			title: 'Highly proficient',
			entries: [
				{ name: 'ASP.NET Core', proficiency: 'high' },
				{ name: 'Blazor', proficiency: 'high' },
				{ name: 'JavaScript', proficiency: 'high' },
				{ name: 'TypeScript', proficiency: 'high' },
				{ name: 'HTML', proficiency: 'high' },
				{ name: 'CSS', proficiency: 'high' },
				{ name: 'React', proficiency: 'high' },
				{ name: 'VueJS', proficiency: 'high' },
				{ name: 'Android Native', proficiency: 'high' },
				{ name: 'Bootstrap', proficiency: 'high' },
			],
		},
		{
			title: 'Fluent',
			entries: [
				{ name: 'Angular', proficiency: 'fluent' },
				{ name: 'AngularJS', proficiency: 'fluent' },
				{ name: 'React Native', proficiency: 'fluent' },
				{ name: 'WPF', proficiency: 'fluent' },
				{ name: 'Electron', proficiency: 'fluent' },
				{ name: 'jQuery', proficiency: 'fluent' },
				{ name: 'NativeScript', proficiency: 'fluent' },
				{ name: 'D3', proficiency: 'fluent' },
				{ name: 'PlotlyJS', proficiency: 'fluent' },
				{ name: 'Forge Viewer', proficiency: 'fluent' },
			],
		},
	],
	education: [
		{
			institution: 'Mathematics-Computer Sciences Faculty, University of la Havana',
			location: 'Cuba',
			degree: 'Computer Science Degree',
			year: 2002,
			thesis: 'Distributed and Concurrent Execution in Java. Separate Object Implementation Proposal',
		},
	],
	publications: [
		{
			title: 'Patrones de interaccion entre objetos Separate en Java',
			type: 'paper',
			venue: 'International Event IDEAS 2002',
			year: 2002,
			detail: 'Havana City, Cuba',
		},
		{
			title: 'Java Object Oriented Distributed Environment',
			type: 'paper',
			venue: 'International Event IDEAS 2002',
			year: 2002,
			detail: 'Havana City, Cuba',
		},
		{
			title: 'Java Distributed Separate Object',
			type: 'article',
			venue: 'Journal Magazine of Object Technology',
			year: 2002,
			detail: 'vol. 1, no. 2, pages 119-142. ISSN 1660-1769. July-August 2002',
		},
		{
			title: 'Metaprogramming in .NET',
			type: 'paper',
			venue: 'International Event IDEAS 2004',
			year: 2004,
			detail: 'Arequipa, Peru',
		},
		{
			title: 'Online course: Windows Presentation Foundation',
			type: 'course',
			venue: 'Online publication',
			year: 2007,
		},
		{
			title: 'Windows Presentation Foundation',
			type: 'book',
			venue: 'Netalia S.L.',
			year: 2007,
			identifier: 'ISBN 978-84-934895-5-7',
		},
		{
			title: 'Como definir nuestros propios paneles personalizados en WPF',
			type: 'article',
			venue: 'dotNetMania',
			year: 2007,
			detail: 'No. 35, March 2007',
		},
		{
			title: 'Entrando en la tercera dimension',
			type: 'article',
			venue: 'dotNetMania',
			year: 2007,
			detail: 'No. 37, May 2007',
		},
		{
			title: 'Visual Studio 2008. Desafia todos los retos.',
			type: 'book',
			venue: 'Netalia S.L.',
			year: 2008,
			identifier: 'ISBN 978-84-934895-7-1',
		},
	],
};

export const aboutViewModel: AboutViewModel = {
	heroIntro:
		'I am a full-stack developer, software architect, and team technical lead focused on building dependable systems, helping teams move with clarity, and staying curious enough to keep learning.',
	profileRoles: [
		{ label: 'architect' },
		{ label: 'developer' },
		{ label: 'technical lead' },
		{ label: 'continuous learner' },
	],
	expertise: [
		{
			signal: 'N01',
			label: '.NET architecture',
			detail: 'Feature-driven services, dependable boundaries, and systems that stay understandable as they grow.',
		},
		{
			signal: 'N02',
			label: 'Team technical leadership',
			detail: 'Leading through clarity, design reviews, and delivery habits that raise the technical floor for the team.',
		},
		{
			signal: 'N03',
			label: 'TypeScript and JavaScript',
			detail: 'Building interfaces and tooling that feel considered, not assembled, while keeping performance and semantics intact.',
		},
		{
			signal: 'N04',
			label: 'Azure and cloud delivery',
			detail: 'Shipping cloud systems with operational discipline, practical observability, and steady release flow.',
		},
		{
			signal: 'N05',
			label: 'Docker and Kubernetes',
			detail: 'Containerized development and deployment patterns that support repeatable environments and calm operations.',
		},
		{
			signal: 'N06',
			label: 'Computer science fundamentals',
			detail: 'The foundations that keep architecture, debugging, and tradeoff decisions grounded in first principles.',
		},
	],
	profileModules: [
		{
			title: 'System role',
			copy: 'Full-stack developer, software architect, and technical lead working across product delivery and engineering quality.',
		},
		{
			title: 'Operating mode',
			copy: 'I do my best work where architecture and implementation stay connected, so strategy still cashes out as working software.',
		},
		{
			title: 'What this site does',
			copy: 'It makes long-term learning visible through real posts, tools, and design decisions instead of a static list of claims.',
		},
	],
	experienceTimeline: [
		{
			signal: 'A01',
			span: '25 years in software',
			title: 'Engineering depth before abstraction',
			copy:
				'The foundation is still hands-on software delivery: building features, debugging real systems, and learning which fundamentals keep paying off as stacks change.',
			points: ['application delivery', 'debugging discipline', 'computer science fundamentals'],
		},
		{
			signal: 'A02',
			span: 'architecture + delivery leadership',
			title: 'Systems thinking at product scale',
			copy:
				'That experience grew into architecture work, technical direction, and release planning where reliability, maintainability, and team clarity matter as much as raw implementation speed.',
			points: ['architecture decisions', 'technical leadership', 'delivery flow'],
		},
		{
			signal: 'A03',
			span: 'current operating mode',
			title: 'Learning in public through shipped work',
			copy:
				'The current arc connects writing, tools, and design experiments so the portfolio shows how ideas move from principles to implementation instead of living as disconnected claims.',
			points: ['writing', 'tooling', 'continuous learning'],
		},
	],
	educationModules: [
		{
			signal: 'E01',
			title: 'Computer science background',
			copy:
				'A computer science foundation still anchors the way I reason about architecture, debugging, tradeoffs, and long-term maintainability.',
		},
		{
			signal: 'E02',
			title: 'Working philosophy',
			copy:
				'I prefer systems where architecture remains close to implementation, teams can explain why the design exists, and learning keeps improving the work instead of staying theoretical.',
		},
	],
	profileLinks: canonicalCv.externalProfiles.map((profile, index) => ({
		signal: `L0${index + 1}`,
		label: profile.label,
		href: profile.href,
		copy: profile.copy,
	})),
};

export const buildAboutProfileSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'Person',
	'@id': 'https://isksz.com/about/#person',
	name: canonicalCv.basics.name,
	url: 'https://isksz.com/about/',
	description: canonicalCv.basics.description,
	jobTitle: canonicalCv.basics.title,
	sameAs: canonicalCv.externalProfiles.map((profile) => profile.href),
	knowsAbout: aboutViewModel.expertise.map((item) => item.label),
});
