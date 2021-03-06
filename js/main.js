(function() {
	document.addEventListener('DOMContentLoaded', () => {
		observeScrolling();

		activateNav();
		checkLocationHash();
	});

	function activateNav() {
		document.querySelectorAll('#nav a').forEach(a => {
			a.addEventListener('click', e => {
				e.preventDefault();

				const target = e.target.getAttribute('href');
				resetNavigationState();
				setActiveNavItem(target);
				scrollTo(target);
			});
		});
	}

	function scrollTo(sectionId) {
		/**
		 * special hack for firefox!
		 * `scrollIntoView` doesn't work on elements with `overflow: hidden`
		 * on firefox.
		 * so we add a class `.scrollable` which sets `overflow: scroll` property
		 * to the main element. then we scroll.
		 * then we remove the class after scrolling is done (assuming 500ms is enough)
		 */
		const main = document.querySelector('#main');
		const className = 'scrollable';
		main.classList.add(className);

		document.querySelector(sectionId).scrollIntoView({
			behavior: 'smooth'
		});

		setTimeout(() => {
			main.classList.remove(className);
		}, 500);
	}

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
					const id = entry.target.id;
					setLinkTargets(id);
				}
			});
		}, observerOptions);

		// 3. observe elements using observer object from 2.
		const sections = document.querySelectorAll('.section');
		sections.forEach(e => observer.observe(e));
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
			.querySelectorAll('#nav li')
			.forEach(li => li.classList.remove('active'));
	}

	function setLinkTargets(sectionId) {
		const sectionIndex = sectionId.charAt(sectionId.length - 1);
		const navItems = document.querySelectorAll('#nav li');
		navItems.forEach(item => {
			const a = item.querySelector('a');
			const newHref = a.getAttribute('href').replace(/.$/, sectionIndex);
			a.setAttribute('href', newHref);
		});
	}

	function checkLocationHash() {
		const hash = document.location.hash;
		if (!hash) {
			return;
		}

		// scroll to the section
		setTimeout(() => {
			scrollTo(hash);
		}, 300);
	}
})();
