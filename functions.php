<?php 

/* The following breaks backend editor.
wp_deregister_script('jquery');
wp_register_script(
	'jquery',
    'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js'
);
*/
wp_enqueue_script('jquery');

/* Warning: DO NOT CHANGE THE ORDER OF THESE FUNCTION */

register_sidebar(array(
	'name' => 'Time and Place zh-tw',
	'before_widget' => '',
	'after_widget' => '',
	'before_title' => '',
	'after_title' => '',
));

register_sidebar(array(
	'name' => 'Time and Place en',
	'before_widget' => '',
	'after_widget' => '',
	'before_title' => '',
	'after_title' => '',
));

register_sidebar(array(
	'name' => 'Chronicle zh-tw',
	'before_widget' => '',
	'after_widget' => '',
	'before_title' => '',
	'after_title' => '',
));

register_sidebar(array(
	'name' => 'Chronicle en',
	'before_widget' => '',
	'after_widget' => '',
	'before_title' => '',
	'after_title' => '',
));

register_sidebar(array(
	'name' => 'Aside zh-tw',
	'before_widget' => '<div id="%1$s" class="widget">',
	'after_widget' => '</div>',
	'before_title' => '<h3>',
	'after_title' => '</h3>',
));

register_sidebar(array(
	'name' => 'Aside en',
	'before_widget' => '<div id="%1$s" class="widget">',
	'after_widget' => '</div>',
	'before_title' => '<h3>',
	'after_title' => '</h3>',
));
