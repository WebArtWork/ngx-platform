# page-component-hero

Reusable hero section for landing-style pages.

## Principles

- All content comes from the `content` input and is rendered through the app translation pipe.
- Layout is selected with a dedicated `layout` input instead of cloning hero templates.
- Projected content stays page-owned for forms, custom media, and side panels.
- Styling is token-driven through existing theme variables.

## API

### `content: HeroContent`

```ts
export interface HeroContent {
	badge?: { icon?: string; text?: string };
	title?: string;
	description?: string;
	ctas?: {
		label?: string;
		icon?: string;
		targetId?: string;
		href?: string;
		variant?: 'primary' | 'ghost';
	}[];
	meta?: { icon?: string; text?: string };
	media?: {
		type?: 'image' | 'iframe';
		src?: string;
		alt?: string;
		title?: string;
		aspect?: 'landscape' | 'portrait' | 'square' | 'video';
	};
	logos?: { label?: string; icon?: string; src?: string; alt?: string }[];
	highlights?: { icon?: string; title?: string; desc?: string }[];
	metrics?: {
		icon?: string;
		value?: string;
		label?: string;
		description?: string;
	}[];
	note?: { title?: string; desc?: string; icon?: string };
	backgroundImage?: string;
}
```

### `layout: HeroLayout`

Supported layouts:

- `centered`
- `split`
- `panel`
- `background`
- `dashboard`

### Projection slots

```html
<page-component-hero [content]="heroContent" [layout]="'panel'">
	<form hero-form>...</form>
	<div hero-media>...</div>
	<aside hero-panel>...</aside>
</page-component-hero>
```
