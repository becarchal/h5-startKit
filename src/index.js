import './index.less'

$.fn.extend({
	animateCss: function (animationName, cb) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

		return new Promise((resolve, reject) => {
			this.addClass('animated ' + animationName).one(animationEnd, function () {
				$(this).removeClass('animated ' + animationName);
				cb && cb.call(this)
				resolve(this)
			})
		}).catch(err => alert(err))
	}
});


/**
 * 物料初始化
 */

const duration = 750

const sceneIndexMap = {
	home: 0,
	three_scene: 1,
	three_ctr: 2,
	seven_scene: 3,
	seven_ctr: 4,
	seventeen_scene: 5,
	seventeen_ctr: 6,
	last: 7
}

const swiper = new Swiper('.swiper-container', {
	direction: 'vertical',
	noSwiping: true,
	onSlideChangeEnd(swiper) {
		switch (swiper.activeIndex) {
			case 1:
				$('#three_text').show().animateCss('fadeInDown')
				break;
			case 2:
				$('#three_a_text').show().animateCss('fadeInDown')
				$('#three_b_text').show().animateCss('fadeInDown')
				break;
			case 3:
				$('#seven_text').show().animateCss('fadeInDown')
				break;
			case 4:
				$('#seven_a_text').show().animateCss('fadeInDown')
				$('#seven_b_text').show().animateCss('fadeInDown')
				break;
			case 5:
				$('#seventeen_text').show().animateCss('fadeInDown')
				break;
			case 6:
				$('#seventeen_a_text').show().animateCss('fadeInDown')
				$('#seventeen_b_text').show().animateCss('fadeInDown')
				break;
			case 7:
				$('#last_text').show().animateCss('fadeIn').then(_this => {
					setTimeout(() => {
						Promise.all([
							new Promise((re, rj) => {
								$('#last_sofa').animateCss('fadeOutLeft').then(_this => $(_this).hide()).then(() => re())
							}),
							new Promise((re, rj) => {
								$('#last_father').animateCss('fadeOutRight').then(_this => $(_this).hide()).then(() => re())
							}),
							new Promise((re, rj) => {
								$(_this).animateCss('fadeOutLeft').then(_this => $(_this).hide()).then(() => re())

							})
						]).then(e => {
							$('#last_1_text').show().animateCss('fadeIn').then(_this => {
								setTimeout(() => {
									$(_this).animateCss('fadeOut').then(_this => {
										$(_this).hide()
										$('#last_2_text').show().animateCss('fadeInDown')
										$('#last_3_text').show().animateCss('fadeInUp')
										setTimeout(() => {
											$('.logo').animate({
												opacity: '0.5'
											})
											$('#last_cover').show().animate({
												opacity: '0.5'
											})
											$('#last_4_text').show().animateCss('fadeIn')
										}, 2000)
									})
								}, 2000)
							})
						})
					}, 2000)
				})
				break;

		}
	}
})

/**
 * 事件绑定
 */
$(document).ready(function () {
	swiper.slideTo(7)
	$('#home_text').show().animateCss('fadeInDown')
})

$('#home_btn').click(function () {
	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['three_scene'], duration)
	})
})

$('#three_btn_a').click(function () {
	$('#three_a').show()

	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['three_ctr'], duration)
	})
})

$('#three_btn_b').click(function () {
	$('#three_b').show()

	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['three_ctr'], duration)
	})
})

$('.to-seven-btn').click(function () {
	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['seven_scene'], duration)
	})
})

$('#seven_ctr_btn_a').click(function () {
	$('#seven_a').show()

	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['seven_ctr'], duration)
	})
})

$('#seven_ctr_btn_b').click(function () {
	$('#seven_b').show()

	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['seven_ctr'], duration)
	})
})

$('.to-seventeen-btn').click(function () {

	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['seventeen_scene'], duration)
	})
})

$('#seventeen_zl_btn_a').click(function () {
	$('#seventeen_a').show()

	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['seventeen_ctr'], duration)
	})
})

$('#seventeen_zl_btn_b').click(function () {
	$('#seventeen_b').show()

	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['seventeen_ctr'], duration)
	})
})

$('.to-last-btn').click(function () {
	$(this).animateCss('tada', function () {
		swiper.slideTo(sceneIndexMap['last'], duration)
	})
})

