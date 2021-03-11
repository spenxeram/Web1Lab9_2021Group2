// This script gets Bitcoin exchange data every 30 seconds from
// https://api.coindesk.com/v1/bpi/currentprice/usd.json

// global variables
let currencies = {
  usd: 0,
  jpy: 0,
  vnd: 0
};


// on page load action
document.addEventListener("DOMContentLoaded", () => {
  let i = 0;
  setInterval(()=> {
    console.log(i);
    i++;
  }, 1000);
})



// event Listeners


// ajax call to api


// General functions to process and output data


// helper functions
