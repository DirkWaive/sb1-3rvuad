<?php
/*
Plugin Name: Timesheet Submission Form
Description: A responsive timesheet submission form with dark mode and language selection
Version: 1.0
Author: Your Name
*/

function timesheet_form_shortcode() {
    ob_start();
    ?>
    <div id="timesheet-form-container" class="timesheet-light">
        <div class="timesheet-header">
            <h1><?php echo esc_html__('Timesheet Submission Form', 'timesheet-form'); ?></h1>
            <div class="timesheet-controls">
                <select id="language-select">
                    <option value="en">English</option>
                    <option value="ro">Română</option>
                </select>
                <button id="dark-mode-toggle" class="icon-button">
                    <span class="sun-icon">☀️</span>
                    <span class="moon-icon">🌙</span>
                </button>
            </div>
        </div>
        <form id="timesheet-form">
            <?php
            $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            foreach ($days as $day) {
                ?>
                <div class="day-section">
                    <button type="button" class="day-toggle"><?php echo esc_html__($day, 'timesheet-form'); ?></button>
                    <div class="day-content">
                        <input type="text" name="<?php echo esc_attr(strtolower($day)); ?>-full-name" placeholder="<?php echo esc_attr__('FULL NAME', 'timesheet-form'); ?>" class="full-width-input">
                        <input type="text" name="<?php echo esc_attr(strtolower($day)); ?>-address" placeholder="<?php echo esc_attr__('ROAD / ADDRESS', 'timesheet-form'); ?>" class="full-width-input">
                        <input type="text" name="<?php echo esc_attr(strtolower($day)); ?>-contract-number" placeholder="<?php echo esc_attr__('CONTRACT NUMBER', 'timesheet-form'); ?>" class="full-width-input">
                        
                        <div class="shifts-section">
                            <label><?php echo esc_html__('SHIFTS', 'timesheet-form'); ?></label>
                            <?php
                            $shifts = [0.5, 1, 1.5, 2, 2.5, 3];
                            foreach ($shifts as $shift) {
                                ?>
                                <label class="shift-checkbox">
                                    <input type="checkbox" name="<?php echo esc_attr(strtolower($day)); ?>-shifts[]" value="<?php echo esc_attr($shift); ?>">
                                    <?php echo esc_html($shift); ?>
                                </label>
                                <?php
                            }
                            ?>
                        </div>
                        
                        <div class="radio-group">
                            <label><?php echo esc_html__('CONTRACTOR', 'timesheet-form'); ?> *</label>
                            <label><input type="radio" name="<?php echo esc_attr(strtolower($day)); ?>-contractor" value="Conway" required> Conway</label>
                            <label><input type="radio" name="<?php echo esc_attr(strtolower($day)); ?>-contractor" value="Riney" required> Riney</label>
                        </div>
                        
                        <div class="radio-group">
                            <label><?php echo esc_html__('JOB TYPE', 'timesheet-form'); ?> *</label>
                            <label><input type="radio" name="<?php echo esc_attr(strtolower($day)); ?>-job-type" value="Reactive" required> <?php echo esc_html__('Reactive', 'timesheet-form'); ?></label>
                            <label><input type="radio" name="<?php echo esc_attr(strtolower($day)); ?>-job-type" value="Planned" required> <?php echo esc_html__('Planned', 'timesheet-form'); ?></label>
                        </div>
                        
                        <div class="radio-group">
                            <label><?php echo esc_html__('TRANSPORT', 'timesheet-form'); ?> *</label>
                            <label><input type="radio" name="<?php echo esc_attr(strtolower($day)); ?>-transport" value="IONA" required> IONA</label>
                            <label><input type="radio" name="<?php echo esc_attr(strtolower($day)); ?>-transport" value="CONWAY" required> CONWAY</label>
                        </div>
                        
                        <input type="number" name="<?php echo esc_attr(strtolower($day)); ?>-fuel-cost" placeholder="<?php echo esc_attr__('FUEL COST', 'timesheet-form'); ?>" class="full-width-input">
                        
                        <button type="button" class="save-day-button"><?php echo esc_html__('Save', 'timesheet-form'); ?> <?php echo esc_html__($day, 'timesheet-form'); ?></button>
                    </div>
                </div>
                <?php
            }
            ?>
            <button type="submit" id="submit-timesheet"><?php echo esc_html__('Submit Timesheet', 'timesheet-form'); ?></button>
        </form>
        <div id="timesheet-output"></div>
    </div>
    <?php
    return ob_get_clean();
}

function enqueue_timesheet_assets() {
    wp_enqueue_style('timesheet-style', plugins_url('css/style.css', __FILE__));
    wp_enqueue_script('timesheet-script', plugins_url('js/script.js', __FILE__), array('jquery'), '1.0', true);
    wp_localize_script('timesheet-script', 'timesheetAjax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('timesheet_nonce')
    ));
}

function handle_timesheet_submission() {
    check_ajax_referer('timesheet_nonce', 'nonce');
    
    $timesheet_data = isset($_POST['timesheet']) ? json_decode(stripslashes($_POST['timesheet']), true) : null;
    
    if ($timesheet_data) {
        // Process and save the timesheet data
        // This is where you would typically save to the database
        update_option('saved_timesheet_data', $timesheet_data);
        wp_send_json_success('Timesheet submitted successfully');
    } else {
        wp_send_json_error('Invalid timesheet data');
    }
}

add_shortcode('timesheet_form', 'timesheet_form_shortcode');
add_action('wp_enqueue_scripts', 'enqueue_timesheet_assets');
add_action('wp_ajax_submit_timesheet', 'handle_timesheet_submission');
add_action('wp_ajax_nopriv_submit_timesheet', 'handle_timesheet_submission');