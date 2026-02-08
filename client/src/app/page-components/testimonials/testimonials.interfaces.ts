export interface TestimonialItem {
	quote?: string;
	name?: string;
	role?: string;
}

export interface TestimonialsContent {
	/** Optional section id (e.g. "testimonials") */
	sectionId?: string;

	title?: string;
	description?: string;

	items?: TestimonialItem[];
}
