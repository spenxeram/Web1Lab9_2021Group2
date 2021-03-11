// This script gets Bitcoin exchange data every 30 seconds from
// https://api.coindesk.com/v1/bpi/currentprice/usd.json

// global variables
let btn = document.querySelector(".btn");
let currencies = {
  usd: 0,
  jpy: 0,
  vnd: 0
};

// on page load action
updateCurrencies();
document.addEventListener("DOMContentLoaded", () => {
  let alertbox = document.querySelector(".checking");
  alertbox.style.opacity = "0";
  let i = 30;
  setInterval(()=> {
    if(i == 3) {
      alertbox.style.opacity = "1";
    } else if (i == 0) {
      alertbox.style.opacity = "0";
      updateCurrencies();
      i = 30;
    }
    i--;
    outputTimer(i);
  }, 1000);
})



// event Listeners
btn.addEventListener("click", () => {
  let customRequest = document.querySelector("#custom-request");
  let requestValue = document.querySelector("#currency").value;
  customRequest.classList = requestValue;
  getBTCVal(requestValue);
})

// ajax call to api
function getBTCVal(currency) {
  let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    url,
    true
  );
  xhr.onload = function() {
      if(this.status == 200) {
      let result = JSON.parse(this.responseText);
      outputCurrency(result, currency)
      }
    }

  xhr.send();
}

// General functions to process and output data
function outputCurrency(result, currency) {
  let outputTarget = document.querySelector(`.${currency}`);
  let currencyValue = result.bpi[currency.toUpperCase()].rate_float;
  let valueclass = "";
  if(currencyValue >= currencies[currency]) {
    valueclass = "green";
  } else {
    valueclass = "red";
  }
  outputTarget.classList = `${currency} ${valueclass}`;
  currencies[currency] = currencyValue;
  currencyValue = Math.round(currencyValue);
  outputTarget.innerText = `${currencyValue.toLocaleString()} ${currency.toUpperCase()}`;
}

function updateCurrencies() {
  Object.keys(currencies).forEach((currency) => {
    getBTCVal(currency);
  });
}

function outputTimer(i) {
  let timer = document.querySelector("span.time");
  timer.innerText = i;
}

// helper functions
