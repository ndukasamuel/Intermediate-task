const toggleicon = document.getElementById('toggle-icon');
const toggletxt = document.getElementById('toggle-text');

const countriesElement = document.querySelector(".countries");
// const search = document.querySelector(".search")
const dropDown = document.querySelector(".dropDown")
const dropElem = document.querySelector(".drop")
const region = document.querySelectorAll(".region")
const search = document.querySelector(".search-box")












async function getCountry() {
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    console.log(res);
    res.forEach(element => {
        showCountry(element)
    });
}
getCountry()

function showCountry(data) {
    const country = document.createElement('div');
    country.classList.add('country')
    country.innerHTML = `<div class="country-flag">
                <img src="${data.flags.svg}" alt="">
            </div>
            <div class="country-info">
                <h5 class="countryName">${data.name.common}</h5>
                <p><strong>Population:</strong> ${data.population} </p>
                <p class="regionName"><strong>Region:</strong>${data.region}</p>
                <p><strong>Capital:</strong>${data.capital}</p>
            </div>`;
    countriesElement.appendChild(country)
    const detailcontainer = document.getElementById("countrydetailmodal");
    detailcontainer.style.display = "none"
    country.addEventListener("click", () => {
        detailcontainer.style.display = "block"
        showCountryDetail(data)

        const closebtn = document.getElementById("closebtn");

        closebtn.addEventListener("click", () => {
            detailcontainer.style.display = "none"
        })
    })
}


dropDown.addEventListener("click", () => {
    dropElem.classList.toggle("showDropDown")
    console.log("hello"); 
}) 

const regionName = document.getElementsByClassName("regionName")
const countryName = document.getElementsByClassName("countryName")
region.forEach(element => {
    element.addEventListener("click", () => {
        console.log(element);
        Array.from(regionName).forEach(elem => {
            console.log(elem.innerText);
            if (elem.innerText.includes(element.innerText) || element.innerText == "All") {
                elem.parentElement.parentElement.style.display = "grid"
            } else {
                elem.parentElement.parentElement.style.display = "none"
            }
        })
    })
});


search.addEventListener("input", () => {
    console.log(search.value.toLowerCase());
    Array.from(countryName).forEach(elem => {
        if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            elem.parentElement.parentElement.style.display = "grid"
        } else {
            elem.parentElement.parentElement.style.display = "none"
        }
    });
})


toggleicon.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    moon.classList.toggle()
})

const back = document.querySelector(".back")
const countryModal = document.querySelector(".countryModal")

back.addEventListener("click", () => {
    countryModal.classList.toggle("show")
})

function showCountryDetail(data) {
    

    document.getElementById("cName").innerHTML = data.name.common;
    document.getElementById("cflag").innerHTML = `<img src="${data.flags.svg}" alt="">`;

    document.getElementById("cname").innerHTML = data.name.common;
    document.getElementById("cpop").innerHTML = data.population;
    document.getElementById("creg").innerHTML = data.region;
    document.getElementById("csreg").innerHTML = data.subregion;
    document.getElementById("ccap").innerHTML = data.capital;
    document.getElementById("ctld").innerHTML = data.tld;
    const currencyobj = Object.values(data.currencies);
    console.log(currencyobj[0]);
    document.getElementById("ccur").innerHTML = currencyobj[0]['name'];
    // console.log(data.currencies)
    const langobj = Object.values(data.languages);
    console.log(langobj[0]);
    document.getElementById("clang").innerHTML = langobj[0];
    // countryModal.classList.toggle("show")
}