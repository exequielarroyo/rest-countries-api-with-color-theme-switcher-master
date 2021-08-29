// fetch("https://restcountries.eu/rest/v2/all")
// 	.then(res => {
// 		return res.json();
// 	})
// 	.then(json => json);

import "regenerator-runtime/runtime";
import "./theme-toggle";

const countriesTemplate = document.querySelector("[data-countries-template]");
const cards = document.getElementById("cards");
const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");
const countryContainer = document.querySelector("[data-country-container]");
const detailsContainer = document.querySelector("[data-details-container]");
const main = document.querySelector("main");
const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", e => {
	renderAllCountries(currentCountries);
});

let allCountries = [];
let currentCountries = [];
let filterValue = "";

async function getAllCountries() {
	const res = await fetch("https://restcountries.eu/rest/v2/all");
	allCountries = await res.json();
	currentCountries = allCountries;
	renderAllCountries(allCountries);
}

getAllCountries();

function renderCountries(allCountries) {
	cards.innerHTML = "";
	allCountries.forEach(country => {
		const countryContainer = countriesTemplate.content.cloneNode(true);
		const card = countryContainer.querySelector("[data-country-id]");
		card.dataset.countryId = country.alpha3Code;
		countryContainer.querySelector("[data-title]").innerText = country.name;
		countryContainer.querySelector("[data-image]").src = country.flag;
		const population = countryContainer.querySelector(
			".card__details__population"
		);
		population.querySelector("span").innerText =
			country.population.toLocaleString();
		const region = countryContainer.querySelector(".card__details__region");
		region.querySelector("span").innerText = country.region;
		const capital = countryContainer.querySelector(".card__details__capital");
		capital.querySelector("span").innerText = country.capital;
		cards.appendChild(countryContainer);
	});
}

searchInput.addEventListener("input", e => {
	const query = allCountries.filter(country => {
		const entry = e.target.value.toLowerCase();
		// return country.name.toLowerCase().includes(entry) || country.population.toString().includes(entry) || country.region.toLowerCase().includes(entry) || country.capital.toLowerCase().includes(entry)
		return (
			country.name.toLowerCase().includes(entry) &&
			country.region.toLowerCase().includes(filterValue)
		);
	});
	renderCountries(query);
});


filter.addEventListener("change", e => {
	filterValue = e.target.value;

	const query = allCountries.filter(country => {
		const entry = e.target.value;
		// return country.name.toLowerCase().includes(entry) || country.population.toString().includes(entry) || country.region.toLowerCase().includes(entry) || country.capital.toLowerCase().includes(entry)
		return country.region.toLowerCase().includes(entry);
	});
	currentCountries = query;
	renderCountries(query);
});

cards.addEventListener("click", e => {
	const parent = e.target.closest(".card");
	if (parent === null) return;
	const country = parent.dataset.countryId;
	renderCountryDetails(country);
});

function renderAllCountries(allCountries) {
	countryContainer.remove();
	detailsContainer.remove();

	main.appendChild(countryContainer);
	renderCountries(allCountries);
}
function renderCountryDetails(country) {
	detailsContainer.remove();
	countryContainer.remove();

	main.appendChild(detailsContainer);
	renderDatails(country);
}

function renderDatails(country) {
	country = allCountries.find(c => c.alpha3Code === country);
	detailsContainer.querySelector("[data-flag]").src = country.flag;
	detailsContainer.querySelector("[data-name]").innerText = country.name;
	detailsContainer.querySelector("[data-native-name]").innerText =
		country.nativeName;
	detailsContainer.querySelector("[data-population]").innerText =
		country.population.toLocaleString();
	detailsContainer.querySelector("[data-region]").innerText = country.region;
	detailsContainer.querySelector("[data-sub-region]").innerText =
		country.subregion;
	detailsContainer.querySelector("[data-capital]").innerText = country.capital;
	detailsContainer.querySelector("[data-domain]").innerText = [
		...country.topLevelDomain
	];
	detailsContainer.querySelector("[data-currency]").innerText =
		country.currencies.map(c => c.name);
	detailsContainer.querySelector("[data-languages]").innerText =
		country.languages.map(l => ` ${l.name}`);

	renderBorders(country.borders);
}

function renderBorders(borders) {
	const borderContainer = detailsContainer.querySelector(".border-countries");
	borderContainer.innerHTML = '';
	const title = document.createElement('p');
	title.innerText = "Border Countries:";
	borderContainer.append(title);

	borders.forEach(border => {
		const countryLink = document.createElement("a");
		countryLink.dataset.countryId = border;

		border = allCountries.find(c => border === c.alpha3Code);
		countryLink.innerText = border.name;

		borderContainer.appendChild(countryLink);
	});
}

detailsContainer.addEventListener("click", e => {
	if (!e.target.matches("[data-country-id]")) return;

	const border = e.target.dataset.countryId;
	renderDatails(border);
});
