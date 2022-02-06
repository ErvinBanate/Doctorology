$(document).ready(() => {
    $(window).on('load', () => {
        $.ajax({
            url: 'http://Localhost:8080/Show',
            method: 'GET',
            dataType: 'html'
        }).done((data) => {
            $('#patients').empty();
            $('#patients').append(data);
        });
        let time = ['1:00', '2:00', '3:00', '4:00', '5:00'];
        let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let timeDisplay = '';
        let monthDisplay = '';
        let dayDisplay = '';
        let yearDisplay = '';

        for (timer = 0; timer < 5; timer++) {
            timeDisplay += `<option value="${time[timer]}">${time[timer]} PM</option>`;
        }

        for (monthNumber = 0; monthNumber < 12; monthNumber++) {
            monthDisplay += `<option value="${monthNumber + 1}">${month[monthNumber]}</option>`;
        }

        for (day = 1; day < 32; day++) {
            dayDisplay += `<option value="${day}">${day}</option>`;
        }

        for (year = 2022; year < 2031; year++) {
            yearDisplay += `<option value="${year}">${year}</option>`;
        }

        $('#time').append(timeDisplay);
        $('#mm').append(monthDisplay);
        $('#dd').append(dayDisplay);
        $('#yyyy').append(yearDisplay);
        $('select').val('');
    });
});