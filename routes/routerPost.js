const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
const database = new sqlite.Database(path.resolve(__dirname, '../Database/Doctorology.db'));
const router = express.Router();
const sql = require('../models/select');

router.use(bodyParser.urlencoded({extended: true}));

router.post('/Submit', (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const mName = req.body.mName;
    const age = req.body.age;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const fbName = req.body.fbName;
    const date = req.body.date;
    const time = req.body.time;

    const status = sql.newAppointment(fName, lName, mName, age, phoneNumber, email, fbName, date, time);
    console.log(status);
    res.send(status);
});

router.post('/Delete', (req, res) => {
    // console.log(req);
    const key = req.body.key;
    database.run('DELETE FROM Patient WHERE ID = ?', [key], (err) => {
        if (err) {
            throw err;
        }
        // console.log(req);
        res.send('Appointment Deleted');
    });
});

router.post('/getData', (req, res) => {
    const key = req.body.key;
    database.all('SELECT * FROM Patient ORDER BY Date, Time', (err, result) => {
        if (err) {
            throw err;
        }
        result.forEach((row) => {
            if(key == row.ID) {
                res.send(row);
            }
        });
    });
});

router.post('/Edit', (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const mName = req.body.mName;
    const age = req.body.age;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const fbName = req.body.fbName;
    const date = req.body.date;
    const time = req.body.time;


    database.serialize(() => {
        let data = [fName, lName, mName, age, phoneNumber, email, fbName, date, time]; 
        database.get('SELECT * FROM Patient WHERE Date = ? AND Time = ?', [date, time], (err, result) => {
            if (err) {
                throw err;
            } else {
                if(result == undefined && data.join('').length > 0) {
                    database.run('INSERT INTO Patient (First_Name,Last_Name,Middle_Name,Age,Phone_Number,Email_Address,Facebook_Name, Date, Time) VALUES(?,?,?,?,?,?,?,?,?)',
                    data, (err) => {
                        if (err) {
                            throw err;
                        }
                        res.send('Registered');
                    });
                } else {
                    res.send('Present');
                }
            }
        });
    })
    database.serialize(() => {
        let data = [fName, lName, mName, age, phoneNumber, email, fbName, date, time];
        database.get('SELECT * FROM Patient WHERE Date = ? AND Time = ?', [date, time], (err, result) => {
            if (err) {
                throw err;
            } else {
                if(result == undefined && data.join('').length > 0) {
                    database.run('INSERT INTO Patient (First_Name,Last_Name,Middle_Name,Age,Phone_Number,Email_Address,Facebook_Name, Date, Time) VALUES(?,?,?,?,?,?,?,?,?)',
                    data, (err) => {
                        if (err) {
                            throw err;
                        }
                        res.send('Registered');
                    });
                } else {
                    res.send('Present');
                }
            }
        });
    });
});
router.post('/Doctor/Check', (req, res) => {
    const dateDoctor = req.body.dateDoctor;
    let patients = '';

    database.all('SELECT * FROM Patient ORDER BY Time', (err, result) => {
        if (err) {
            throw err;
        }
        result.forEach((row) => {
            if (dateDoctor == row.Date) {
                patients += `<tr>
                    <td>${row.Time}</td>
                    <td>${row.First_Name}</td>
                    <td>${row.Last_Name}</td>
                    <td>${row.Middle_Name}</td>
                    <td>${row.Age}</td>
                    <td>${row.Phone_Number}</td>
                    <td>${row.Email_Address}</td>
                    <td>${row.Facebook_Name}</td>
                </tr>`
            }
        });
        res.send(patients);
    });
});

module.exports = router;