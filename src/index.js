import './index.less'

$.fn.extend({
	animateCss: function (animationName, cb) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		this.addClass('animated ' + animationName).one(animationEnd, function () {
			$(this).removeClass('animated ' + animationName);
			cb && cb.call(this)
		});
	}
});
