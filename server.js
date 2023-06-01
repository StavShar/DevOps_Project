const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registerSchema = require('./src/registerSchema');
const UrlDb = 'mongodb+srv://stavsh2:STAV1234@devops.eapaysg.mongodb.net/grades';

const app = express();

async function connecttoDB() {
    try {
        console.log('Trying to connect to DB');
        mongoose.connect(UrlDb);
    } catch (error) {
        console.log('Error connecting to DB');
    }
}
const db = mongoose.connection;

db.on('error', error => { console.error('Failed to connect to MongoDB: ' + error) })
db.once('open', () => { console.log('Connected to MongoDB.') })

//TODO: async func that retrieve data from db

connecttoDB();

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,DELETE",
        preflightContinue: false,
        credentials: true
    })
);

app.use(express.json());
app.use(express.static('src'))

app.get('/', (req, res) => {
    res.send('./src/index.html')
});

app.post('/save', async (req, res) => {
    console.log('server got register request: \n' + JSON.stringify(req.body));

    const data = new registerSchema(req.body);
    const name = req.body.name;
    try {
        const duplicate = await registerSchema.findOne({ name })
        if (duplicate) {
            console.log('This sudent already in DB');
            return res.status(400).send({ error: "This student already exist" });
        }
        else {
            await data.save();
        }

    } catch (err) {
        console.log(err);
    }

    console.log('Data has been saved successfully');
    res.json({ success: true, message: 'Data has been saved successfully' });
});

app.get('/table', async (req, res) => {
    //const data = { name: 'testName', grade1: '81', grade2: '82', grade3: '65' };
    try {
        console.log('getting all data from DB...');
        const projection = { _id: 0, name: 1, grade1: 1, grade2: 1, grade3: 1 };
        const data = await registerSchema.find({}, projection);
        console.log('data: ' + JSON.stringify(data, null, 2));

        if (!data) {
            return res.status(404).send({ error: 'No data found.' });
        }

        console.log('sending all data to client...');
        return res.status(200).send(data);
    } catch (err) {
        /* server might lost connection with DB */
        console.log('error - /table: ' + err);
        return sendDefaultError(res, 'Unexpected error');
    }
    res.json(data);
});

module.exports = app;