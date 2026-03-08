import { ArticleContent, ArticleLayout } from '@component/article';
import { ArticlesContent, ArticlesLayout } from '@component/articles';
import { CardContent, CardLayout } from '@component/card';
import { ContentLayout, ContentSectionContent } from '@component/content';
import { CtaContent, CtaLayout } from '@component/cta';
import { FeaturesContent, FeaturesLayout } from '@component/features';
import { HeroContent, HeroLayout } from '@component/hero';
import { MarketingContent, MarketingLayout } from '@component/marketing';
import { MemberContent, MemberLayout } from '@component/member';
import { ModalContent, ModalLayout } from '@component/modal';
import { NavigationContent, NavigationLayout } from '@component/navigation';
import { ProductContent, ProductLayout } from '@component/product';
import { ProductsContent, ProductsLayout } from '@component/products';
import { SocialContent, SocialLayout } from '@component/social';
import { TablesContent, TablesLayout } from '@component/tables';
import { TeamContent, TeamLayout } from '@component/team';
import { UtilityContent, UtilityLayout } from '@component/utility';

export interface LandingHeroSection {
	id: string;
	layout: HeroLayout;
	content: HeroContent;
}

export interface LandingComponentSection<TContent, TLayout extends string> {
	id: string;
	title: string;
	layout: TLayout;
	content: TContent;
}

const sharedHeroCtas = [
	{
		label: 'Get started',
		targetId: 'hero-panel',
		variant: 'primary' as const,
		icon: 'arrow_forward',
	},
	{
		label: 'Explore layouts',
		targetId: 'hero-dashboard',
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
			label: 'View dashboard layout',
			targetId: 'hero-dashboard',
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
			label: 'Browse panel layout',
			targetId: 'hero-panel',
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

export const navigationSection: LandingComponentSection<NavigationContent, NavigationLayout> = {
	id: 'navigation-preview',
	title: 'Navigation',
	layout: 'topbar',
	content: {
		title: 'Explore every layout from one adaptive nav shell.',
		description:
			'Top bar actions, grouped links, and brand metadata stay configurable from content.',
		brand: {
			label: 'Ngx Platform',
			href: '#hero-centered',
		},
		links: [
			{ label: 'Home', href: '#hero-centered', active: true, icon: 'home' },
			{ label: 'Features', href: '#features-preview', icon: 'extension' },
			{ label: 'Articles', href: '#articles-preview', icon: 'article' },
			{ label: 'Contact', href: '#cta-preview', icon: 'call_made' },
		],
		actions: [
			{ label: 'Sign in', href: '#member-preview', variant: 'ghost' },
			{ label: 'Start trial', href: '#product-preview', variant: 'primary' },
		],
	},
};

export const contentSection: LandingComponentSection<ContentSectionContent, ContentLayout> = {
	id: 'content-preview',
	title: 'Content',
	layout: 'split',
	content: {
		title: 'Long-form copy, mixed media, and structured narrative blocks.',
		description:
			'Use the content section when the page needs more than a hero but less than a full article template.',
		blocks: [
			{
				eyebrow: 'Story block',
				title: 'Keep editorial rhythm without hardcoding templates.',
				body: 'Each block can carry copy, media, and supporting text while the page controls ordering.',
			},
			{
				eyebrow: 'Media block',
				title: 'Drop in screenshots, photos, or recorded walkthroughs.',
				body: 'The section supports mixed arrangements for product pages, case studies, and guides.',
				media: {
					type: 'image',
					src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
					alt: 'Workspace',
					caption: 'Media stays optional per block.',
				},
			},
		],
	},
};

export const featuresSection: LandingComponentSection<FeaturesContent, FeaturesLayout> = {
	id: 'features-preview',
	title: 'Features',
	layout: 'grid',
	content: {
		title: 'Feature grids stay clean, even when the message shifts by page.',
		description: 'A reusable shape for benefits, capabilities, and selling points.',
		items: [
			{
				icon: 'bolt',
				title: 'Fast setup',
				desc: 'Content-driven APIs with standalone components.',
			},
			{
				icon: 'category',
				title: 'Composable',
				desc: 'Layouts switch without replacing the component.',
			},
			{
				icon: 'translate',
				title: 'Translation-ready',
				desc: 'All labels route through the translation pipe.',
			},
		],
		footer: 'Add projected content if one feature needs custom visuals.',
	},
};

export const ctaSection: LandingComponentSection<CtaContent, CtaLayout> = {
	id: 'cta-preview',
	title: 'CTA',
	layout: 'banner',
	content: {
		eyebrow: 'Conversion block',
		title: 'Drive the next action with one focused component.',
		description: 'Use it for trial starts, contact prompts, upgrades, or internal jumps.',
		actions: [
			{
				label: 'Book a demo',
				href: '#modal-preview',
				variant: 'primary',
				icon: 'calendar_month',
			},
			{
				label: 'Read docs',
				href: '#articles-preview',
				variant: 'secondary',
				icon: 'menu_book',
			},
		],
		note: 'Projected content can hold forms, badges, or legal notes.',
	},
};

export const cardSection: LandingComponentSection<CardContent, CardLayout> = {
	id: 'card-preview',
	title: 'Card',
	layout: 'preview',
	content: {
		badge: 'Reusable card',
		title: 'Compact summary for dashboards, lists, or promo rails.',
		description:
			'Cards can surface media, metadata, and small action groups without extra wrappers.',
		media: {
			src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
			alt: 'Code workspace',
		},
		meta: [
			{ label: 'Projects', value: '24' },
			{ label: 'Status', value: 'Active' },
		],
		actions: [
			{
				label: 'Open summary',
				href: '#utility-preview',
				variant: 'primary',
				icon: 'north_east',
			},
		],
	},
};

export const socialSection: LandingComponentSection<SocialContent, SocialLayout> = {
	id: 'social-preview',
	title: 'Social',
	layout: 'testimonials',
	content: {
		title: 'Show trust through quotes, ratings, and proof points.',
		description: 'This section can pivot between testimonials and compact trust signals.',
		quotes: [
			{
				quote: 'Reusable sections reduced duplicate page code across launches.',
				name: 'Olena K.',
				role: 'Product designer',
				avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
			},
			{
				quote: 'The API is direct enough for engineers and flexible enough for content teams.',
				name: 'Dmytro S.',
				role: 'Engineering lead',
				avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
			},
		],
		signals: [
			{ icon: 'star', value: '4.9/5', label: 'Average rating' },
			{ icon: 'verified', value: '120+', label: 'Trusted teams' },
		],
	},
};

export const teamSection: LandingComponentSection<TeamContent, TeamLayout> = {
	id: 'team-preview',
	title: 'Team',
	layout: 'grid',
	content: {
		title: 'Highlight the people behind the work.',
		description:
			'Use the overview grid for leadership, contributors, speakers, or maintainers.',
		members: [
			{
				name: 'Iryna Petrenko',
				role: 'Creative director',
				bio: 'Shapes product narratives and visual systems across launches.',
				avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80',
				links: [{ label: 'Profile', href: '#member-preview' }],
			},
			{
				name: 'Taras Melnyk',
				role: 'Frontend architect',
				bio: 'Owns Angular architecture, tooling, and reusable section APIs.',
				avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
				links: [{ label: 'Profile', href: '#member-preview' }],
			},
		],
	},
};

export const memberSection: LandingComponentSection<MemberContent, MemberLayout> = {
	id: 'member-preview',
	title: 'Member',
	layout: 'profile',
	content: {
		name: 'Taras Melnyk',
		role: 'Frontend architect',
		avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
		bio: 'Leads component architecture, design system integration, and platform-level Angular decisions.',
		stats: [
			{ label: 'Projects shipped', value: '18' },
			{ label: 'Years building UI systems', value: '9' },
		],
		links: [
			{ label: 'LinkedIn', href: '#team-preview', icon: 'share' },
			{ label: 'Articles', href: '#articles-preview', icon: 'article' },
		],
	},
};

export const articlesSection: LandingComponentSection<ArticlesContent, ArticlesLayout> = {
	id: 'articles-preview',
	title: 'Articles',
	layout: 'grid',
	content: {
		title: 'List posts, guides, news, or editorial updates.',
		description: 'Great for blog overviews and content hubs.',
		items: [
			{
				title: 'How to scale reusable Angular page sections',
				excerpt:
					'A practical approach to keeping content-driven sections maintainable over time.',
				image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
				category: 'Guide',
				date: 'March 2026',
				href: '#article-preview',
			},
			{
				title: 'When to promote landing sections into shared libraries',
				excerpt: 'A review checklist for deciding if a page pattern is ready for reuse.',
				image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
				category: 'Architecture',
				date: 'March 2026',
				href: '#article-preview',
			},
		],
	},
};

export const articleSection: LandingComponentSection<ArticleContent, ArticleLayout> = {
	id: 'article-preview',
	title: 'Article',
	layout: 'cover',
	content: {
		title: 'Single article layout for long-form reading experiences.',
		description: 'Combine cover media, metadata, and structured body sections.',
		cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80',
		meta: [
			{ label: 'Author', value: 'Ngx Platform Team' },
			{ label: 'Read time', value: '6 min' },
		],
		sections: [
			{
				heading: 'Why shared sections matter',
				body: 'Landing pages evolve quickly. Shared sections reduce rewrites and keep API decisions visible.',
			},
			{
				heading: 'What to keep page-owned',
				body: 'Forms, route-specific actions, and unusual media often belong in projection slots instead of the base component.',
			},
		],
	},
};

export const productsSection: LandingComponentSection<ProductsContent, ProductsLayout> = {
	id: 'products-preview',
	title: 'Products',
	layout: 'grid',
	content: {
		title: 'Product collections, bundles, or categories.',
		description: 'Use the list view for storefront rails or internal catalogs.',
		items: [
			{
				name: 'Design system starter',
				description: 'A reusable UI foundation with tokens, layouts, and starter sections.',
				image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
				price: '$49',
				tag: 'Starter',
				href: '#product-preview',
			},
			{
				name: 'Content block bundle',
				description: 'Section variants for marketing, editorial, and product storytelling.',
				image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80',
				price: '$79',
				tag: 'Bundle',
				href: '#product-preview',
			},
		],
	},
};

export const productSection: LandingComponentSection<ProductContent, ProductLayout> = {
	id: 'product-preview',
	title: 'Product',
	layout: 'detail',
	content: {
		name: 'Design system starter',
		description: 'A detailed product card with gallery, specs, pricing, and action buttons.',
		price: '$49 one-time',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
				alt: 'Dashboard preview',
			},
			{
				src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
				alt: 'Workspace preview',
			},
		],
		specs: [
			{ label: 'License', value: 'MIT' },
			{ label: 'Stack', value: 'Angular 21' },
		],
		actions: [
			{ label: 'Buy now', href: '#cta-preview', variant: 'primary', icon: 'shopping_cart' },
			{ label: 'Compare', href: '#products-preview', variant: 'secondary', icon: 'balance' },
		],
	},
};

export const tablesSection: LandingComponentSection<TablesContent, TablesLayout> = {
	id: 'tables-preview',
	title: 'Tables',
	layout: 'default',
	content: {
		title: 'Structured data with optional row actions.',
		description:
			'Useful for pricing comparisons, admin previews, and compact reporting tables.',
		columns: [
			{ key: 'plan', label: 'Plan' },
			{ key: 'seats', label: 'Seats' },
			{ key: 'price', label: 'Price' },
		],
		rows: [
			{
				cells: { plan: 'Starter', seats: '5', price: '$29' },
				actions: [{ label: 'Select', href: '#cta-preview', variant: 'primary' }],
			},
			{
				cells: { plan: 'Growth', seats: '25', price: '$79' },
				actions: [{ label: 'Select', href: '#cta-preview', variant: 'primary' }],
			},
		],
	},
};

export const modalSection: LandingComponentSection<ModalContent, ModalLayout> = {
	id: 'modal-preview',
	title: 'Modal',
	layout: 'dialog',
	content: {
		title: 'Modal shell for focused decisions or forms.',
		description:
			'The base component provides the overlay and panel while page content stays projected.',
		actions: [
			{
				label: 'Confirm',
				href: '#marketing-preview',
				variant: 'primary',
				icon: 'check_circle',
			},
			{ label: 'Learn more', href: '#article-preview', variant: 'secondary', icon: 'info' },
		],
		dismissLabel: 'Maybe later',
	},
};

export const marketingSection: LandingComponentSection<MarketingContent, MarketingLayout> = {
	id: 'marketing-preview',
	title: 'Marketing',
	layout: 'campaign',
	content: {
		eyebrow: 'Campaign banner',
		title: 'Promotions and announcements can live in their own reusable shell.',
		description: 'Use this for launches, discount windows, event promos, or ecosystem updates.',
		highlight: 'Spring release: 16 new page components ready for review.',
		actions: [
			{
				label: 'Explore all',
				href: '#navigation-preview',
				variant: 'primary',
				icon: 'explore',
			},
			{
				label: 'Read article',
				href: '#article-preview',
				variant: 'secondary',
				icon: 'article',
			},
		],
	},
};

export const utilitySection: LandingComponentSection<UtilityContent, UtilityLayout> = {
	id: 'utility-preview',
	title: 'Utility',
	layout: 'error',
	content: {
		status: '404',
		title: 'Fallback, maintenance, and empty states belong in a reusable system too.',
		description:
			'This component covers system-level messaging without page-specific hardcoding.',
		actions: [
			{ label: 'Go home', href: '#hero-centered', variant: 'primary', icon: 'home' },
			{
				label: 'Contact support',
				href: '#cta-preview',
				variant: 'secondary',
				icon: 'support_agent',
			},
		],
	},
};
