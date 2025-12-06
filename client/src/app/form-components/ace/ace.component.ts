import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { ACE_CONFIG, AceConfigInterface, AceModule } from 'ngx-ace-wrapper';
import { FormService } from 'src/app/libs/form/services/form.service';

interface Interface {}

const DEFAULT_ACE_CONFIG: AceConfigInterface = {};

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './ace.component.html',
	styleUrl: './ace.component.scss',
	imports: [NgClass, AceModule],
	providers: [
		{
			provide: ACE_CONFIG,
			useValue: DEFAULT_ACE_CONFIG,
		},
	],
})
export class AceFormComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Ace', this.templateRef);
	}

	/* ------------ value bridge (Signal Forms + legacy) ------------ */

	getValue(data: any): string {
		const key = data.key as string | null;

		// Signal Forms field (preferred)
		if (data.field) {
			try {
				const state = data.field();
				if (state?.value && typeof state.value === 'function') {
					return (state.value() as string) ?? '';
				}
			} catch {
				// fall through
			}
		}

		// Model signal
		if (data.model && typeof data.model === 'function' && key) {
			const current = data.model() as Record<string, unknown>;
			return (current?.[key] as string) ?? '';
		}

		// Legacy submission object
		if (!key || !data.submition) return '';
		return (data.submition[key] as string) ?? '';
	}

	onValueChange(data: any, value: string): void {
		const key = data.key as string | null;

		// 1) Signal Forms field
		if (data.field) {
			try {
				const state = data.field();
				if (state?.value?.set) {
					state.value.set(value);
				}
			} catch {
				// ignore and fall through
			}
		}
		// 2) Model signal
		else if (data.model && typeof data.model.update === 'function' && key) {
			data.model.update((current: Record<string, unknown>) => ({
				...current,
				[key]: value,
			}));
		}
		// 3) Legacy submission object
		else if (data.submition && key) {
			data.submition[key] = value;
		}

		if (typeof data.wChange === 'function') {
			data.wChange();
		}
	}

	/* ------------ config / props helpers ------------ */

	getConfig(data: any): AceConfigInterface {
		const props = (data && data.props) || {};
		const config: AceConfigInterface = {
			...(DEFAULT_ACE_CONFIG || {}),
		};

		const toNumber = (v: unknown): number | undefined => {
			if (v === null || v === undefined || v === '') return undefined;
			const n = Number(v);
			return Number.isNaN(n) ? undefined : n;
		};

		// Layout
		const minLines = toNumber(props.minLines);
		const maxLines = toNumber(props.maxLines);
		const tabSize = toNumber(props.tabSize);

		if (props.fontSize) {
			config.fontSize = String(props.fontSize);
		}
		if (minLines !== undefined) {
			(config as any).minLines = minLines;
		}
		if (maxLines !== undefined) {
			(config as any).maxLines = maxLines;
		}
		if (tabSize !== undefined) {
			(config as any).tabSize = tabSize;
		}

		// Behavior toggles
		if (typeof props.useSoftTabs === 'boolean') {
			(config as any).useSoftTabs = props.useSoftTabs;
		}
		if (typeof props.wrap === 'boolean') {
			(config as any).wrap = props.wrap;
		}
		if (typeof props.showLineNumbers === 'boolean') {
			(config as any).showLineNumbers = props.showLineNumbers;
		}
		if (typeof props.showGutter === 'boolean') {
			(config as any).showGutter = props.showGutter;
		}
		if (typeof props.highlightActiveLine === 'boolean') {
			(config as any).highlightActiveLine = props.highlightActiveLine;
		}
		if (typeof props.showPrintMargin === 'boolean') {
			(config as any).showPrintMargin = props.showPrintMargin;
		}
		if (typeof props.readOnly === 'boolean') {
			(config as any).readOnly = props.readOnly;
		}
		if (typeof props.useWorker === 'boolean') {
			(config as any).useWorker = props.useWorker;
		}

		// Local config object from props
		if (props.config && typeof props.config === 'object') {
			Object.assign(config, props.config as Record<string, unknown>);
		}

		// Per-field config (code-level override)
		const fieldConfig = data?.field?.Config;
		if (fieldConfig && typeof fieldConfig === 'object') {
			Object.assign(config, fieldConfig as Record<string, unknown>);
		}

		// Extra config JSON string
		if (typeof props.configJson === 'string' && props.configJson.trim()) {
			try {
				const json = JSON.parse(props.configJson);
				if (json && typeof json === 'object') {
					Object.assign(config, json as Record<string, unknown>);
				}
			} catch {
				// invalid JSON -> ignore
			}
		}

		return config;
	}

	getMode(data: any): string {
		const propsMode = data.props?.mode;
		const fieldMode = data.field?.Mode;

		if (propsMode) return String(propsMode);
		if (fieldMode) return String(fieldMode);

		return 'text';
	}

	getTheme(data: any): string {
		const propsTheme = data.props?.theme;
		const fieldTheme = data.field?.Theme;

		if (propsTheme) return String(propsTheme);
		if (fieldTheme) return String(fieldTheme);

		return 'github';
	}

	isDisabled(data: any): boolean {
		return !!(
			data.props?.disabled ||
			data.component?.disabled ||
			data.field?.Disabled
		);
	}

	getUseAceClass(data: any): boolean {
		const prop = data.props?.useAceClass;
		if (typeof prop === 'boolean') return prop;

		const field = data.field?.UseAceClass;
		if (typeof field === 'boolean') return field;

		return true;
	}
}
