export const phraseForm = {
	formId: 'phrase',
	title: 'Phrase',
	components: [
		{
			name: 'Text',
			key: 'text',
			focused: true,
			fields: [
				{
					name: 'Label',
					value: 'Origin text',
				},
				{
					name: 'Placeholder',
					value: 'fill origin text...',
				},
				{
					name: 'Textarea',
					value: true,
				},
			],
		},
		{
			name: 'Text',
			key: 'translation',
			fields: [
				{
					name: 'Label',
					value: 'Translation',
				},
				{
					name: 'Placeholder',
					value: 'fill translation...',
				},
				{
					name: 'Textarea',
					value: true,
				},
			],
		},
	],
};
