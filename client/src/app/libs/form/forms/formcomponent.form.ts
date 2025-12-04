import { items } from 'src/app/app.formcomponents';

export const formcomponentForm = {
	formId: 'form',
	title: 'Form',
	components: [
		{
			name: 'Select',
			key: 'name',
			focused: true,
			props: {
				placeholder: 'Enter form name...',
				label: 'Name',
				items,
			},
		},
		{
			name: 'Input',
			key: 'key',
			props: {
				placeholder: 'Enter form key...',
				label: 'Key',
			},
		},
	],
};
