const toggle = document.querySelector(".dark-mode-toggle");
const icon = document.querySelector("ion-icon");
const LOCAL_STORAGE_PREFIX = "REST-COUNTRIES-API";
const THEME_KEY = `${LOCAL_STORAGE_PREFIX}-theme`;

toggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-toggle");
	const isToggled = document.body.classList.contains("theme-toggle");
	themeToggle(isToggled);
});

function themeToggle(isToggled) {
	if (JSON.parse(isToggled)) {
        icon.name = "moon";
        document.body.classList.add('theme-toggle');
	} else {
        icon.name = "moon-outline";
        document.body.classList.remove('theme-toggle');
	}
    localStorage.setItem(THEME_KEY, isToggled);
}

function loadTheme() {
    const isToggled = localStorage.getItem(THEME_KEY);
    themeToggle(isToggled);
}

loadTheme()
