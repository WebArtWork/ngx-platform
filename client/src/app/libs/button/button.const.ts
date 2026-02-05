import { ButtonType } from './button.type';

export const buttonDefaults = {
	type: 'primary' as ButtonType,
	extraClass: '',
	disabled: false,
	disableSubmit: false,
	isMultipleClicksAllowed: false,
};

/** Shared Tailwind base for both component + directive */
export const WBUTTON_BASE_CLASSES =
	'inline-flex items-center justify-center gap-2 ' +
	'select-none whitespace-nowrap ' +
	'rounded-lg font-medium ' +
	'px-6 py-3 text-sm leading-none ' +
	'transition ' +
	'focus-visible:outline-none ' +
	'disabled:opacity-60 disabled:pointer-events-none';

/** Type-specific Tailwind classes */
export const WBUTTON_TYPE_CLASSES: Record<ButtonType, string> = {
	primary: 'bg-blue-600 text-white hover:brightness-95',
	secondary: 'bg-red-600 text-white hover:brightness-95',
	success: 'bg-green-600 text-white hover:brightness-95',
	danger: 'bg-red-600 text-white hover:brightness-95',
	warning: 'bg-amber-500 text-white hover:brightness-95',
	info: 'bg-sky-500 text-white hover:brightness-95',
	light: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
	dark: 'bg-slate-800 text-white hover:brightness-95',
	link: 'bg-transparent text-slate-700 hover:text-slate-900 hover:underline px-0 py-0',
};
