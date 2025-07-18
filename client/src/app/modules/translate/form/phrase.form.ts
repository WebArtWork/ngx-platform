export const phraseForm = {
	formId: 'phrase',
	title: 'Phrase',
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
					value: 'fill phrase title',
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
					value: 'fill phrase description',
				},
				{
					name: 'Textarea',
					value: true,
				},
			],
		},
	],
};
