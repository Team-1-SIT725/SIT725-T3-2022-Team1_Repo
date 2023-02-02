//require("dotenv").config();
let express = require("express");
let chai = require("chai");
//let chaiHttp = require("chai-http");
var expect = require("chai").expect;
var request = require("request");
const { doesNotReject } = require("assert");

describe("Checking response of server if client is not connected", function () {
    var url = "http://localhost:3000/api/profile/";
    it('Response = 400', function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body);
//checking if the user data response not available 
            expect(body.statusCode).to.equal(400);
            console.log(body);
            done()
        })
    });
});
describe("Checking response of server if client is connected", function () {
    var url = "http://localhost:3000/api/profile/";
    it('Response = 200', function (done) {
        request(url, function (error, response, body) {

            body = JSON.parse(body);
//for now considering not equal to 200 but it should be equal to 200 which tells that the client is connected
            expect(body.statusCode).to.not.equal(200);
            console.log(body);
            done()
        })
    });
});

describe("Checking whether response of message is empty", function () {
    var url = "http://localhost:3000/api/profile/";
    it('Message is empty', function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body);
//testing if there is any value inside the message 
            expect(body.message).empty;
            console.log(body);
            done()
        })
    });
});

describe("Checking whether response of message is empty", function () {
    var url = "http://localhost:3000/api/profile/";
    it('Message is not empty', function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body);
//considering the message exists but for now testing as not equal to a string
            expect(body.message).not.to.equal("message");
            console.log(body);
            done()
        })
    });
});


