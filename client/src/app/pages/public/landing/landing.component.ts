import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticleComponent } from '@component/article';
import { ArticlesComponent } from '@component/articles';
import { CardComponent } from '@component/card';
import { ContentComponent } from '@component/content';
import { CtaComponent } from '@component/cta';
import { FeaturesComponent } from '@component/features';
import { HeroComponent } from '@component/hero';
import { MarketingComponent } from '@component/marketing';
import { MemberComponent } from '@component/member';
import { ModalComponent } from '@component/modal';
import { NavigationComponent } from '@component/navigation';
import { ProductComponent } from '@component/product';
import { ProductsComponent } from '@component/products';
import { SocialComponent } from '@component/social';
import { TablesComponent } from '@component/tables';
import { TeamComponent } from '@component/team';
import { UtilityComponent } from '@component/utility';
import { FooterComponent } from '@layout/footer';
import { TranslatePipe } from 'wacom';
import {
	articleSection,
	articlesSection,
	cardSection,
	contentSection,
	ctaSection,
	featuresSection,
	heroSections,
	LandingHeroSection,
	marketingSection,
	memberSection,
	modalSection,
	navigationSection,
	productSection,
	productsSection,
	socialSection,
	tablesSection,
	teamSection,
	utilitySection,
} from './landing.const';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './landing.component.html',
	imports: [
		ArticleComponent,
		ArticlesComponent,
		CardComponent,
		ContentComponent,
		CtaComponent,
		FeaturesComponent,
		HeroComponent,
		MarketingComponent,
		MemberComponent,
		ModalComponent,
		NavigationComponent,
		ProductComponent,
		ProductsComponent,
		SocialComponent,
		TablesComponent,
		TeamComponent,
		UtilityComponent,
		FooterComponent,
		TranslatePipe,
	],
})
export class LandingComponent {
	readonly heroSections: LandingHeroSection[] = heroSections;
	readonly navigationSection = navigationSection;
	readonly contentSection = contentSection;
	readonly featuresSection = featuresSection;
	readonly ctaSection = ctaSection;
	readonly cardSection = cardSection;
	readonly socialSection = socialSection;
	readonly teamSection = teamSection;
	readonly memberSection = memberSection;
	readonly articlesSection = articlesSection;
	readonly articleSection = articleSection;
	readonly productsSection = productsSection;
	readonly productSection = productSection;
	readonly tablesSection = tablesSection;
	readonly modalSection = modalSection;
	readonly marketingSection = marketingSection;
	readonly utilitySection = utilitySection;
}
