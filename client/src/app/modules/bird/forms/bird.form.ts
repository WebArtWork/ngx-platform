export const birdForm = {
	formId: 'bird',
	title: 'Bird',
	components: [
		{
			name: 'Input',
			key: 'name',
			focused: true,
			props: {
				placeholder: 'Enter name...',
				label: 'Name',
			},
		},
		{
			name: 'Input',
			key: 'description',
			props: {
				placeholder: 'Enter description...',
				label: 'Description',
			},
		},
	],
};
