export const birdFormComponents = {
	formId: 'bird',
	title: 'Bird',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill bird title',
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
					value: 'fill bird description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
