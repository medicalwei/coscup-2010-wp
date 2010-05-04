/* Google Analytics */

var _gaq = _gaq || [];
_gaq.push(
 //['_setAccount', 'UA-12923351-1'], // Disable on test site.
 ['_trackPageview']
);


/*
 * jGFeed 1.0 - Google Feed API abstraction plugin for jQuery
 *
 * Copyright (c) 2009 jQuery HowTo
 *
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 * URL:
 *   http://jquery-howto.blogspot.com
 *
 * Author URL:
 *   http://me.boo.uz
 *
 */
(function($){$.extend({jGFeed:function(url,fnk,num,key){if(url==null){return false;}var gurl="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&scoring=h&q="+url;if(num!=null){gurl+="&num="+num;}if(key!=null){gurl+="&key="+key;}$.getJSON(gurl,function(data){if(typeof fnk=="function"){ if (data.responseData)fnk.call(this,data.responseData.feed);else fnk.call(this,false);}else{return false;}});}});})(jQuery);

/*
 * update #micro-blog blocks
 */
function updateFeed($) {
	$.jGFeed(
		'http://www.plurk.com/coscup.xml', //?' + parseInt((new Date()).getTime()/30*60*1000), // Don't use this hack coz we need scoring=h
		function (feed) {
			if (!feed) {
				//Failed
				$('#micro-blog-msg, #micro-blog-time').hide();
				return;
			}
			$('#micro-blog-msg').html(feed.entries[0].content);
			var pd = new Date(feed.entries[0].publishedDate);
			$('#micro-blog-time').text(
				(pd.getMonth()+1) + '/' 
				+ pd.getDate() + ' ' 
				+ pd.getHours() 
				+ ':' + pd.getMinutes()
			);
		},
		1 // 100 max, we only need one.
	);
}

jQuery(function($){
	if ($('#micro-blog-msg').length) updateFeed($);
	
	// Link tracking
	$('.blogroll a, .sponsor').live(
		'click',
		function () {
			_gaq.push(['_trackPageview', this.href.replace(/http:\/\/(.+)\/?$/, '/adv/2010/$1')]);
			return true;
		}
	);
	
	//hover texts
	$('.hover-msg li').each(
		function () {
			var id = $(this).attr('rel');
			$item = $('.main-menu .page-item-' + id);
			$(this).css('left', $item.offset().left + 'px')
			$item
			/* .addClass('not-ready') */
			.attr('title', '')
			.mouseenter(
				function () {
					$('.hover-msg .page-item-' + id).fadeIn(100);
				}
			).mouseleave(
				function () {
					$('.hover-msg .page-item-' + id).fadeOut(100);
				}
			);
		}
	);
	
});