# page-component-member

Detailed profile component for a single person, usually opened from the team component.

## API

### `content: MemberContent`

```ts
export interface MemberContent {
	sectionId?: string;
	name?: string;
	role?: string;
	avatar?: string;
	bio?: string;
	stats?: { label?: string; value?: string }[];
	links?: { label?: string; href?: string; icon?: string }[];
}
```

### `layout: MemberLayout`

- `profile`
- `stacked`
- `inline`
