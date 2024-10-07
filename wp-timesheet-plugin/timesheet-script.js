jQuery(document).ready(function($) {
    $('#timesheet-form').on('submit', function(e) {
        e.preventDefault();
        
        var timesheet = {};
        $(this).find('input[type="number"]').each(function() {
            var day = this.id.split('-')[0];
            var hours = $(this).val();
            if (hours) {
                timesheet[day] = parseFloat(hours);
            }
        });

        var output = '<h3>Submitted Timesheet:</h3>';
        output += '<ul>';
        for (var day in timesheet) {
            output += '<li>' + day + ': ' + timesheet[day] + ' hours</li>';
        }
        output += '</ul>';

        $('#timesheet-output').html(output);

        // Here you would typically send the data to the server
        console.log('Timesheet data:', timesheet);
    });
});