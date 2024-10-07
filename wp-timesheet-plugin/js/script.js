jQuery(document).ready(function($) {
    // Language translations
    const translations = {
        en: {
            fullName: "FULL NAME",
            roadAddress: "ROAD / ADDRESS",
            contractNumber: "CONTRACT NUMBER",
            shifts: "SHIFTS",
            contractor: "CONTRACTOR",
            jobType: "JOB TYPE",
            reactive: "Reactive",
            planned: "Planned",
            transport: "TRANSPORT",
            fuelCost: "FUEL COST",
            save: "Save",
            submitTimesheet: "Submit Timesheet",
            timesheetSubmittedSuccessfully: "Timesheet submitted successfully!",
            errorSubmittingTimesheet: "Error submitting timesheet. Please try again.",
            errorOccurred: "An error occurred. Please try again."
        },
        ro: {
            fullName: "NUME COMPLET",
            roadAddress: "STRADĂ / ADRESĂ",
            contractNumber: "NUMĂR CONTRACT",
            shifts: "TURE",
            contractor: "CONTRACTOR",
            jobType: "TIP DE MUNCĂ",
            reactive: "Reactiv",
            planned: "Planificat",
            transport: "TRANSPORT",
            fuelCost: "COST COMBUSTIBIL",
            save: "Salvează",
            submitTimesheet: "Trimite Pontajul",
            timesheetSubmittedSuccessfully: "Pontajul a fost trimis cu succes!",
            errorSubmittingTimesheet: "Eroare la trimiterea pontajului. Vă rugăm să încercați din nou.",
            errorOccurred: "A apărut o eroare. Vă rugăm să încercați din nou."
        }
    };

    let currentLanguage = 'en';

    // Function to update language
    function updateLanguage(lang) {
        currentLanguage = lang;
        $('[placeholder]').each(function() {
            const key = $(this).attr('name').split('-').pop();
            if (translations[lang][key]) {
                $(this).attr('placeholder', translations[lang][key]);
            }
        });
        $('.shifts-section label:first').text(translations[lang].shifts);
        $('.radio-group label:first').each(function() {
            const key = $(this).text().toLowerCase();
            if (translations[lang][key]) {
                $(this).text(translations[lang][key]);
            }
        });
        $('button.save-day-button').each(function() {
            const day = $(this).text().split(' ')[1];
            $(this).text(translations[lang].save + ' ' + day);
        });
        $('#submit-timesheet').text(translations[lang].submitTimesheet);
    }

    // Language selector
    $('#language-select').on('change', function() {
        updateLanguage($(this).val());
    });

    // Dark mode toggle
    $('#dark-mode-toggle').on('click', function() {
        $('#timesheet-form-container').toggleClass('timesheet-light timesheet-dark');
    });

    // Collapsible day sections
    $('.day-toggle').on('click', function() {
        $(this).next('.day-content').slideToggle();
    });

    // Save day data
    $('.save-day-button').on('click', function() {
        const daySection = $(this).closest('.day-content');
        daySection.find('input[type="text"], input[type="number"]').each(function() {
            localStorage.setItem($(this).attr('name'), $(this).val());
        });
        daySection.find('input[type="checkbox"], input[type="radio"]').each(function() {
            localStorage.setItem($(this).attr('name'), $(this).is(':checked'));
        });
        alert('Day data saved!');
    });

    // Load saved data
    $('.day-content').each(function() {
        $(this).find('input[type="text"], input[type="number"]').each(function() {
            const savedValue = localStorage.getItem($(this).attr('name'));
            if (savedValue) {
                $(this).val(savedValue);
            }
        });
        $(this).find('input[type="checkbox"], input[type="radio"]').each(function() {
            const savedValue = localStorage.getItem($(this).attr('name'));
            if (savedValue === 'true') {
                $(this).prop('checked', true);
            }
        });
    });

    // Submit timesheet
    $('#timesheet-form').on('submit', function(e) {
        e.preventDefault();
        const timesheetData = {};
        $('.day-section').each(function() {
            const day = $(this).find('.day-toggle').text();
            timesheetData[day] = {};
            $(this).find('input[type="text"], input[type="number"]').each(function() {
                const key = $(this).attr('name').split('-').pop();
                timesheetData[day][key] = $(this).val();
            });
            $(this).find('input[type="checkbox"]:checked').each(function() {
                if (!timesheetData[day].shifts) {
                    timesheetData[day].shifts = [];
                }
                timesheetData[day].shifts.push($(this).val());
            });
            $(this).find('input[type="radio"]:checked').each(function() {
                const key = $(this).attr('name').split('-').pop();
                timesheetData[day][key] = $(this).val();
            });
        });

        $.ajax({
            url: timesheetAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'submit_timesheet',
                nonce: timesheetAjax.nonce,
                timesheet: JSON.stringify(timesheetData)
            },
            success: function(response) {
                if (response.success) {
                    alert(translations[currentLanguage].timesheetSubmittedSuccessfully);
                } else {
                    alert(translations[currentLanguage].errorSubmittingTimesheet);
                }
            },
            error: function() {
                alert(translations[currentLanguage].errorOccurred);
            }
        });
    });

    // Initialize with English
    updateLanguage('en');
});