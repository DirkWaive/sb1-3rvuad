jQuery(document).ready(function($) {
    var timesheet = {};

    // Load saved data on page load
    $.ajax({
        url: timesheetAjax.ajaxurl,
        type: 'POST',
        data: {
            action: 'get_timesheet'
        },
        success: function(response) {
            timesheet = JSON.parse(response);
            populateForm(timesheet);
        }
    });

    function populateForm(data) {
        for (var day in data) {
            $('#' + day + '-hours').val(data[day].hours);
            $('#' + day + '-project').val(data[day].project);
            $('input[name="' + day + '-work-type"][value="' + data[day].workType + '"]').prop('checked', true);
        }
    }

    $('#enhanced-timesheet-form').on('submit', function(e) {
        e.preventDefault();
        saveTimesheet();
    });

    $('#submit-timesheet').on('click', function() {
        saveTimesheet(true);
    });

    function saveTimesheet(showEmail = false) {
        timesheet = {};
        $('.day-entry').each(function() {
            var day = $(this).find('legend').text();
            timesheet[day] = {
                hours: $(this).find('input[type="number"]').val(),
                project: $(this).find('select').val(),
                workType: $(this).find('input[type="radio"]:checked').val()
            };
        });

        $.ajax({
            url: timesheetAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'save_timesheet',
                timesheet: JSON.stringify(timesheet)
            },
            success: function(response) {
                var result = JSON.parse(response);
                if (result.success) {
                    alert('Timesheet saved successfully!');
                    if (showEmail) {
                        displayTimesheetSummary();
                        $('#email-form').show();
                    }
                } else {
                    alert('Error saving timesheet. Please try again.');
                }
            }
        });
    }

    function displayTimesheetSummary() {
        var output = '<h3>Timesheet Summary:</h3><ul>';
        for (var day in timesheet) {
            output += '<li><strong>' + day + ':</strong> ' +
                      timesheet[day].hours + ' hours, ' +
                      timesheet[day].project + ', ' +
                      timesheet[day].workType + '</li>';
        }
        output += '</ul>';
        $('#enhanced-timesheet-output').html(output);
    }

    $('#send-email').on('click', function() {
        var recipientEmail = $('#recipient-email').val();
        if (recipientEmail) {
            // Here you would typically send the email via AJAX
            console.log('Sending email to:', recipientEmail);
            console.log('Timesheet data:', timesheet);
            alert('Email sent to ' + recipientEmail);
        } else {
            alert('Please enter a recipient email address.');
        }
    });
});