import {
	APP_INITIALIZER,
	ApplicationRef,
	EnvironmentInjector,
	Provider,
	Type,
	createComponent,
} from '@angular/core';
import { InputFormComponent } from './form-components/input/input.component';
/* componnets */

/**
 * Central registry: template name → component class.
 * Names must match `component.name` in form schema (e.g. `{ name: 'Input', ... }`)
 * and what the template component passes into FormService.addTemplateComponent().
 */
export const FORM_TEMPLATE_COMPONENTS: Record<string, Type<unknown>> = {
	Input: InputFormComponent,
	/* addComponents */
};

function registerFormTemplatesFactory(
	injector: EnvironmentInjector,
	appRef: ApplicationRef,
): () => void {
	return () => {
		// Instantiate each template component once so their ngOnInit runs
		// and they call FormService.addTemplateComponent(name, templateRef)
		Object.values(FORM_TEMPLATE_COMPONENTS).forEach((cmp) => {
			const ref = createComponent(cmp, {
				environmentInjector: injector,
			});

			appRef.attachView(ref.hostView);
			(ref.hostView as any).detectChanges?.();
			// no DOM insertion – purely for registration side-effects
		});
	};
}

export const provideFormComponents = (): Provider => {
	return {
		provide: APP_INITIALIZER,
		multi: true,
		useFactory: registerFormTemplatesFactory,
		deps: [EnvironmentInjector, ApplicationRef],
	};
};
