const request = require('supertest');
const { app, server } = require('../../app');
const mongoose = require('../../db/connection');
const seedData = require('../../db/seeds.json');

describe("Test gif endpoints", () => {
    test("GET /gifs should respond with all gifs", async () => {
        const response = await request(app).get("/gifs");
        expect(response.body.length).toBe(seedData.length);
        expect(
            seedData.every((gif) =>
                response.body.some((resGif) => resGif.name === gif.name)
            )
        );
        expect(response.statusCode).toBe(200);
    });

    test("GET /gifs/:id should respond with the gif with that id", async () => {
        const allGifs = (await request(app).get("/gifs")).body;
        const gifToFind = allGifs[0];

        const response = await request(app).get(`/gifs/${gifToFind._id}`);
        expect(response.body).toEqual(gifToFind);
        expect(response.statusCode).toBe(200);
    });

    test("POST /gifs should add the gif and respond with the added gif", async () => {
        const gifToAdd = {
            name: "test",
            url: "testurl",
            tags: ["test", "test2"],
        };

        const response = await request(app).post("/gifs").send(gifToAdd);
        const addedGif = response.body;

        expect(
            (await request(app).get("/gifs")).body.includes(
                (gif) => gif._id === addedGif._id
            )
        );
        expect(addedGif.name).toEqual(gifToAdd.name);
        expect(response.statusCode).toBe(200);
    });

    test("PUT /gifs should update the gif and respond with the updated gif", async () => {
        const allGifs = (await request(app).get("/gifs")).body;
        const gifToUpdate = allGifs[0];
        const update = { name: "updated name" };

        const response = await request(app)
            .put(`/gifs/${gifToUpdate._id}`)
            .send(update);
        const updatedGif = response.body;

        expect(updatedGif.name).toEqual(update.name);
        expect(updatedGif.url).toEqual(gifToUpdate.url);
        expect(response.statusCode).toBe(200);
    });

    test("DELETE /gifs/:id should delete the gif and respond with the deleted gif", async () => {
        let allGifs = (await request(app).get("/gifs")).body;
        const gifToDelete = allGifs[0];

        const response = await request(app).delete(`/gifs/${gifToDelete._id}`);
        expect(response.body).toEqual(gifToDelete);
        allGifs = (await request(app).get("/gifs")).body;
        expect(!allGifs.some((gif) => gif._id === gifToDelete._id));
        expect(response.statusCode).toBe(200);
    });
});

afterAll((done) => {
    server.close();
    mongoose.connection.close().then(setTimeout(() => done(), 10000));
});