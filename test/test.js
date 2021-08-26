const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

//Assertion style
chai.should();

chai.use(chaiHttp);

describe("API testing", () => {

    // Testing health endpoint
    describe("GET /health", () => {
        it("It should GET /health endpoints", (done) => {
            chai.request(app)
                .get('/health') 
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                });
        });
    });

    // Testing /:currencyId endpoint with USD
    describe("GET /USD", () => {
        it("It should GET /:currencyID endpoints", (done) => {
            const currencyId = "USD";
            chai.request(app)
                .get('/' + currencyId) 
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data.should.have.property('currency').eq('USD');
                done();
                });
        });
    });

    // // Testing /:currencyId endpoint with some random coins
    // describe("GET /XYZ", () => {
    //     it("It should return Invalid currency id", (done) => {
    //         const currencyId = "XYZ";
    //         chai.request(app)
    //             .get('/' + currencyId) 
    //             .end((err, response) => {
    //                 response.should.have.status(200);
    //                 response.body.should.be.a('object');
    //                 if (response.body.errors[0]){
    //                     console.log("There is no currency with name ",currencyId)
    //                 }
    //             done();
    //             });
    //     });
    // });

        // Testing /:currencyId endpoint with some random coins
    describe("GET /XYZ", () => {
        it("It should return Invalid currency", (done) => {
            const currencyId = "XYZ";
            chai.request(app)
                .get('/' + currencyId) 
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data.should.have.property('currency').eq('XYZ');
                    if (response.body.data){
                        console.log("There is no currency with name ",currencyId)
                    }
                done();
                });
        });
    });
});

