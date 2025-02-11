export const testFormComponents = {
	formId: 'test',
	title: 'Test',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill test title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill test description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
