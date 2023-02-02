let express = require("express");
var expect = require("chai").expect;
var request = require("request");

describe("Test Account Setup", function () {
    var url = 'http://localhost:3000/login.html';
    //first it function
    it("return status 200 to check if api works", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });

    //second it function
    var registerurl = "http://localhost:3000/register.html"
    it("return status 200 to check if api works", function (done) {
        request(registerurl, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });

    //third it function
    var url = 'http://localhost:3000/adrVar.html';

    it("return status 200 to check if api works", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });

    //fourth it function
    var url = 'http://localhost:3000/createAcc.html';

    it("return status 200 to check if api works", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
});

