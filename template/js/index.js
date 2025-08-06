const toggleClass = (id, className) => {
	const element = document.getElementById(id);
	if (element) {
		element.classList.toggle(className);
	} else {
		console.error("Element with ID " + id + " not found.");
	}
};

const toTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const sidebar = {};
document.addEventListener("DOMContentLoaded", function () {
	/* ACCARDION CODE */
	const accordionButtons = document.querySelectorAll(".accordion-button");

	accordionButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const content = this.nextElementSibling;
			const activeContent = document.querySelector(
				".accordion-content[style]"
			);

			if (activeContent && activeContent !== content) {
				activeContent.style.maxHeight = null;
				activeContent.previousElementSibling.classList.remove("active");
			}

			if (content.style.maxHeight) {
				content.style.maxHeight = null;
				this.classList.remove("active");
			} else {
				content.style.maxHeight = content.scrollHeight + "px";
				this.classList.add("active");
			}
		});
	});

	/* Sidebar active menu, hide menu items */
	const items = document.querySelectorAll(".main-content__nav-item");
	const _subitem = {};
	for (const item of items) {
		if (item.getAttribute("item-url") === location.pathname) {
			item.classList.add("main-content__nav-item--active");

			sidebar.item = item;

			if (item.children.length > 1 && item.children[1].children.length) {
				item.children[1].children[0].classList.add(
					"main-content__nav-in-item--active"
				);

				for (const subitem of item.children[1].children) {
					if (
						subitem.children.length &&
						subitem.children[0].href &&
						subitem.children[0].href.split("#").length > 1
					) {
						_subitem[subitem.children[0].href.split("#")[1]] =
							subitem;
					}
				}
			}
		}
	}

	const itemBlocks = document.querySelectorAll(".item-block");

	if (!itemBlocks.length) {
		return;
	}

	itemBlocks[0].focused = true;

	const start = itemBlocks[0].offsetTop;

	const setItemBlock = (itemBlock) => {
		for (const _itemBlock of itemBlocks) {
			_itemBlock.focused = false;
		}

		for (const subitem in _subitem) {
			_subitem[subitem].classList.remove(
				"main-content__nav-in-item--active"
			);
		}

		itemBlock.focused = true;

		if (_subitem[itemBlock.id]) {
			_subitem[itemBlock.id].classList.add(
				"main-content__nav-in-item--active"
			);
		}
	};

	window.onscroll = function () {
		for (const itemBlock of itemBlocks) {
			const startPoint = itemBlock.offsetTop - start;
			const endPoint = startPoint + itemBlock.offsetHeight;

			if (window.scrollY >= startPoint && window.scrollY < endPoint) {
				if (!itemBlock.focused) {
					setItemBlock(itemBlock);
				}

				break;
			}
		}
	};
});

document.addEventListener("DOMContentLoaded", () => {
        const timers = document.querySelectorAll('[data-countdown]');
        timers.forEach((timer) => {
                const target = new Date(timer.getAttribute('data-countdown'));
                const daysEl = timer.querySelector('.countdown__days');
                const hoursEl = timer.querySelector('.countdown__hours');
                const minutesEl = timer.querySelector('.countdown__minutes');
                const secondsEl = timer.querySelector('.countdown__seconds');

                const update = () => {
                        const now = new Date();
                        const diff = target - now;
                        if (diff <= 0) {
                                daysEl.textContent = '00';
                                hoursEl.textContent = '00';
                                minutesEl.textContent = '00';
                                secondsEl.textContent = '00';
                                clearInterval(interval);
                                return;
                        }
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                        const minutes = Math.floor((diff / (1000 * 60)) % 60);
                        const seconds = Math.floor((diff / 1000) % 60);

                        daysEl.textContent = String(days).padStart(2, '0');
                        hoursEl.textContent = String(hours).padStart(2, '0');
                        minutesEl.textContent = String(minutes).padStart(2, '0');
                        secondsEl.textContent = String(seconds).padStart(2, '0');
                };

                update();
                const interval = setInterval(update, 1000);
        });
});
