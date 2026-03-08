# page-component-team

Component for listing team members, contributors, or people in an organized overview.

## API

### `content: TeamContent`

```ts
export interface TeamContent {
	sectionId?: string;
	title?: string;
	description?: string;
	members?: {
		name?: string;
		role?: string;
		bio?: string;
		avatar?: string;
		links?: { label?: string; href?: string }[];
	}[];
}
```

### `layout: TeamLayout`

- `grid`
- `compact`
- `highlighted`
