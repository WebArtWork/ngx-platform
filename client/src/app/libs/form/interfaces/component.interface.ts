// import { VirtualValidatorFn } from 'src/app/virtual-form.service';

/** Use props instead of array fields */
export interface FormComponentInterface {
	/** Container/grouping */
	components?: FormComponentInterface[];

	/** Template name in registry */
	name?: string;

	/** Flat key; supports repeater notation like "items[].name" */
	key?: string;

	/** UI */
	class?: string;
	hidden?: boolean;

	/** Focus helpers */
	focus?: () => void;
	focused?: boolean;

	/** Arbitrary props passed to the template (label, placeholder, items, etc.) */
	props?: Record<string, unknown>;

	/** Validation (preferred) */
	required?: boolean;
	// validators?: VirtualValidatorFn[];

	/** Basic disabled flag; for dynamic rules, consider disabledWhen */
	disabled?: boolean;
	disabledWhen?: (values: Record<string, unknown>) => boolean;
}

/** @deprecated Replaced by props: Record<string, unknown> */
export interface TemplateFieldInterface {
	name: string;
	value: unknown;
	skipTranslation?: boolean;
}

/** Registry entry kept simple: name + component */
export interface TemplateComponentInterface {
	name: string;
	component: unknown;
}
