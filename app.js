var express = require('express');
var fetch = require('node-fetch');
var app = express();
const client = require('prom-client');

const PORT = 4000
const myURL = new URL(`https://api.coinbase.com/v2/prices/spot?currency=`);


const collectDefaultMetrics = client.collectDefaultMetrics

//Probe every 5 seconds
collectDefaultMetrics({timeout: 5000});

const counter = new client.Counter({
    name: 'node_request_operations_total',
    help: 'The total number of processed requests'
});

const histogram  = new client.Histogram({
    name: 'node_request_duration_seconds',
    help: 'Histogram for the duration in seconds.',
    buckets: [1,2,5,8,10]
});

// Defining a counter function that increments counter after every hits in URL within 1 seconds
function metricCounter(){
    var start = new Date()
    var simulateTime = 1000

    setTimeout(arguments => {
        var end = new Date() - start
        histogram.observe(end / 1000);
    }, simulateTime)
    counter.inc();
}

app.get("/", (req, res) => {
    const text = "Usage for this application : <br/>"+
                    "/health -> returns ok status if server is running<br/>" +
                    "/currencyName returns the json response. Eg: urlName/USD<br/>"

    metricCounter()
                            
    res.send(text)
});

app.get('/health', (req, res) => {
    metricCounter()
    res.sendStatus(200);
});

app.get('/:currencyId', async (req, res) => {
    const currency = req.params.currencyId;
    const apiUrl = myURL.href + `${currency}`
    const fetch_response = await fetch(apiUrl);
    const json = await fetch_response.json();
 
    metricCounter()
     
    res.json(json);
});

app.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType)
    res.end(client.register.metrics())
});

app.listen(PORT, function(){
	console.log("Application listening on Port", PORT);
});