<?php
/**
 * Plugin Name: Timesheet Submission Form
 * Description: A responsive WordPress timesheet submission form with dark mode
 * Version: 1.0
 * Author: Your Name
 */

function timesheet_enqueue_scripts() {
    $plugin_url = plugin_dir_url(__FILE__);
    
    wp_enqueue_style('timesheet-styles', $plugin_url . 'assets/timesheet-app.css', array(), '1.0');
    wp_enqueue_script('timesheet-app', $plugin_url . 'assets/timesheet-app.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'timesheet_enqueue_scripts');

function timesheet_shortcode() {
    return '<div id="timesheet-root"></div>';
}
add_shortcode('timesheet_form', 'timesheet_shortcode');

// AJAX handler for form submission
function handle_timesheet_submission() {
    // Sanitize and validate the data
    $data = json_decode(stripslashes($_POST['data']), true);
    
    // Here you would typically process the data, save to database, etc.
    
    // For now, we'll just echo back the data
    wp_send_json_success($data);
    
    wp_die();
}
add_action('wp_ajax_submit_timesheet', 'handle_timesheet_submission');
add_action('wp_ajax_nopriv_submit_timesheet', 'handle_timesheet_submission');