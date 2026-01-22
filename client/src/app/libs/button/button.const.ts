import { ButtonType } from './button.type';

export const buttonDefaults = {
	type: 'primary' as ButtonType,
	extraClass: '',
	disabled: false,
	disableSubmit: false,
	isMultipleClicksAllowed: false,
};

export const WBUTTON_BASE_CLASSES =
	'inline-flex items-center justify-center gap-2 ' +
	'select-none whitespace-nowrap ' +
	'rounded-[var(--b-radius-btn)] font-medium ' +
	'px-[var(--sp-6)] py-[var(--sp-3)] ' +
	'transition ' +
	'disabled:opacity-60 disabled:pointer-events-none ' +
	'focus-visible:outline-none';
