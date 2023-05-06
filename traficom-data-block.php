<?php
/**
 * Plugin Name:       Traficom Data Block
 * Description:       Lohko hakemaan katsastusdataa Traficomin APIsta.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Roosa Virta
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       traficom-block
 * Domain Path: 	  /languages
 */

require 'traficom-api.php';

/**
 * Register the Traficom block.
 *
 * @return void
 */
function traficom_block_register_block(): void
{
	// Register block scripts and styles.
	wp_register_script(
		'traficom-block-js',
		plugins_url('build/index.js', __FILE__),
		array('wp-blocks', 'wp-i18n', 'wp-api-fetch', 'jquery', 'select2-js')
	);

	wp_register_style(
		'traficom-block-editor',
		plugins_url('build/index.css', __FILE__)
	);

	wp_register_style(
		'traficom-block-css',
		plugins_url('build/style-index.css', __FILE__)
	);

	// Register external dependencies.
	wp_register_style('select2-css', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css', array(), '4.1.0-rc.0');
	wp_register_script('select2-js', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js', array('jquery'), '4.1.0-rc.0');

	wp_register_script('datatables-js', 'https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js', array('jquery'), '1.11.3', true);
	wp_register_style('datatables-css', 'https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css', array(), '1.11.3');

	// Register the block type.
	register_block_type('traficom-block/traficom-data', array(
		'editor_style' => 'traficom-block-editor',
		'style' => 'traficom-block-css',
		'editor_script' => 'traficom-block-js',
		'textdomain' => 'traficom-block',
	));
}

add_action('init', 'traficom_block_register_block');

/**
 * Enqueue Traficom block assets.
 *
 * @return void
 */
function traficom_block_enqueue_assets(): void
{

	wp_enqueue_script('jquery');

	wp_enqueue_script('traficom-block-js');
	wp_enqueue_style('traficom-block-css');

	wp_enqueue_script('select2-js');
	wp_enqueue_style('select2-css');
	wp_enqueue_script('datatables-js');
	wp_enqueue_style('datatables-css');
}

add_action('wp_enqueue_scripts', 'traficom_block_enqueue_assets');
