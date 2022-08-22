"use strict";

const fs = require("fs");
const https = require("https");

async function getCountryName(code) {
    code = "TN";
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/countries?page=<PAGE_NUMBER>
    const api = "https://jsonmock.hackerrank.com/api/countries?page=";
    return new Promise((resolve, reject) => {
        for (let i = 1; i <= 25; ++i) {
            https.get(api + i, (res) => {
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });
                res.on("end", () => {
                    let js = JSON.parse(data);
                    let countryInfo = js.data;
                    for (let ii of countryInfo) {
                        if (ii.alpha2Code == code) {
                            resolve(ii.name);
                        }
                    }
                });
            }).on("error", (e) => {
                console.log(e);
            });
        }
    });
}

const name = getCountryName(2);
console.log(name);
