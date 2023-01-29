let express = require("express");
var expect = require("chai").expect; 
var request = require("request"); 
const {app} = require('./../server');
// const app = express();

describe("Check login page status", function()
{
    var url = 'http://localhost:3000/login.html';
    //first it function
    it("return status 200 to check if api works", function(done){
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
        
    });

//     //second it function
    // it("returns statusCode key in body to check if api give right result should be 200", function(done) {
    //     request(url, function(error, response, body) {
    //         body = JSON.parse(body) //when you want to make use of the body object
    //         expect(body.statusCode).to.equal(200);
    //         done()
    //         });
    // });

//         //third it function
//     it("returns the result as number", function(done) {
//         request(url, function(error, response, body) {
//             body = JSON.parse(body)
//             expect(body.result).to.be.a('number');
//             done()
//           });
//     });

//     it("returns the result equal to 8", function(done) {
//         request(url, function(error, response, body) {
//             body = JSON.parse(body)
//             expect(body.result).to.equal(8);
//             done()
//           });
//     });
//     it("returns the result not equal to 15", function(done) {
//       request(url, function(error, response, body) {
//           body = JSON.parse(body)
//           expect(body.result).to.not.equal(15);
//           done()
//         });
//   });
  

});

describe("Check registration page status", function() {
    var url = "http://localhost:3000/register.html";
    it("should not returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    // it("returns statusCode key in body to check if api gives right result should be 400", function(done) {
    //     request(url, function(error, response, body) {
    //         body = JSON.parse(body)
    //         expect(body.statusCode).to.equal(400);
    //         done()
    //       });
    // });
    // it("returns the result as null", function(done) {
    //     request(url, function(error, response, body) {
    //         body = JSON.parse(body)
    //         expect(body.result).to.be.a('null');
    //         done()
    //       });
    // });
  });
  
  
  