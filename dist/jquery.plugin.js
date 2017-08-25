$.fn.extend({
	animateCss: function (animationName, cb) {

		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

		return new Promise((resolve, reject) => {
			const page_touchstart = e => e.preventDefault()

			this[0].addEventListener('touchstart', page_touchstart, false)

			this.addClass('animated ' + animationName).one(animationEnd, () => {
				this[0].removeEventListener('touchstart', page_touchstart, false)

				$(this).removeClass('animated ' + animationName);
				cb && cb.call(this)
				resolve(this)
			})
		}).catch(err => alert(err))
	}
});