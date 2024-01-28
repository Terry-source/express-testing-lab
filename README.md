# Express Testing Lab

Today, you will be adding automated testing to your Express API. You should have tests for each of the endpoints defined in [controllers/gifs.js](./controllers/gifs.js):

- GET `/gifs` which will list out all gifs
- GET `/gifs/:id` which will get a gif with a specific ID
- POST `/gifs` which will add a new gif and return that new gif
- PUT `gifs/:id` which will update a gif and return that gif
- DELETE `gifs/:id` which will delete a gif

Your code should make sure that each endpoint returns what it is supposed to.

## Set up

1. First, clone this repo and run `npm i`
2. Create an `.env` file and add your `DATABASE_URL` to it
3. Run `node db/seed.js` to populate your database with seed data
4. Write your tests!

## Hints

- If you encounter any errors in the running of the app or tests, cross-check with the example we did in the codealong
- Since we are connecting with Mongoose in this lab, you will also have to do some research on how to handle this connection when the test ends - like the server, it should be closed after the tests finish
- For some of the tests (e.g. DELETE), you will be mutating the actual DB data - you can run the `db/seed` script to reset it for future test runs (IRL we would actually mock dependencies like this for unit tests)

## Extension

Add tests to one of your previous Express APIs (todo, dev skills, mongoose-movies, mongoose-flights).
