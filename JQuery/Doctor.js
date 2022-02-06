$(document).ready(function () {
    $('#check').click(() => {
        const dateDoctor = $('#dateDoctor').val();
        $.ajax({
            url: 'http://Localhost:8080/Doctor/Check',
            method: 'POST',
            data: {dateDoctor: dateDoctor},
            dataType: 'html'
        }).done((data) => {
            if (data == undefined) {
                alert('ERROR!!!!');
                return;
            }
            $('#patients').empty();
            $('#patients').append(data);
        });
    });
});