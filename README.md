# Traficom Block
- Contributors: Roosa Virta
- Tags: plugin, WordPress, api, traficom
- Tested up to: 6.1
- Stable tag: 1.0.0
- License: GPL-2.0-or-later
- License URI: https://www.gnu.org/licenses/gpl-2.0.html

The Traficom Block is a WordPress plugin that allows users to display car inspection data based on the year and car
model. It fetches data from the Traficom API and displays the data in a responsive DataTable.

## Features

- Creates a Traficom Data Block which displays inspection data based on the selected year and car model(s)
- Fetches data from the Traficom API and displays it in a responsive DataTable
- Provides dropdowns for selecting a specific inspection year and one or more car models
- Automatically updates the table when the year or car model selection is changed

- Creates WP REST API endpoints:
	- `/wp-json/traficom-api/v1/disqualified-cars/` for fetching disqualified cars data based on the given year and car model(s)
	- `/wp-json/traficom-api/v1/dropdown-values/` for fetching the values for the year and car model dropdowns

## Requirements

- WordPress 5.8 or later
- PHP 7.0 or later

## Installation

1. Download the plugin's zip file.
2. In your WordPress admin area, navigate to `Plugins` > `Add New`.
3. Click the `Upload Plugin` button at the top of the page.
4. Click `Choose File` and select the downloaded zip file.
5. Click `Install Now` and wait for the plugin to be installed.
6. After the installation is complete, click `Activate Plugin`.

## Usage

After activating the plugin, you can use the Traficom Data block in the Gutenberg editor. Add the block to your desired location on a post or page. The block will display a table with katsastus data based on the selected year and car model(s).
## Changelog

### 0.1.0
- Initial release

## License

Tavuttaja is licensed under the GPLv2 or later. See [LICENCE](http://www.gnu.org/licenses/gpl-2.0.html) for more information.

## Credits

This plugin was created by Roosa Virta.
