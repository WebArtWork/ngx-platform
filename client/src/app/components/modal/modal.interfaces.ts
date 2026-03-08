import { ModalActionVariant } from './modal.types';

export interface ModalAction {
	label?: string;
	href?: string;
	icon?: string;
	variant?: ModalActionVariant;
}

export interface ModalContent {
	sectionId?: string;
	title?: string;
	description?: string;
	actions?: ModalAction[];
	dismissLabel?: string;
}
