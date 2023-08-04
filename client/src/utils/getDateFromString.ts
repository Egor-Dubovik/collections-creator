const getCurrentAndInitDate = (dateString: string) => {
	const initDate = new Date(dateString);
	const currentDate = new Date();
	return { initDate, currentDate };
};

const getDateWithoutTime = (initDate: Date, currentDate: Date) => {
	const yearOption = currentDate.getFullYear() !== initDate.getFullYear() ? 'numeric' : undefined;
	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: yearOption };
	const dateWithoutTime = initDate.toLocaleString(undefined, options);
	return dateWithoutTime;
};

export const getTimeFromString = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
	return date.toLocaleString(undefined, options);
};

export const getDateAndTimeFromString = (dateString: string, withTime = true) => {
	const { initDate, currentDate } = getCurrentAndInitDate(dateString);
	const timeString = withTime ? `⌚${getTimeFromString(initDate)}` : '';
	if (currentDate.toDateString() === initDate.toDateString()) return 'today ' + timeString;
	const dateWithoutTime = getDateWithoutTime(initDate, currentDate);
	return `${dateWithoutTime} ${timeString}`;
};
