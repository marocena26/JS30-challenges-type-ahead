"use strict";

//-------------------CONST-------------------
const searchInput = document.querySelector(".search_input");
const suggestions = document.querySelector(".suggestions");

let cities = [];
//-------------------FUNCTIONS-------------------

//Fetch
function getCities() {
  fetch(
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
  )
    .then((response) => response.json())
    .then((data) => {
      cities = data;
    });
}

getCities();

//

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    })
    .join("");
  if (this.value === "") {
    return (suggestions.innerHTML =
      " <li>Filter for a city</li> <li>or a state</li>");
  } else {
    return html.length !== 0
      ? (suggestions.innerHTML = html)
      : (suggestions.innerHTML = `<p class="error">Sorry, no results were found for <span class="hl">${this.value}</span></p>`);
  }
}

//-------------------EVENTS-------------------

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
