<?php
/*
Plugin Name: Enhanced Timesheet Plugin
Description: A comprehensive timesheet submission form with email output and data persistence
Version: 1.0
Author: Your Name
*/

function enhanced_timesheet_shortcode() {
    ob_start();
    ?>
    <div id="enhanced-timesheet-container">
        <form id="enhanced-timesheet-form">
            <h2>Weekly Timesheet</h2>
            <?php
            $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            foreach ($days as $day) {
                echo "<fieldset class='day-entry'>";
                echo "<legend>$day</legend>";
                echo "<div class='form-group'>";
                echo "<label for='{$day}-hours'>Hours worked:</label>";
                echo "<input type='number' id='{$day}-hours' name='{$day}-hours' min='0' max='24' step='0.5'>";
                echo "</div>";
                echo "<div class='form-group'>";
                echo "<label for='{$day}-project'>Project:</label>";
                echo "<select id='{$day}-project' name='{$day}-project'>";
                echo "<option value=''>Select Project</option>";
                echo "<option value='Project A'>Project A</option>";
                echo "<option value='Project B'>Project B</option>";
                echo "<option value='Project C'>Project C</option>";
                echo "</select>";
                echo "</div>";
                echo "<div class='form-group'>";
                echo "<label>Work Type:</label>";
                echo "<div class='radio-group'>";
                echo "<label><input type='radio' name='{$day}-work-type' value='On-site'> On-site</label>";
                echo "<label><input type='radio' name='{$day}-work-type' value='Remote'> Remote</label>";
                echo "</div>";
                echo "</div>";
                echo "</fieldset>";
            }
            ?>
            <button type="submit" id="save-timesheet">Save Timesheet</button>
            <button type="button" id="submit-timesheet">Submit Timesheet</button>
        </form>
        <div id="enhanced-timesheet-output"></div>
        <div id="email-form" style="display:none;">
            <h3>Send Timesheet</h3>
            <input type="email" id="recipient-email" placeholder="Recipient Email">
            <button id="send-email">Send</button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

function enhanced_timesheet_enqueue_assets() {
    wp_enqueue_style('enhanced-timesheet-style', plugins_url('css/style.css', __FILE__));
    wp_enqueue_script('enhanced-timesheet-script', plugins_url('js/script.js', __FILE__), array('jquery'), '1.0', true);
    wp_localize_script('enhanced-timesheet-script', 'timesheetAjax', array('ajaxurl' => admin_url('admin-ajax.php')));
}

function save_timesheet_data() {
    if (isset($_POST['timesheet'])) {
        $timesheet = json_decode(stripslashes($_POST['timesheet']), true);
        update_option('saved_timesheet_data', $timesheet);
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
    wp_die();
}

function get_saved_timesheet_data() {
    $saved_data = get_option('saved_timesheet_data', array());
    echo json_encode($saved_data);
    wp_die();
}

add_shortcode('enhanced_timesheet', 'enhanced_timesheet_shortcode');
add_action('wp_enqueue_scripts', 'enhanced_timesheet_enqueue_assets');
add_action('wp_ajax_save_timesheet', 'save_timesheet_data');
add_action('wp_ajax_nopriv_save_timesheet', 'save_timesheet_data');
add_action('wp_ajax_get_timesheet', 'get_saved_timesheet_data');
add_action('wp_ajax_nopriv_get_timesheet', 'get_saved_timesheet_data');