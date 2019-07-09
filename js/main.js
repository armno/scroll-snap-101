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
				const parent = e.target.parentNode;
				resetNavigationState();
				setActiveNavItem(parent);
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
			console.log('in observer');
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					// setLinkTargets(id);
					scrollOtherContainers(entry.target);
				}
			});
		}, observerOptions);

		// 3. observe elements using observer object from 2.
		const sections = document.querySelectorAll('.section');
		sections.forEach(e => observer.observe(e));
	}

	function setActiveNavItem(element) {
		element.classList.add('active');
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

	function scrollOtherContainers(currentElement) {
		// get 'other containers' elements - all except self
		// each of them > scroll

		const elementTop = currentElement.offsetTop;
		const currentId = currentElement.id;
		const [label, subProduct, section] = [...currentId.split('-')];
		const selector = `.sub-product:not(.sub-product-${subProduct})`;
		const neighbours = document.querySelectorAll(selector);

		neighbours.forEach(element => (element.scrollTop = elementTop));
	}
})();
