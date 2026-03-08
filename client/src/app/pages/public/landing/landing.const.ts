import { AboutContent } from '@component/about';
import { FaqContent } from '@component/faq';
import { FeaturesContent } from '@component/features';
import { FinalCtaContent } from '@component/final-cta';
import { HeroContent, HeroLayout } from '@component/hero';
import { HowItWorksContent } from '@component/how-it-works';
import { PricingContent } from '@component/pricing';
import { ShowcaseContent } from '@component/showcase';
import { TestimonialsContent } from '@component/testimonials';
import { TrustBarContent } from '@component/trust-bar';
import { UseCasesContent } from '@component/use-cases';

export interface LandingHeroSection {
	id: string;
	layout: HeroLayout;
	content: HeroContent;
}

const sharedHeroCtas = [
	{
		label: 'Get started',
		targetId: 'pricing',
		variant: 'primary' as const,
		icon: 'arrow_forward',
	},
	{
		label: 'Explore features',
		targetId: 'features',
		variant: 'ghost' as const,
		icon: 'play_arrow',
	},
];

export const centeredHeroContent: HeroContent = {
	badge: {
		icon: 'flare',
		text: 'Centered hero',
	},
	title: 'Build once and reuse across every product surface.',
	description:
		'This layout matches announcement-style heroes with centered copy, stacked actions, and optional logos or media below the fold.',
	ctas: sharedHeroCtas,
	meta: {
		icon: 'verified',
		text: 'Good for marketing entry points and video-led intros',
	},
	logos: [
		{ icon: 'inventory_2', label: 'Studio' },
		{ icon: 'menu_book', label: 'Education' },
		{ icon: 'view_in_ar', label: 'Framework' },
		{ icon: 'groups', label: 'Community' },
	],
	highlights: [
		{
			icon: 'rocket_launch',
			title: 'Fast launch',
			desc: 'Start with strong narrative, actions, and trust cues.',
		},
		{
			icon: 'movie',
			title: 'Media ready',
			desc: 'Project a video or promo block directly from the page.',
		},
	],
};

export const splitHeroContent: HeroContent = {
	badge: {
		icon: 'splitscreen',
		text: 'Split hero',
	},
	title: 'Balance product story on the left with visual proof on the right.',
	description:
		'Use the split layout for launch pages, product overviews, and email capture sections where the hero needs text plus a focused visual.',
	ctas: sharedHeroCtas,
	meta: {
		icon: 'tips_and_updates',
		text: 'Designed for forms, screenshots, and side media',
	},
	metrics: [
		{
			icon: 'dashboard',
			value: '24',
			label: 'Reusable sections',
			description: 'Composable blocks aligned around one token system.',
		},
		{
			icon: 'bolt',
			value: '21',
			label: 'Angular-first stack',
			description: 'Signals, standalone components, and strong defaults.',
		},
	],
	logos: [
		{ icon: 'inventory_2', label: 'Studio' },
		{ icon: 'menu_book', label: 'Education' },
		{ icon: 'view_in_ar', label: 'Framework' },
	],
};

export const panelHeroContent: HeroContent = {
	badge: {
		icon: 'dashboard_customize',
		text: 'Panel hero',
	},
	title: 'Let the page own a side panel while the hero keeps the shell and rhythm.',
	description:
		'This variant is for login, signup, and request flows where the right side changes often and should be fully projected from the page.',
	ctas: [
		{
			label: 'Watch video',
			targetId: 'features',
			variant: 'primary',
			icon: 'videocam',
		},
	],
	meta: {
		icon: 'person_add',
		text: 'Ideal for auth cards, request forms, and signup panels',
	},
	metrics: [
		{
			value: '42k',
			label: 'Active users',
		},
		{
			value: '3k',
			label: 'Professional creators',
		},
		{
			value: '560k',
			label: 'Weekly downloads',
		},
	],
	note: {
		title: 'Page-controlled panel',
		icon: 'widgets',
		desc: 'The form card is projected through ng-content, so the hero stays reusable.',
	},
};

export const backgroundHeroContent: HeroContent = {
	badge: {
		icon: 'landscape',
		text: 'Background hero',
	},
	title: 'Use imagery as atmosphere without hardcoding structure into the component.',
	description:
		'Background layout works for travel, hospitality, and campaign pages where a large image sets the mood and the form stays page-owned.',
	ctas: [
		{
			label: 'Sign in / Register',
			targetId: 'pricing',
			variant: 'primary',
			icon: 'login',
		},
	],
	backgroundImage:
		'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
	note: {
		title: 'Background image support',
		icon: 'image',
		desc: 'The hero renders the backdrop while the page projects the booking or search form.',
	},
};

export const dashboardHeroContent: HeroContent = {
	badge: {
		icon: 'query_stats',
		text: 'Dashboard hero',
	},
	title: 'Show dense product value without losing hero clarity.',
	description:
		'The dashboard layout gives you a strong content column plus a richer visual column for charts, system cards, or product snapshots.',
	ctas: sharedHeroCtas,
	meta: {
		icon: 'insights',
		text: 'Best when the hero needs product story and interface proof together',
	},
	metrics: [
		{
			icon: 'dashboard',
			value: '24',
			label: 'Composable sections',
			description: 'Reusable blocks aligned around one token system.',
		},
		{
			icon: 'school',
			value: '3',
			label: 'Connected pillars',
			description: 'Studio, education, and framework in one loop.',
		},
		{
			icon: 'bolt',
			value: '21',
			label: 'Angular-first stack',
			description: 'Signals, standalone components, and zoneless-ready patterns.',
		},
	],
	highlights: [
		{
			icon: 'rocket_launch',
			title: 'Fast delivery',
			desc: 'Reusable UI and clean architecture reduce rebuilds.',
		},
		{
			icon: 'school',
			title: 'Hands-on learning',
			desc: 'Lessons grow directly out of production code and reviews.',
		},
		{
			icon: 'extension',
			title: 'Shared framework',
			desc: 'Promote repeatables to libs and scale the next product faster.',
		},
	],
};

export const heroSections: LandingHeroSection[] = [
	{ id: 'hero-centered', layout: 'centered', content: centeredHeroContent },
	{ id: 'hero-split', layout: 'split', content: splitHeroContent },
	{ id: 'hero-panel', layout: 'panel', content: panelHeroContent },
	{ id: 'hero-background', layout: 'background', content: backgroundHeroContent },
	{ id: 'hero-dashboard', layout: 'dashboard', content: dashboardHeroContent },
];

export const trustBarContent: TrustBarContent = {
	title: 'Trusted building blocks for product teams and learners',
	items: ['WAW Studio', 'WAW Education', 'WAW Framework', 'Open Source', 'Community'],
};

export const aboutContent: AboutContent = {
	sectionId: 'about',
	title: 'Common problems, solved with one system',
	description:
		'Most teams waste time rebuilding UI, struggling with inconsistent patterns, and learning in isolation.',
	painPoints: [
		{
			title: 'Building products takes too long',
			desc: 'Teams get stuck in rewrites, inconsistent UI, and slow delivery cycles.',
		},
		{
			title: 'Learning rarely matches real work',
			desc: 'Tutorials do not translate into production-ready architecture and habits.',
		},
	],
	solutionsTitle: 'What you get',
	solutions: [
		{
			title: 'Ship modular features faster',
			desc: 'A consistent UI system and modern Angular patterns reduce friction and rework.',
		},
		{
			title: 'Learn by building real products',
			desc: 'Education content is derived from production code and real project workflows.',
		},
	],
	ctas: [
		{
			label: 'See how it works',
			targetId: 'features',
			variant: 'primary',
		},
		{ label: 'Read FAQ', targetId: 'faq', variant: 'ghost' },
	],
};

export const featuresContent: FeaturesContent = {
	sectionId: 'features',
	title: 'Key features',
	description:
		'A set of focused building blocks that help you ship faster, teach better, and reuse more.',
	items: [
		{
			icon: 'rocket_launch',
			title: 'Fast delivery',
			desc: 'Reusable patterns and token-driven design speed up building and iteration.',
		},
		{
			icon: 'extension',
			title: 'Modular architecture',
			desc: 'Small, scalable building blocks you can recombine across projects.',
		},
	],
};

export const howItWorksContent: HowItWorksContent = {
	sectionId: 'how',
	title: 'How it works',
	description: 'Keep it simple: start, build, promote reuse.',
	steps: [
		{
			title: 'Choose a path',
			desc: 'Start with a project goal: product, feature, or learning track.',
			icon: 'trending_up',
		},
		{
			title: 'Build with the system',
			desc: 'Compose sections and components using tokens and clean patterns.',
			icon: 'trending_up',
		},
		{
			title: 'Reuse and scale',
			desc: 'Promote repeatables into shared libs and ship the next project faster.',
			icon: 'trending_up',
		},
	],
};

export const showcaseContent: ShowcaseContent = {
	sectionId: 'showcase',
	title: 'Product showcase',
	description: 'Three parts of one ecosystem, pick a view.',
	defaultTabId: 'studio',
	tabs: [
		{
			id: 'studio',
			label: 'Studio',
			title: 'Build real products with a modular system',
			desc: 'Deliver production features with a consistent UI foundation and scalable architecture.',
			bullets: [
				'Feature delivery',
				'Design tokens',
				'Clean component boundaries',
				'Performance defaults',
			],
		},
		{
			id: 'education',
			label: 'Education',
			title: 'Learn by working on live projects',
			desc: 'Turn production code into learning material, practical skills you actually use.',
			bullets: ['Hands-on tasks', 'Code reviews', 'Real constraints', 'Progressive complexity'],
		},
	],
	primaryCtaLabel: 'View pricing',
	primaryCtaTargetId: 'pricing',
	secondaryCtaLabel: 'Questions?',
	secondaryCtaTargetId: 'faq',
};

export const useCasesContent: UseCasesContent = {
	sectionId: 'use-cases',
	title: 'Benefits for every role',
	description: 'Tailor outcomes without changing the foundation.',
	items: [
		{
			title: 'For founders',
			bullets: ['Validate faster', 'Ship MVPs with fewer rewrites', 'Build a reusable base'],
		},
		{
			title: 'For teams',
			bullets: ['Consistent UI and architecture', 'Shared components', 'Faster onboarding'],
		},
		{
			title: 'For developers',
			bullets: ['Modern Angular skills', 'Real project experience', 'Reusable patterns'],
		},
	],
};

export const testimonialsContent: TestimonialsContent = {
	sectionId: 'testimonials',
	title: 'What people say',
	description: 'Short, real outcomes, keep it credible.',
	items: [
		{
			quote: 'We stopped rebuilding the same UI and started shipping features weekly.',
			name: 'A. Product Lead',
			role: 'SaaS Team',
		},
		{
			quote: 'Learning directly from production patterns made my day-to-day work cleaner and faster.',
			name: 'D. Frontend Dev',
			role: 'Angular Engineer',
		},
	],
};

export const pricingContent: PricingContent = {
	sectionId: 'pricing',
	title: 'Pricing',
	description: 'Start free, then upgrade when you are shipping or scaling reuse.',
	plans: [
		{
			id: 'starter',
			name: 'Starter',
			blurb: 'For individuals exploring the system.',
			priceMonthly: 0,
			priceYearly: 0,
			features: ['Landing templates', 'Basic components'],
		},
		{
			id: 'pro',
			name: 'Pro',
			blurb: 'For building and learning seriously.',
			priceMonthly: 19,
			priceYearly: 190,
			highlight: true,
			features: ['Full component set', 'Example app patterns'],
		},
	],
};

export const faqContent: FaqContent = {
	sectionId: 'faq',
	title: 'FAQ',
	description: 'Quick answers to reduce hesitation.',
	items: [
		{
			q: 'Is this only for Angular?',
			a: 'WAW is centered on a modern Angular ecosystem, but many architectural patterns and token-driven design ideas apply broadly.',
		},
		{
			q: 'Does it support dark theme?',
			a: 'Yes, the UI is token-driven and automatically adapts to your global html.dark token overrides.',
		},
	],
};

export const finalCtaContent: FinalCtaContent = {
	sectionId: 'final-cta',
	title: 'Ready to ship faster and reuse more?',
	description:
		'Start with the landing template, then grow into a full product system with modern Angular patterns and token-driven UI.',
	buttons: [
		{ label: 'Start now', targetId: 'pricing', variant: 'primary' },
		{ label: 'See features', targetId: 'features', variant: 'ghost' },
	],
};
