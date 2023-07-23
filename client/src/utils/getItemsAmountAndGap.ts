export const getItemsAmountAndGap = (screenWidth: number) => {
	let itemsOnSlide = 1;
	let moveAmount = 1;
	let newGap = 30;

	if (screenWidth >= 1024) {
		itemsOnSlide = 4;
		moveAmount = 2;
	} else if (screenWidth >= 992) {
		itemsOnSlide = 3;
	} else if (screenWidth >= 768) {
		itemsOnSlide = 2;
	} else if (screenWidth <= 600) {
		itemsOnSlide = 1;
	} else if (screenWidth >= 480) {
		itemsOnSlide = 2;
	}
	return { itemsOnSlide, newGap, moveAmount };
};
