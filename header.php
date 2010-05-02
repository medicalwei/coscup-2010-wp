<?php
global $home_id, $lang;
//$langtag = substr($locale, 0, 2) . ((strlen($locale) > 2)?'-':'') . strtolower(substr($locale, 3,2));

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head>
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<link rel="shortcut icon" href="<?php bloginfo('url'); ?>/favicon.ico" type="image/x-icon" />
<title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
<!-- //Fragment updating not available yet
<script type="text/javascript">
if (window.location.hash.substr(0,2) === '#!') {
window.location.replace('http://' + window.location.hostname + '/' + window.location.hash.substr(2));
}
</script>
-->
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />

<?php wp_head(); ?>
<noscript>
<style type="text/css">
.noscript-hide {
	display: none;
}
</style>
</noscript>
</head>
<body class="<?php print $lang; ?>">
<div class="header container_12">
	<div class="nav">
		<ul class="main-menu grid_10">
<!-- wp_list_pages -->
<?php /* Navigation */
wp_list_pages('title_li=&depth=1&sort_column=menu_order&child_of=' . $home_id);
?>
		</ul>
		<ul class="lang-menu grid_2">
			<li class="zh-tw first"><a href="<?php bloginfo('url'); ?>/zh-tw">中文</a></li>
			<li class="en last"><a href="<?php bloginfo('url'); ?>/en">English</a></li>
		</ul>
		<ul class="hover-msg grid_12">
<?php
$hover_posts = get_pages('post_type=page&depth=1&meta_key=hover_msg&child_of=' . $home_id);
foreach ($hover_posts as &$hover_post) {
?>
			<li class="page-item-<?php print $hover_post->ID ?>" rel="<?php print $hover_post->ID ?>"><?php print htmlspecialchars(get_post_meta($hover_post->ID, 'hover_msg', true)); ?></li>
<?php
}
?>
		</ul>
	</div>
	<div class="title grid_8">
		<h1><a href="<?php bloginfo('url'); print '/' . $lang ?>"><?php bloginfo('name'); ?></a></h1>
		<p id="tagline"><?php bloginfo('description'); ?></p>
	</div>
	<div class="time-n-place grid_4">

<?php
dynamic_sidebar('Time and Place ' . $lang);
/*
<p class="time">8/14 – 8/15, 2010</p>
<p class="place">中央研究院人文社會科學館 國際會議廳</p>
*/
?>

	</div>
</div>
<div class="clear"></div>
