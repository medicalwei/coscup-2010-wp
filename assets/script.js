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
function updateMicroBlog($) {
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

function updateBlog($) {
	$.jGFeed(
		'http://feeds.feedburner.com/coscup', //?' + parseInt((new Date()).getTime()/30*60*1000), // Don't use this hack coz we need scoring=h
		function (feed) {
			if (!feed) {
				//Failed
				$('#blog-block .noscript-hide').hide();
				return;
			}
			var $b = $('#blog-block').empty();
			var i = 0;
			var appendArticle = function () {
				if (i >= feed.entries.length) return;
				var v = feed.entries[i];
				i++;

				//remove bad content in feed
				if (v.link === 'http://feedproxy.google.com/~r/coscup/~3/KURdOLzQwtc/pingooo-coscup-20108-fred-2009-orz.html') {
					setTimeout(appendArticle, 0);
					return;
				}

				var pd = new Date(v.publishedDate);
				
				var $e = $(document.createElement('div'));
				$e.attr('id', 'blog-article').html(
					'<h2><a target="_blank" href="' + v.link + '">' + v.title + '</a></h2>'
					+ '<p clss="blog-date">' + (
						(pd.getMonth()+1) + '/' 
						+ pd.getDate() + ' ' 
						+ pd.getHours() 
						+ ':' + ((pd.getMinutes() < 10)?'0':'') + pd.getMinutes()
					) + '</p>'
					+ '<div class="blog-content">'
					+ v.content
					.replace(/(style|cellpadding|border)="([^"])+"/g, '') // remove all inline style
					.replace(/<font[^>]*>(.+?)<\/font>/g, '$1') // remove <font>
					.replace(/<center[^>]*>(.+?)<\/center>/g, '$1') // remove <center>
					.replace(/<(\/?)h3>/g, '<$1h4>')
					.replace(/<(\/?)h2>/g, '<$1h3>') // downgrade titles
					.replace(/<br ?\/?>[\n \t\r]*(<br ?\/?>[\n \t\r]*)+/g, '<br>') // too much <br>
					.replace(/<\/(p|div|span|a)>[\n \t\r]*(<br ?\/?>[\n \t\r]*)+/g, '</$1>') // still too much <br>
					//.replace(/<br ?\/?>\n?/g, '') //remove all <br>
					+ '</div>'
				);
				$b.append($e);

				setTimeout(appendArticle, 50);
			}
			setTimeout(appendArticle, 0);
		},
		8 // 100 max
	);
}

jQuery(function($){
	
	if ($('#micro-blog-msg').length) updateMicroBlog($);
	
	if ($('#blog-block').length) updateBlog($);
	
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