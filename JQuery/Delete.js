$(document).ready(() => {
    $(document).on('click', '.delete', (el) => {
        const id = el.target.id;
        $.ajax({
            url: 'http://Localhost:8080/Delete',
            method: 'POST',
            data: {key: id},
            dataType: 'text'
        }).done((data) => {
            if (data == 'Appointment Deleted') {
                $.ajax({
                    url: 'http://Localhost:8080/Show',
                    method: 'GET',
                    dataType: 'html'
                }).done((data) => {
                    $('#patients').empty();
                    $('#patients').append(data);
                });
            }
        });
    });
});