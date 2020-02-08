'use strict'
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let tables = [

];
let waitList = [

]
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));
app.get('/api/tables', (req, res) => res.json(tables));
app.get('/api/waitlist', (req, res) => res.json(waitList));
app.post('/api/tables', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newReservation = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newReservation.customerName = newCharacter.name.replace(/\s+/g, '').toLowerCase();
    if (tables.length > 4) {
        waitList.push(newReservation);
    } else {
        tables.push(newReservation);
    }
    console.log(newReservation);
    // tables.push(newReservation);
    res.json(newReservation);
});
app.listen(PORT, () => console.log('App listening on PORT ' + PORT));