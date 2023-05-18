//
window.onload = onWindowLoad;
// Elements
const {
  element_container,
  dark_mode_btn,
  detailed_element_wrapper,
  detailed_element,
  search_filter_container,
  back_btn,
  searchElement,
  filter,
} = domElements;

// Buttons

back_btn.addEventListener("click", () => {
  detailed_element_wrapper.classList.add("disabled");
  search_filter_container.classList.remove("disabled");
  element_container.classList.remove("disabled");
});

dark_mode_btn.addEventListener("click", () => {
  const selectedTheme = localStorage.getItem("theme");
  if (!selectedTheme) {
    applyTheme(themes.light);
    return;
  }
  const newTheme = selectedTheme === "light" ? "dark" : "light";
  applyTheme(themes[newTheme]);
  saveTheme(newTheme);
});

// function to display the countries
async function display() {
  // load object
  startSpinning();
  const results = await getData().catch((error) => {});
  localStorage.setItem("results", JSON.stringify(results));

  results.forEach((result) => {
    // get values
    const { flag, name, population, region, capital } = result;

    //display values
    const innnerHTMLstr = ` <div class="element">
    <img src="${flag}" alt=" ${name}flag" class="img" />
    <div class="element_description">
      <p class="name"><span class="to_upper bold">${name || "N\\A"}</span></p>
      <p>
        <span class="to_upper bold">Population: </span
        ><span class="to_upper weight_regural">${
          population.toLocaleString() || "N\\A"
        }</span>
      </p>
      <p>
        <span class="to_upper bold">region: </span
        ><span class="to_upper weight_regural regions">${
          region || "N\\A"
        }</span>
      </p>
      <p>
        <span class="to_upper bold">capital: </span
        ><span class="to_upper weight_regural">${capital || "N\\A"}</}span>
      </p>
    </div>
    </div>`;
    element_container.innerHTML += innnerHTMLstr;
  });
  stopSpinning();
   const elements = findAll("element");
  return { elements, results };

}

// function to handle element's click event
async function elementClickHandler(country, results = false) {
 if (!results) {
    results = JSON.parse(localStorage.getItem("results"));
    if (!results) results = await getData();
  }

  let result;
  results.forEach((val) => {
    if (val.name === country) {
      result = val;
      return;
    }
  });

  detailed_element_wrapper.classList.remove("disabled");
  search_filter_container.classList.add("disabled");
  element_container.classList.add("disabled");

  // get values

  const {
    flag,
    name,
    population,
    region,
    capital,
    nativeName,
    subregion,
    topLevelDomain,
    currencies,
    languages,
  } = result;

  const bordersAlpha3 = result.borders;
  const borders = [];
  if (bordersAlpha3) {
    bordersAlpha3.forEach((border) => {
      results.forEach((result) => {
        if (result.alpha3Code === border) {
          borders.push(result.name);
          return;
        }
      });
    });
  }
 let borderStr = "";
  if (borders) {
    borders.forEach((border) => {
      if (border.includes("'")) {
        border = border.replace(/'/g, "\\'");
      }

      borderStr += `<button
      onclick="elementClickHandler('${border}')" 
      onclick='elementClickHandler("${border}")' 
      class="to_upper weight_regural border_country_btn"
      >${border}</button>`;
    });
  }
  let topLevelDomainStr = "";
  if (topLevelDomain)
    topLevelDomain.forEach((domain) => (topLevelDomainStr += `${domain} `));

  let currenciesStr = "";
  if (currencies) {
    currencies.forEach((currency) => {
      if (currenciesStr !== "") {
        currenciesStr += `, ${currency.name}`;
      }
      if (currenciesStr === "") {
        currenciesStr += `${currency.name}`;
      }
    });
  }
  let languagesStr = "";
  if (languages) {
    languages.forEach((language) => {
      if (languagesStr !== "") {
        languagesStr += `, ${language.name}`;
      }
      if (languagesStr === "") {
        languagesStr += `${language.name}`;
      }
    });
  }

  //display values
  const innerHTMLStr = `
  <img src="${flag}" alt="${flag} flag" class="flag img" />
  <div class="detailed_description">
    <p class="country_name name">${name}</p>
    <div class="row">
      <div class="col">
        <p>
          <span class="bold to_upper">native name: </span>
          <span class="to_upper weight_regural">${nativeName}</span>
        </p>
        <p>
          <span class="bold to_upper">population: </span>
          <span class="to_upper weight_regural">${population.toLocaleString()}</span>
        </p>
        <p>
          <span class="bold to_upper">region: </span>
          <span class="to_upper weight_regural">${region}</span>
        </p>
        <p>
          <span class="bold to_upper">sub region: </span>
          <span class="to_upper weight_regural">${subregion}</span>
        </p>
        <p>
          <span class="bold to_upper">capital: </span>
          <span class="to_upper weight_regural">${capital || "N\\A"}</span>
        </p>
      </div>
      <div class="col">
        <p>
          <span class="bold to_upper">top level domain: </span>
          <span class=" weight_regural">${topLevelDomainStr}</span>
        </p>
        <p>
          <span class="bold to_upper">currencies: </span>
          <span class="to_upper weight_regural">${
            currenciesStr || "N\\A"
          }</span>
        </p>
        <p>
          <span class="bold to_upper">languages: </span>
          <span class="to_upper weight_regural">${languagesStr}</span>
        </p>
      </div>
    </div>
    <p class="border_countries">
      <span class="to_upper bold">Border countries: </span>
     <div class="bourder_countries_btn_wrapper">
     ${borderStr || "N\\A"}
     </div>
    </p>
  </div>`;
  detailed_element.innerHTML = innerHTMLStr;
}

async function onWindowLoad() {
  applySavedTheme();
  filter.selectedIndex = 0;
  searchElement.value = "";
  const { elements, results } = await display();
  // elements expand event listener
  await elements.forEach((element) => {
    element.addEventListener("click", () => {
      const country = element.childNodes[3].childNodes[1].textContent;
      elementClickHandler(country, results);
    });
  });

  // filter functionality
  filter.addEventListener("change", (e) => {
    const selectedFilter = e.target.value;
    elements.forEach((element) => {
      element.classList.remove("disabled");
      if (selectedFilter === "all") return;
      const region =
        element.childNodes[3].childNodes[5].childNodes[2].textContent;

      if (region !== selectedFilter) {
        element.classList.add("disabled");
      }
    });
  });

  //search functionality
  searchElement.addEventListener("input", (e) => {
    const searchPattern = e.target.value;
    

    elements.forEach((element) => {
      element.classList.remove("s_disabled");
      if (searchPattern === "") return;

      const name = element.childNodes[3].childNodes[1].textContent;
      const bool = name.toLowerCase().includes(searchPattern.toLowerCase());

      if (!bool) {
        element.classList.add("s_disabled");
      }
    });
  });
}

//spinning animation function
function startSpinning() {
  setRootProperty("--display", "inline-block");
}
function stopSpinning() {
  setRootProperty("--display", "none");
}
