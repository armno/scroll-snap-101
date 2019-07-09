document.addEventListener('DOMContentLoaded', () => {
	const fullpageElement = new fullpage('#fullpage', {
		autoScrolling: true,
		scrollHorizontally: true,
		controlArrows: false,
		dragAndMove: true,
		verticalCentered: false
	});

	document.querySelectorAll('#nav a').forEach(a => {
		a.addEventListener('click', e => {
			e.preventDefault();

			const target = e.target.getAttribute('href');
			moveToProduct(target);
		});
	});

	function moveToProduct(idString) {
		const slide = idString.split('-')[1]; // only works with `product-INDEX` id string
		const activeSection = fullpageElement.getActiveSection();
		const section = activeSection.index + 1; // for some reasons, section starts at 1
		const slideIndex = slide - 1;
		fullpageElement.moveTo(section, slideIndex); // for some reasons, slide needs to be 0-indexed
	}
});
