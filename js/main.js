(function() {
	document.addEventListener('DOMContentLoaded', () => {
		observeScrolling();
	});

	function observeScrolling() {
		// 1. create options object
		const observerOptions = {
			root: null,
			threshold: 1
		};

		// 2. create InsectionObserver object with config from 1.
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					resetNavigationState();
					setActiveNavItem(entry.target.id);
				}
			});
		}, observerOptions);

		// 3. observe elements using observer object from 2.
		const elements = document.querySelectorAll('[class*="section"]');
		elements.forEach(e => observer.observe(e));
	}

	function setActiveNavItem(id) {
		let nav;
		if (id.includes('section-1')) {
			nav = '#nav-product-1';
		} else if (id.includes('section-2')) {
			nav = '#nav-product-2';
		} else if (id.includes('section-3')) {
			nav = '#nav-product-3';
		} else {
			nav = '#nav-product-4';
		}

		document.querySelector(nav).classList.add('active');
	}

	function resetNavigationState() {
		document
			.querySelectorAll('nav li')
			.forEach(li => li.classList.remove('active'));
	}
})();
