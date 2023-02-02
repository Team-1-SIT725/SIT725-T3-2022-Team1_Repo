require("dotenv").config();
const express = require("express");
const expect = require("chai").expect;
const request = require("supertest")("http://localhost:3000");

describe("Not Logged In - Item Routes", function () {
    it("post /api/item/add", async function () {
        const response = await request.post("/api/item/add").send({});
        expect(response.status).to.equal(302);
    });

    it("get /api/item/view", async function () {
        const response = await request
            .get("/api/item/view/63d0c8da361c00fab5458316")
            .send({});
        expect(response.status).to.equal(200);
        expect(response._body.statusCode).to.equal(400);
    });

    it("post /api/item/updateavailability", async function () {
        const response = await request
            .post(
                "/api/item/updateavailability/63d0c8da361c00fab5458316/Unavailable"
            )
            .send({});
        expect(response.status).to.equal(200);
        expect(response._body.statusCode).to.equal(400);
        //Note no auth check setup and presently you can change another users items if using the API directly
    });

    it("post /api/item/delete", async function () {
        const response = await request
            .post("/api/item/delete/63d0c8da361c00fab5458316")
            .send({});
        expect(response.status).to.equal(200);
        expect(response._body.statusCode).to.equal(400);
    });

    it("get /api/item/itemimage", async function () {
        const response = await request
            .get("/api/item/itemimage/1675225208843.jpg")
            .send();
        expect(response.status).to.equal(200);
    });
});

describe("Logged in User - Item Routes", function () {
    let cookie;
    let newItem;

    before(async function () {
        const response = await request
            .post("/login")
            .set("Accept", "application/json")
            .send({
                email: process.env.USER_NAME,
                password: process.env.PASSWORD,
            });
        cookie = response.headers["set-cookie"].pop().split(";")[0];
    });

    it("post /api/item/add", async function () {
        const response = await request
            .post("/api/item/add")
            .set("Cookie", cookie)
            .field("itemName", "Unit Test item")
            .field(
                "itemDescription",
                "This is a test item for the unit testing"
            )
            .field("itemCondition", "New")
            .field("itemCategory", "Option1")
            .field("itemAvailability", "Available")
            .attach("photos", "public/images/puppy1.jpg");

        expect(response.status).to.equal(200);
        newItem = response._body.data;
    });

    it("get /api/item/view", async function () {
        let url = "/api/item/view/" + newItem._id;
        const response = await request.get(url).set("Cookie", cookie).send();
        expect(response.status).to.equal(200);
        expect(response._body.statusCode).to.equal(200);
    });

    it("post /api/item/updateavailability", async function () {
        let url =
            "/api/item/updateavailability/" + newItem._id + "/Unavailable";
        const response = await request.post(url).set("Cookie", cookie).send();
        expect(response.status).to.equal(200);
        expect(response._body.statusCode).to.equal(200);
    });

    it("get /api/item/itemimage", async function () {
        let filename = newItem.itemImages[0].newFilename;
        let url = "/api/item/itemimage/" + filename;
        const response = await request.get(url).set("Cookie", cookie).send();
        expect(response.status).to.equal(200);
    });

    it("post /api/item/delete", async function () {
        let url = "/api/item/delete/" + newItem._id;
        const response = await request.post(url).set("Cookie", cookie).send();
        expect(response.status).to.equal(200);
        expect(response._body.statusCode).to.equal(200);
    });
});

describe("Logged in User - Search", function () {
    let cookie;
    let newItem;

    before(async function () {
        const response = await request
            .post("/login")
            .set("Accept", "application/json")
            .send({
                email: process.env.USER_NAME,
                password: process.env.PASSWORD,
            });
        cookie = response.headers["set-cookie"].pop().split(";")[0];
    });

    it("get /api/search/", async function () {
        let url = "/api/search";
        const response = await request
            .get(url)
            .set("Cookie", cookie)
            .query({ term: "iPhone" });
        expect(response.status).to.equal(200);
        expect(response._body.statusCode).to.equal(200);
        expect(response._body.data).to.be.an("array");
    });
});
