$(document).ready(() => {
    $(document).on('click', '.edit', (el) => {
        const id = el.target.id;
        $.ajax({
            url: 'http://Localhost:8080/getData',
            method: 'POST',
            data: {key: id},
            dataType: 'json'
        }).done((data) => {
            const date = data.Date.split("-");
            const url = 'http://Localhost:8080/modalimage2.jpg';
            $('#fName').val(data.First_Name);
            $('#mName').val(data.Middle_Name);
            $('#lName').val(data.Last_Name);
            $('#phoneNumber').val(data.Phone_Number);
            $('#email').val(data.Email_Address);
            $('#fbName').val(data.Facebook_Name);
            $('#age').val(data.Age);
            $('#time').val(data.Time);
            $('#mm').val(date[1]);
            $('#dd').val(date[2]);
            $('#yyyy').val(date[0]);
            $('#title').text('Edit Schedule');
            $('#save').text('Apply Changes');
            $('#picture').css('background-image', `url(${url})`);
            $('#save').attr('id', 'change');
        });
    });
    $('#change').click(() => {
        let fName = $('#fName').val();
        let lName = $('#lName').val();
        let mName = $('#mName').val();
        let age = $('#age').val();
        let phoneNumber = $('#phoneNumber').val();
        let email = $('#email').val();
        let fbName = $('#fbName').val();
        let month = $('#mm').val();
        let day = $('#dd').val();
        let year = $('#yyyy').val();
        let time = $('#time').val();
        let dataGet = [
            fName,
            lName,
            mName,
            age, 
            phoneNumber, 
            email, 
            fbName, 
            month,
            day,
            year,
            time
        ];
        // $('#errorGroup').show();
        // $('#errorMessage').text("Appointment has been Registered!!");
        // $('.popupCloseButton').click(() => {
        //     $('#errorGroup').hide();
        // });

        if (dataGet.join('').length < 27) {
            $('#errorGroup').show();
            $('#errorMessage').text("Please Fill-In all the Basic Information Properly to Edit an Appointment");
            $('.popupCloseButton').click(() => {
                $('#errorGroup').hide();
            });
            $('#modalBox').modal('hide');

            return;
        }

        let date = `${year}-${month}-${day}`;

        $.ajax({
            url: 'http://Localhost:8080/Edit',
            method: 'POST',
            data: {fName: fName, lName: lName, mName: mName, age: age, phoneNumber: phoneNumber, email: email, fbName: fbName, date: date, time: time},
            dataType: 'text'
        }).done((data) => {
            console.log(data);
            if (data == 'success') {
                // alert("Appointment has been Registered!!");
                    
                $('#errorGroup').show();
                $('#errorMessage').text("Appointment has been Changed!!");
                $('.popupCloseButton').click(() => {
                    $('#errorGroup').hide();
                });
                $('input').val('');
                $('select').val('');
                $.ajax({
                    url: 'http://Localhost:8080/Show',
                    method: 'GET',
                    dataType: 'html'
                }).done((data) => {
                    $('#patients').empty();
                    $('#patients').append(data);
                });
                return;
            }
            else if (data == 'Present') {
                // alert('This Schedule has already been taken, Please choose different Day or Time');
                $('#errorGroup').show();
                $('#errorMessage').text("This Schedule has already been taken, Please choose different Day or Time");
                $('.popupCloseButton').click(() => {
                    $('#errorGroup').hide();
                });
                return;
            }
            else {
                // alert('ERROR!!!');
                $('#errorGroup').show();
                $('#errorMessage').text("SERVER ERROR!!!");
                $('.popupCloseButton').click(() => {
                    $('#errorGroup').hide();
                });
            }
        });
    });
});