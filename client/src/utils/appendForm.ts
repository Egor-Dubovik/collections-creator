interface IData {
	[key: string]: any;
}

export const appendForm = (formData: FormData, data: IData): void => {
	const dataEntries = Object.entries(data);
	dataEntries.forEach(field => formData.append(field[0], field[1]));
};
