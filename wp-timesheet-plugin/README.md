# Timesheet Submission Form WordPress Plugin

This plugin embeds a React-based Timesheet Submission Form into a WordPress page.

## Installation

1. Upload the `wp-timesheet-plugin` folder to the `/wp-content/plugins/` directory of your WordPress installation.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Use the shortcode `[timesheet_form]` in any page or post where you want to display the form.

## Usage

After activation, you can embed the Timesheet Submission Form on any page or post using the shortcode:

```
[timesheet_form]
```

## Updating the React App

To update the React app:

1. Make your changes in the React project.
2. Run `npm run build` in the React project directory.
3. Copy the new files from the `dist` directory into the `wp-timesheet-plugin/assets` directory.
4. If you've made changes to the main JavaScript or CSS file names, update the `wp-timesheet-plugin.php` file accordingly.

## Troubleshooting

If you encounter any issues, check the browser console for errors and ensure all paths in the `wp-timesheet-plugin.php` file are correct.