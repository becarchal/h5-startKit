import './index.less'

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
                tar.hitTag('enter-page2')
                break;
            case 2:
                $('#three_a_text').show().animateCss('fadeInDown')
                $('#three_b_text').show().animateCss('fadeInDown')
                $('#three_a_tada').animateCss('tada')
                tar.hitTag('enter-page3')
                break;
            case 3:
                $('#seven_text').show().animateCss('fadeInDown')
                tar.hitTag('enter-page4')
                break;
            case 4:
                $('#seven_a_text').show().animateCss('fadeInDown')
                $('#seven_b_text').show().animateCss('fadeInDown')
                tar.hitTag('enter-page5')
                break;
            case 5:
                $('#seventeen_text').show().animateCss('fadeInDown')
                tar.hitTag('enter-page6')
                break;
            case 6:
                $('#seventeen_a_text').show().animateCss('fadeInDown')
                $('#seventeen_b_text').show().animateCss('fadeInDown')
                tar.hitTag('enter-page7')
                break;
            case 7:
                $('#last_text').show().animateCss('fadeInLeft')
                $('#last_sofa').show().animateCss('fadeInLeft')
                $('#last_father').show().animateCss('fadeInRight')
                setTimeout(() => {
                    swiper.slideTo(8, duration)
                }, 3500)
                tar.hitTag('enter-page8')
                break;
            case 8:
                $('#last1_1_text').show().animateCss('fadeIn').then(_this => {
                    setTimeout(() => {
                        swiper.slideTo(9, duration)
                    }, 3500)
                })
                tar.hitTag('enter-page9')
                break;
            case 9:
                $('#last2_2_text').show().animateCss('fadeInDown')
                $('#last2_3_text').show().animateCss('fadeInUp')
                setTimeout(() => {
                    $('.logo').animate({
                        opacity: '0.2'
                    })
                    $('#last2_cover').show().animate({
                        opacity: '0.75'
                    })
                    $('#last2_5_text').show().animateCss('fadeIn')
                    $('#last2_4_text').show().animateCss('fadeIn')

                    setTimeout(() => {
                        $('.logo').animate({
                            opacity: '1'
                        })
                        $('#last2_cover').animate({
                            opacity: '0'
                        }).hide()
                        $('#last2_5_text').animateCss('fadeOut').then(_this => $(_this).hide())
                        $('#last2_4_text').animateCss('fadeOut').then(_this => $(_this).hide())
                    }, 3500)
                }, 3500)

                tar.hitTag('enter-page10')
                break;

        }
    }
})

/**
 * 事件绑定
 */
$(document).ready(function () {
    tar.hitTag('enter-page1')
    $('#home_body').animateCss('tada')
    $('#home_text').show().animateCss('fadeInDown')
})

$('#home_btn').click(function () {
    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['three_scene'], duration)
    })
})

$('#three_btn_a').click(function () {
    $('#three_a').show()

    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['three_ctr'], duration)
    })
})

$('#three_btn_b').click(function () {
    $('#three_b').show()

    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['three_ctr'], duration)
    })
})

$('.to-seven-btn').click(function () {
    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['seven_scene'], duration)
    })
})

$('#seven_ctr_btn_a').click(function () {
    $('#seven_a').show()

    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['seven_ctr'], duration)
    })
})

$('#seven_ctr_btn_b').click(function () {
    $('#seven_b').show()

    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['seven_ctr'], duration)
    })
})

$('.to-seventeen-btn').click(function () {

    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['seventeen_scene'], duration)
    })
})

$('#seventeen_zl_btn_a').click(function () {
    $('#seventeen_a').show()

    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['seventeen_ctr'], duration)
    })
})

$('#seventeen_zl_btn_b').click(function () {
    $('#seventeen_b').show()

    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['seventeen_ctr'], duration)
    })
})

$('.to-last-btn').click(function () {
    $(this).animateCss('pulse', function () {
        swiper.slideTo(sceneIndexMap['last'], duration)
    })
})