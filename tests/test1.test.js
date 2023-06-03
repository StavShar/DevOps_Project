const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const script = require('../src/script');

const UrlDb = 'mongodb://student-grades:pYdReqSZSnwYZn4s42YUJDrybk6vODBaZg23rs8vTLTy0rEQFesOIWnjIsAryULVck4jmE6kNIarACDbAG6WWw==@student-grades.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@student-grades@';

describe('Test suite 1:', () => {
    test('test 1: ', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });
    test('test 2: ', async () => {
        const res = await request(app).get('/1234');
        expect(res.statusCode).toEqual(404);
    });
});

describe('Testing grade validation:', () => {
    test('Valid grade 95 should return true', () => {
        const grade = 95;
        const res = script.gradeValidation(grade);
        expect(res).toEqual(true);
    });
    test('Invalid grade test should return true', () => {
        const grade = 'test';
        const res = script.gradeValidation(grade);
        expect(res).toEqual(false);
    });
    test('Invalid grade 105 should return true', () => {
        const grade = 105;
        const res = script.gradeValidation(grade);
        expect(res).toEqual(false);
    });
    test('Invalid grade -50 should return true', () => {
        const grade = -50;
        const res = script.gradeValidation(grade);
        expect(res).toEqual(false);
    });
    test('Invalid grade 50.5 should return true', () => {
        const grade = 50.5;
        const res = script.gradeValidation(grade);
        expect(res).toEqual(false);
    });
});

describe('Testing name validation:', () => {
    test('Valid name Israel Israeli should return true', () => {
        const name = 'Israel Israeli';
        const res = script.nameValidation(name);
        expect(res).toEqual(true);
    });
    test('Invalid name Israel should return false', () => {
        const name = 'Israel';
        const res = script.nameValidation(name);
        expect(res).toEqual(false);
    });
    test('Invalid name Israel2 Israeli should return false', () => {
        const name = 'Israel2 Israeli';
        const res = script.nameValidation(name);
        expect(res).toEqual(false);
    });
    test('Invalid name Israel Israeli2 should return false', () => {
        const name = 'Israel Israeli2';
        const res = script.nameValidation(name);
        expect(res).toEqual(false);
    });
});

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
