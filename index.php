<?php

//header('Content-Type: text/plain');

if (is_front_page()) {
	header('Location: ' . get_bloginfo('url') . '/zh-tw');
	exit();
}

if (is_404()) {
	header("HTTP/1.1 404 Not Found");
	header('Content-Type: text/plain');
	print '404 Not Found';
	exit;
}

// This theme only supports single pages
if (!is_page()) {
	header("HTTP/1.1 400 Bad Request");
	header('Content-Type: text/plain');
	print '400 Bad Request';
	exit;
}

// determine $locale and $lang
$ancestors = array_reverse(get_post_ancestors($post));
if (!count($ancestors)) {
	$home_id = $post->ID;
} else {
	$home_id = $ancestors[0];
}

$lang = get_post($home_id)->post_name;
if ($lang !== 'zh-tw' && strlen($lang) === 2) {
	$locale = $lang;
	//Ask WP to reload locale settings
	load_default_textdomain();
}

get_header();
?>
<div class="section container_12">
	<div class="article grid_9">
		<!--<h2 class="page_item"><a href="<?php the_permalink(); ?>"><?php the_title() ?></a></h2>-->
		<div class="section">
<?php
the_post();
the_content();
?>
&nbsp;
		</div>
	</div>
<?php
	get_sidebar();
?>
</div>
<?php
get_footer();
?>