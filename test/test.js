var expect = require("chai").expect
var request = require("request")

describe("Addresss verification", function () {
    var url = "http://localhost:3000/adrVar.html"
    it("returns status 200 to check if api works", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200)
            done()
        })
    })
})