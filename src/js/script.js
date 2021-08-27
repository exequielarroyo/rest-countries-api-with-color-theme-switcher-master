// fetch("https://restcountries.eu/rest/v2/all")
// 	.then(res => {
// 		return res.json();
// 	})
// 	.then(json => json);

import 'regenerator-runtime/runtime';

const countriesTemplate = document.querySelector('[data-countries-template]');
const cards = document.getElementById('cards');
const searchInput = document.getElementById('search');

let allCountries = [];

async function getAllCountries() {
	const res = await fetch("https://restcountries.eu/rest/v2/all");
	allCountries = await res.json();
	renderCountries(allCountries)
}

getAllCountries();

function renderCountries(allCountries) {
    cards.innerHTML = '';
    allCountries.forEach(country => {
        const countryContainer = countriesTemplate.content.cloneNode(true);
        countryContainer.querySelector('[data-title]').innerText = country.name;
        countryContainer.querySelector('[data-image]').src = country.flag;
        const population = countryContainer.querySelector('.card__details__population');
        population.querySelector('span').innerText = country.population.toLocaleString();
        const region = countryContainer.querySelector('.card__details__region');
        region.querySelector('span').innerText = country.region;
        const capital = countryContainer.querySelector('.card__details__capital');
        capital.querySelector('span').innerText = country.capital;
        cards.appendChild(countryContainer);
    });
}

searchInput.addEventListener('input', e => {
    const query = allCountries.filter(country => {
        const entry = e.target.value.toLowerCase();
        // return country.name.toLowerCase().includes(entry) || country.population.toString().includes(entry) || country.region.toLowerCase().includes(entry) || country.capital.toLowerCase().includes(entry)
        return country.name.toLowerCase().includes(entry)
    })
    renderCountries(query);
})