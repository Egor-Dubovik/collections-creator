export const getTimeFromString = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
	return date.toLocaleString(undefined, options);
};

export const getDateFromString = (dateString: string) => {
	const date = new Date(dateString);
	const currentDate = new Date();
	const timeString = getTimeFromString(date);
	if (currentDate.toDateString() === date.toDateString()) return 'today ' + `⌚${timeString}`;
	const yearOption = currentDate.getFullYear() !== date.getFullYear() ? 'numeric' : undefined;
	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: yearOption };
	const dateWithoutTime = date.toLocaleString(undefined, options);
	return `${dateWithoutTime} ⌚${timeString}`;
};
