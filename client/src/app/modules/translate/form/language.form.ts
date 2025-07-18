export const languageForm = {
	formId: 'language',
	title: 'Language',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Label',
					value: 'Title',
				},
				{
					name: 'Placeholder',
					value: 'fill language title',
				},
			],
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Label',
					value: 'Description',
				},
				{
					name: 'Placeholder',
					value: 'fill language description',
				},
				{
					name: 'Textarea',
					value: true,
				},
			],
		},
	],
};
