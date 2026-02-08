import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	PLATFORM_ID,
	signal,
} from '@angular/core';
import { FooterComponent } from '@layout/footer';
import { AboutContent, AboutSectionComponent } from '@pageComponent/about';
import { FaqContent, FaqSectionComponent } from '@pageComponent/faq';
import {
	FeaturesContent,
	FeaturesSectionComponent,
} from '@pageComponent/features';
import {
	FinalCtaContent,
	FinalCtaSectionComponent,
} from '@pageComponent/final-cta';
import { HeroContent, HeroSectionComponent } from '@pageComponent/hero';
import {
	HowItWorksContent,
	HowItWorksSectionComponent,
} from '@pageComponent/how-it-works';
import { MarkedSectionComponent } from '@pageComponent/marked';
import {
	PricingContent,
	PricingSectionComponent,
} from '@pageComponent/pricing';
import {
	ShowcaseContent,
	ShowcaseSectionComponent,
} from '@pageComponent/showcase';
import {
	TestimonialsContent,
	TestimonialsSectionComponent,
} from '@pageComponent/testimonials';
import {
	TrustBarContent,
	TrustBarSectionComponent,
} from '@pageComponent/trust-bar';
import {
	UseCasesContent,
	UseCasesSectionComponent,
} from '@pageComponent/use-cases';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './landing.component.html',
	imports: [
		MarkedSectionComponent,
		HeroSectionComponent,
		TrustBarSectionComponent,
		AboutSectionComponent,
		FeaturesSectionComponent,
		HowItWorksSectionComponent,
		ShowcaseSectionComponent,
		UseCasesSectionComponent,
		TestimonialsSectionComponent,
		PricingSectionComponent,
		FaqSectionComponent,
		FinalCtaSectionComponent,
		FooterComponent,
	],
})
export class LandingComponent {
	private readonly _http = inject(HttpClient);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	markdown = signal<string>('');

	constructor() {
		if (this._isBrowser) {
			this._http
				.get('/assets/README.md', { responseType: 'text' })
				.subscribe({
					next: (markdown) => this.markdown.set(markdown as string),
				});
		}
	}

	readonly heroContent: HeroContent = {
		badge: {
			icon: 'auto_awesome',
			text: 'Build • Teach • Reuse • Scale',
		},
		title: 'A modular ecosystem to ship products and grow developers.',
		description:
			'Web Art Work combines a software studio, an education platform, and a reusable framework — all driven by production-grade patterns and a token-based UI system.',
		ctas: [
			{ label: 'Get started', targetId: 'pricing', variant: 'primary' },
			{
				label: 'Explore features',
				targetId: 'features',
				variant: 'ghost',
			},
		],
		meta: {
			icon: 'verified',
			text: 'Token-driven UI • Modern Angular',
		},
		card: {
			title: 'Starter template',
			subtitle: 'Sections + patterns',
			icon: 'grid_view',
			miniCards: [
				{
					icon: 'rocket_launch',
					title: 'Fast delivery',
					desc: 'Reusable UI + architecture',
				},
				{
					icon: 'school',
					title: 'Hands-on learning',
					desc: 'From real production code',
				},
				{
					icon: 'extension',
					title: 'Shared framework',
					desc: 'Promote repeatables to libs',
				},
			],
			note: {
				title: 'Ready in minutes',
				icon: 'bolt',
				desc: 'Standalone components, signals, OnPush, and token-driven theming.',
			},
		},
	};

	readonly trustBarContent: TrustBarContent = {
		title: 'Trusted building blocks for product teams and learners',
		items: [
			'WAW Studio',
			'WAW Education',
			'WAW Framework',
			'Open Source',
			'Community',
		],
	};

	readonly aboutContent: AboutContent = {
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
				desc: 'Tutorials don’t translate into production-ready architecture and habits.',
			},
		],
		solutionsTitle: 'What you get',
		solutions: [
			{
				title: 'Ship modular features faster',
				desc: 'A consistent UI system + modern Angular patterns reduce friction and rework.',
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

	readonly featuresContent: FeaturesContent = {
		sectionId: 'features',
		title: 'Key features',
		description:
			'A set of focused building blocks that help you ship faster, teach better, and reuse more.',
		items: [
			{
				icon: 'rocket_launch',
				title: 'Fast delivery',
				desc: 'Reusable patterns + token-driven design speed up building and iteration.',
			},
			{
				icon: 'extension',
				title: 'Modular architecture',
				desc: 'Small, scalable building blocks you can recombine across projects.',
			},
		],
	};

	readonly howItWorksContent: HowItWorksContent = {
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
				desc: 'Compose sections and components using tokens + clean patterns.',
				icon: 'trending_up',
			},
			{
				title: 'Reuse and scale',
				desc: 'Promote repeatables into shared libs and ship the next project faster.',
				icon: 'trending_up',
			},
		],
	};

	readonly showcaseContent: ShowcaseContent = {
		sectionId: 'showcase',
		title: 'Product showcase',
		description: 'Three parts of one ecosystem — pick a view.',
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
				desc: 'Turn production code into learning material — practical skills you actually use.',
				bullets: [
					'Hands-on tasks',
					'Code reviews',
					'Real constraints',
					'Progressive complexity',
				],
			},
		],
		primaryCtaLabel: 'View pricing',
		primaryCtaTargetId: 'pricing',
		secondaryCtaLabel: 'Questions?',
		secondaryCtaTargetId: 'faq',
	};

	readonly useCasesContent: UseCasesContent = {
		sectionId: 'use-cases',
		title: 'Benefits for every role',
		description: 'Tailor outcomes without changing the foundation.',
		items: [
			{
				title: 'For founders',
				bullets: [
					'Validate faster',
					'Ship MVPs with fewer rewrites',
					'Build a reusable base',
				],
			},
			{
				title: 'For teams',
				bullets: [
					'Consistent UI + architecture',
					'Shared components',
					'Faster onboarding',
				],
			},
			{
				title: 'For developers',
				bullets: [
					'Modern Angular skills',
					'Real project experience',
					'Reusable patterns',
				],
			},
		],
	};

	readonly testimonialsContent: TestimonialsContent = {
		sectionId: 'testimonials',
		title: 'What people say',
		description: 'Short, real outcomes — keep it credible.',
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

	readonly pricingContent: PricingContent = {
		sectionId: 'pricing',
		title: 'Pricing',
		description:
			'Start free, then upgrade when you’re shipping or scaling reuse.',
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

	readonly faqContent: FaqContent = {
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
				a: 'Yes — the UI is token-driven and automatically adapts to your global `html.dark` token overrides.',
			},
		],
	};

	readonly finalCtaContent: FinalCtaContent = {
		sectionId: 'final-cta',
		title: 'Ready to ship faster and reuse more?',
		description:
			'Start with the landing template, then grow into a full product system — with modern Angular patterns and token-driven UI.',
		buttons: [
			{ label: 'Start now', targetId: 'pricing', variant: 'primary' },
			{ label: 'See features', targetId: 'features', variant: 'ghost' },
		],
	};
}
