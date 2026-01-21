// src/app/pages/landing/landing.page.ts
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	signal,
} from '@angular/core';
import { HeroSectionComponent } from '@pageComponent/hero';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import {
	Faq,
	Feature,
	Plan,
	ShowcaseTabId,
	Step,
	Testimonial,
	UseCase,
} from './landing.types';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	imports: [FooterComponent, HeroSectionComponent],
})
export class LandingComponent {
	// UI state
	readonly showcaseTab = signal<ShowcaseTabId>('studio');
	readonly billing = signal<'monthly' | 'yearly'>('monthly');
	readonly openFaq = signal<number | null>(0);

	// Content (replace with CMS later)
	readonly trust = [
		'WAW Studio',
		'WAW Education',
		'WAW Framework',
		'Open Source',
		'Community',
	];

	readonly painPoints = [
		{
			title: 'Building products takes too long',
			desc: 'Teams get stuck in rewrites, inconsistent UI, and slow delivery cycles.',
		},
		{
			title: 'Learning rarely matches real work',
			desc: 'Tutorials don’t translate into production-ready architecture and habits.',
		},
		{
			title: 'Code isn’t reused',
			desc: 'Good components get reimplemented across projects instead of scaled.',
		},
	];

	readonly solutions = [
		{
			title: 'Ship modular features faster',
			desc: 'A consistent UI system + modern Angular patterns reduce friction and rework.',
		},
		{
			title: 'Learn by building real products',
			desc: 'Education content is derived from production code and real project workflows.',
		},
		{
			title: 'Reuse a shared framework',
			desc: 'Turn repeatable solutions into libraries, templates, and documented patterns.',
		},
	];

	readonly features: Feature[] = [
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
		{
			icon: 'school',
			title: 'Hands-on education',
			desc: 'Learn the “why” by working with real product code and real constraints.',
		},
		{
			icon: 'verified',
			title: 'Production standards',
			desc: 'Typed APIs, accessibility-first UI, performance-minded defaults.',
		},
		{
			icon: 'bolt',
			title: 'Modern Angular',
			desc: 'Standalone, OnPush, signals, and new control flow — consistent everywhere.',
		},
		{
			icon: 'groups',
			title: 'Community leverage',
			desc: 'Shared libraries, shared knowledge, shared momentum.',
		},
	];

	readonly steps: Step[] = [
		{
			title: 'Choose a path',
			desc: 'Start with a project goal: product, feature, or learning track.',
		},
		{
			title: 'Build with the system',
			desc: 'Compose sections and components using tokens + clean patterns.',
		},
		{
			title: 'Reuse and scale',
			desc: 'Promote repeatables into shared libs and ship the next project faster.',
		},
	];

	readonly showcaseTabs = [
		{
			id: 'studio' as const,
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
			id: 'education' as const,
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
		{
			id: 'framework' as const,
			label: 'Framework',
			title: 'Reuse libraries across projects',
			desc: 'Promote proven solutions into shared packages and templates for repeated wins.',
			bullets: [
				'Reusable components',
				'Shared services',
				'Docs + patterns',
				'Consistent DX',
			],
		},
	];

	showcaseTabLabel = computed(() => {
		return this.showcaseTabs.find((t) => t.id === this.showcaseTab())
			?.label;
	});

	readonly useCases: UseCase[] = [
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
	];

	readonly testimonials: Testimonial[] = [
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
		{
			quote: 'The shared framework approach finally made our projects feel connected.',
			name: 'M. Tech Lead',
			role: 'Platform Team',
		},
	];

	readonly plans: Plan[] = [
		{
			id: 'starter',
			name: 'Starter',
			blurb: 'For individuals exploring the system.',
			priceMonthly: 0,
			priceYearly: 0,
			features: [
				'Landing templates',
				'Basic components',
				'Community updates',
			],
		},
		{
			id: 'pro',
			name: 'Pro',
			blurb: 'For building and learning seriously.',
			priceMonthly: 19,
			priceYearly: 190,
			features: [
				'Full component set',
				'Example app patterns',
				'Education tracks',
				'Priority docs',
			],
			highlight: true,
		},
		{
			id: 'team',
			name: 'Team',
			blurb: 'For teams shipping together.',
			priceMonthly: 49,
			priceYearly: 490,
			features: [
				'Team access',
				'Shared libraries',
				'Architecture guidance',
				'Integration support',
			],
		},
	];

	readonly faqs: Faq[] = [
		{
			q: 'Is this only for Angular?',
			a: 'WAW is centered on a modern Angular ecosystem, but many architectural patterns and token-driven design ideas apply broadly.',
		},
		{
			q: 'Can I use the framework without the education?',
			a: 'Yes — you can adopt the reusable building blocks independently. Education accelerates adoption.',
		},
		{
			q: 'What does “production code turned into learning material” mean?',
			a: 'Lessons are derived from real project implementations: structure, tradeoffs, and patterns that actually ship.',
		},
		{
			q: 'How does reuse work across projects?',
			a: 'Repeatable components/services get promoted into shared packages and referenced across apps — reducing rebuild time.',
		},
		{
			q: 'Does it support dark theme?',
			a: 'Yes — the UI is token-driven and automatically adapts to your global `html.dark` token overrides.',
		},
	];

	// Derived values
	readonly showcase = computed(
		() => this.showcaseTabs.find((t) => t.id === this.showcaseTab())!,
	);

	priceFor(plan: Plan): number {
		return this.billing() === 'monthly'
			? plan.priceMonthly
			: plan.priceYearly;
	}

	toggleFaq(index: number): void {
		this.openFaq.update((current) => (current === index ? null : index));
	}

	scrollTo(id: string): void {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}
