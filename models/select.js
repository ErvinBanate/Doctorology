const path = require('path');
const sqlite = require('sqlite3');
const database = new sqlite.Database(path.resolve(__dirname, '../Database/Doctorology.db'));

function newAppointment(fName, lName, mName, age, phoneNumber, email, fbName, date, time) {
    const data = [fName, lName, mName, age, phoneNumber, email, fbName, date, time];
    let status = '';
    database.get('SELECT * FROM Patient WHERE Date = ? AND Time = ?', [date, time], function(err, result) {
        if (err) {
            throw err;
        } else {
            if(result == undefined && data.join('').length > 0) {
                console.log('Registered');
                status - addAppointment(data);
                
            } else {
                console.log('Present');
                status = 'Present';
            }
        }
    });
    console.log(status + '2');
    return(status);
}

function addAppointment(data) {
    database.run('INSERT INTO Patient (First_Name,Last_Name,Middle_Name,Age,Phone_Number,Email_Address,Facebook_Name, Date, Time) VALUES(?,?,?,?,?,?,?,?,?)', data, (err) => {
        if (err) {
            throw err;
        }
        
    });
    return('Registered');
}

function deleteAppointment() {
    database.run('DELETE FROM Patient WHERE ID = ?', [key], (err) => {
        if (err) {
            throw err;
        }
        // console.log(req);
        res.send('Appointment Deleted');
    });
}

function getAppointment() {
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
}

module.exports = {
    newAppointment,
    addAppointment,
    deleteAppointment,
    getAppointment
}
    
    