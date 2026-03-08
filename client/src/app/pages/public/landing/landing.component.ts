import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { AboutContent, AboutSectionComponent } from '@component/about';
import { FaqContent, FaqSectionComponent } from '@component/faq';
import { FeaturesContent, FeaturesSectionComponent } from '@component/features';
import { FinalCtaContent, FinalCtaSectionComponent } from '@component/final-cta';
import { HeroSectionComponent } from '@component/hero';
import { HowItWorksContent, HowItWorksSectionComponent } from '@component/how-it-works';
import { MarkedSectionComponent } from '@component/marked';
import { PricingContent, PricingSectionComponent } from '@component/pricing';
import { ShowcaseContent, ShowcaseSectionComponent } from '@component/showcase';
import { TestimonialsContent, TestimonialsSectionComponent } from '@component/testimonials';
import { TrustBarContent, TrustBarSectionComponent } from '@component/trust-bar';
import { UseCasesContent, UseCasesSectionComponent } from '@component/use-cases';
import { FooterComponent } from '@layout/footer';
import { TranslatePipe } from 'wacom';
import {
	aboutContent,
	faqContent,
	featuresContent,
	finalCtaContent,
	heroSections,
	howItWorksContent,
	LandingHeroSection,
	pricingContent,
	showcaseContent,
	testimonialsContent,
	trustBarContent,
	useCasesContent,
} from './landing.const';

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
		TranslatePipe,
	],
})
export class LandingComponent {
	private readonly _http = inject(HttpClient);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	markdown = signal<string>('');

	constructor() {
		if (this._isBrowser) {
			this._http.get('/assets/README.md', { responseType: 'text' }).subscribe({
				next: markdown => this.markdown.set(markdown),
			});
		}
	}

	readonly heroSections: LandingHeroSection[] = heroSections;

	readonly trustBarContent: TrustBarContent = trustBarContent;

	readonly aboutContent: AboutContent = aboutContent;

	readonly featuresContent: FeaturesContent = featuresContent;

	readonly howItWorksContent: HowItWorksContent = howItWorksContent;

	readonly showcaseContent: ShowcaseContent = showcaseContent;

	readonly useCasesContent: UseCasesContent = useCasesContent;

	readonly testimonialsContent: TestimonialsContent = testimonialsContent;

	readonly pricingContent: PricingContent = pricingContent;

	readonly faqContent: FaqContent = faqContent;

	readonly finalCtaContent: FinalCtaContent = finalCtaContent;
}
