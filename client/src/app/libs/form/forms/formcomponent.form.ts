export const formcomponentForm = {
	formId: 'form',
	title: 'Form',
	components: [
		{
			name: 'Input',
			key: 'name',
			focused: true,
			props: {
				placeholder: 'Enter form name...',
				label: 'Name',
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
