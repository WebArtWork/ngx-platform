import { Signal, Type } from '@angular/core';

export const MODAL_SIZES = ['small', 'mid', 'big', 'full'] as const;
export type ModalSizes = (typeof MODAL_SIZES)[number];

export interface ModalButton {
	text: string;
	callback?: () => void;
}

export interface ModalConfig {
	size?: ModalSizes;
	buttons?: ModalButton[];
	class?: string;
	unique?: string;
	progress?: boolean;
	timeout?: number;
	close?: () => void;
	closable?: boolean;
}

export interface Modal extends ModalConfig {
	component: Type<unknown>;
	id?: number;
	progressPercentage?: Signal<number>;
	onClickOutside?: () => void;
	onClose?: () => void;
	onOpen?: () => void;
	[x: string]: unknown;
}

export const DEFAULT_MODAL_CONFIG: ModalConfig = {
	size: 'mid',
	timeout: 0,
	class: '',
	closable: true,
};
