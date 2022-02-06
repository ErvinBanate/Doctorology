const express = require('express');
const path = require('path');
const sqlite = require('sqlite3');
const database = new sqlite.Database(path.resolve(__dirname, '../Database/Doctorology.db'));
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('Doctorology.html', {root: path.join('./HTML')});
});

router.get('/Register', (req, res) => {
    res.sendFile('Register.html', {root: path.join('./HTML')});
});

router.get('/Doctor', (req, res) => {
    res.sendFile('Doctor.html', {root: path.join('./HTML')});
});

router.get('/Show', (req, res) => {
    let patients = "";
    database.all('SELECT * FROM Patient ORDER BY Date, Time', (err, result) => {
        if (err) {
            throw err;
        }
        
        result.forEach((row) => {
            patients += `<tr>
                <td class="id">${row.ID}</td>
                <td>${row.First_Name}</td>
                <td>${row.Middle_Name}</td>
                <td>${row.Last_Name}</td>
                <td>${row.Age}</td>
                <td>${row.Phone_Number}</td>
                <td>${row.Email_Address}</td>
                <td>${row.Facebook_Name}</td>
                <td>${row.Date}</td>
                <td>${row.Time} PM</td>
                <td><button id=${row.ID} class="btn btn-info btn-lg delete "><a class="fa fa-trash fa-1x"></a></button></td>
                <td><button id=${row.ID} class="btn btn-info btn-lg edit" data-toggle="modal"
                data-target="#modalBox"><a class="fa fa-pencil-square-o fa-1x"></a></button></td>
            </tr>`
        });
        res.send(patients);
    });
});

module.exports = router;
