const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose');
const UrlDb = 'mongodb://student-grades:pYdReqSZSnwYZn4s42YUJDrybk6vODBaZg23rs8vTLTy0rEQFesOIWnjIsAryULVck4jmE6kNIarACDbAG6WWw==@student-grades.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@student-grades@'

describe("Test suite 1:", () => {
    test("test 1: ", async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
    })
    test("test 2: ", async () => {
        const res = await request(app).get('/1234')
        expect(res.statusCode).toEqual(404)
    })
})
/*
describe("DB connection:", () => {
    test("test 1: ", async () => {
        const res = await request(mongoose).connect(UrlDb)
        //expect(res.statusCode).toEqual(200)
    })
    
    test("test 2: ", async () => {
        const res = await request(app).get('/1234')
        expect(res.statusCode).toEqual(404)
    })
})*/
describe('mongoose.connect() unit test', () => {
    beforeAll(async () => {
        // Increase the timeout to allow more time for the connection
        jest.setTimeout(30000);

        // Connect to the MongoDB database
        await mongoose.connect(UrlDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Close the database connection
        await mongoose.disconnect();
    });

    it('should connect to the MongoDB database', () => {
        // Check if the mongoose connection state is connected
        expect(mongoose.connection.readyState).toEqual(2);
    }, 50000);
});
