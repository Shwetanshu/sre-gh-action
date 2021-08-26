var express = require('express');
var fetch = require('node-fetch');
var app = express();

const PORT = 4000
const myURL = new URL(`https://api.coinbase.com/v2/prices/spot?currency=`);

app.get("/", (req, res) => {
    const text = "Usage for this application : <br/>"+
                    "/health -> returns ok status if server is running<br/>" +
                    "/currencyName returns the json response. Eg: urlName/USD<br/>"

    res.send(text)
});

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

app.get('/:currencyId', async (req, res) => {
    const currency = req.params.currencyId;
    const apiUrl = myURL.href + `${currency}`
    const fetch_response = await fetch(apiUrl);
    const json = await fetch_response.json();

    if (currency != "favicon.ico"){
        res.json(json);
    }
    
});

app.listen(PORT, function(){
	console.log("Application listening on Port", PORT);
});

module.exports = app
