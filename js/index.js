$(function () {
    var url = 'http://192.168.70.88:9900/api/';
    // 购物车出现 隐藏
    $('.shop_car').on({
        'mouseenter': function () {
            $('.car_home').stop().slideDown();
        },
        'mouseleave': function () {
            $('.car_home').stop().slideUp();
        }
    })

    // Aajx获导行项
    $.ajax({
        url: url + 'nav',
        success: function (data) {
            var dataArr = JSON.parse(data);
            var html = '';
            for (var i = 0; i < dataArr.length; i++) {
                var liData = dataArr[i];
                // console.log(liData.name);
                html += '<li type="' + liData.type + '">';
                html += '<a href="' + liData.sourceUrl + '">' + liData.name + '</a>';
                html += '</li>';
                $('.nav_list').html(html);
            }

        }
    })
    //右侧搜索框聚焦
    $('.head_search input').on({
        'focus': function () {
            $('.head_search').css('border', '1px solid #ff6670');
            $('.head_search label').css('borderLeft', '1px solid #ff6670');
            $('.search_result').slideDown();
            // $('.head_search').css('border', '1px solid #ff670');
            $('.sample_goods').hide();
        },
        'blur': function () {
            $('.search_result').slideUp();
            $('.head_search input').val('');
            $('.sample_goods').show();
            $('.head_search').css('border', '1px solid #e0e0e0');
            $('.head_search label').css('borderLeft', '1px solid #e0e0e0');
        }
    })
    $('.search_result').on('click', 'li', function () {
        var searchSome = ($(this).find('.item_name').html());
        $('.head_search input').val(searchSome);
        $('.sample_goods').hide();
    })
    //主导航栏详细商品下滑
    $('.header_nav').on('mouseover', '.nav_list>li', function () {
        var typeValue = $(this).attr('type');
        // console.log(typeValue);
        $.ajax({
            url: url + 'nav',
            data: {
                type: typeValue
            },
            success: function (data) {
                // console.log(data);
                var menuArr = JSON.parse(data);
                // console.log(menuArr);

                var html = '';
                var flag = true;
                for (var i = 0; i < menuArr.length; i++) {
                    // console.log(menuArr[i]);
                    var liData = menuArr[i];
                    // console.log(liData);
                    if (!liData.price) {
                        flag = false;
                        $('.top_menu').slideUp();
                        break;
                    }
                    html += '<li>';
                    html += '<a href="' + liData.sourcePath + '"><img src="' + liData.imgUrl + '"></a>';
                    html += '<div class="name">' + liData.name + '</div>';
                    html += '<div class="price">' + liData.price + '</div>';
                    html += '</li>';
                    $('.menu').html(html);
                }
                if (flag) $('.top_menu').slideDown();
            }
        })

    })
    $('.header_nav').on('mouseleave', function () {
        $('.top_menu').slideUp();
    })
    // 轮播图区域
    $.ajax({
        url: url + 'lunbo',
        dataType: "json",
        success: function (data) {
            // console.log(JSON.parse(data));
            // var itemDom = data;
            // console.log(data);
            $('#Carousel .carousel-inner a').each(function (index, ele) {
                $(ele).attr('href', data[index].sourceUrl);
                $(ele).find('img').attr('src', data[index].imgUrl);
            })
        }
    })
    // ajax获取轮播图侧边栏导航数据
    $.ajax({
        url: url + 'items',
        success: function (data) {
            // console.log(data);
            var itemsDom = JSON.parse(data);
            var html = '';
            for (var i = 0; i < itemsDom.length; i++) {
                var itemsLi = itemsDom[i];
                // console.log(itemsLi);
                html += '<li type="' + itemsLi.type + '">' + itemsLi.content + '<span>&gt;</span></li>';
                $('.side-left').html(html);
            }
        }
    })
    // 鼠标移入左侧边栏弹出右拉框列表
    $('.top-side-left').on('mouseenter', '.side-left li', function () {
        var typeValue = $(this).attr('type');
        // console.log(typeValue);
        $.ajax({
            url: url + 'items',
            data: {
                type: typeValue
            },
            success: function (data) {
                // console.log(data);
                var categoryArr = JSON.parse(data);
                // console.log(categoryArr.length);
                if (categoryArr.length > 12) {
                    $('.site-category-detail').css('width', '800px');
                    var html = '<ul class="category-items">';
                    for (var i = 0; i < 6; i++) {
                        var categoryLi = categoryArr[i];
                        // console.log(liData);
                        html += '<li class="category-goods">';
                        html += '<a class="goods-link" href="' + categoryLi.sourceUrl + '">';
                        html += '<img alt="" src="' + categoryLi.imgUrl + '">';
                        html += '<span class="text-name">' + categoryLi.name + '</span></a>';
                        html += '<a class="goods-buy-link" href="//item.mi.com/buymibook/air"> 选购 </a></li>';
                        html += '</li>';
                    }
                    html += '</ul><ul class="category-items">';
                    for (var i = 6; i < 12; i++) {
                        var categoryLi = categoryArr[i];
                        // console.log(liData);
                        html += '<li class="category-goods">';
                        html += '<a class="goods-link" href="' + categoryLi.sourceUrl + '">';
                        html += '<img alt="" src="' + categoryLi.imgUrl + '">';
                        html += '<span class="text-name">' + categoryLi.name + '</span></a>';
                        html += '<a class="goods-buy-link" href="//item.mi.com/buymibook/air"> 选购 </a></li>';
                        html += '</li>';
                    }
                    html += '</ul><ul class="category-items">';
                    for (var i = 12; i < categoryArr.length; i++) {
                        var categoryLi = categoryArr[i];
                        // console.log(liData);
                        html += '<li class="category-goods">';
                        html += '<a class="goods-link" href="' + categoryLi.sourceUrl + '">';
                        html += '<img alt="" src="' + categoryLi.imgUrl + '">';
                        html += '<span class="text-name">' + categoryLi.name + '</span></a>';
                        html += '<a class="goods-buy-link" href="//item.mi.com/buymibook/air"> 选购 </a></li>';
                        html += '</li>';
                    }
                    html += '</ul>';
                    $('.site-category-detail').html(html);
                } else if (categoryArr.length > 6) {
                    $('.site-category-detail').css('width', '550px');
                    var html = '<ul class="category-items">';
                    for (var i = 0; i < 6; i++) {
                        var categoryLi = categoryArr[i];
                        // console.log(liData);
                        html += '<li class="category-goods">';
                        html += '<a class="goods-link" href="' + categoryLi.sourceUrl + '">';
                        html += '<img alt="" src="' + categoryLi.imgUrl + '">';
                        html += '<span class="text-name">' + categoryLi.name + '</span></a>';
                        html += '<a class="goods-buy-link" href="//item.mi.com/buymibook/air"> 选购 </a></li>';
                        html += '</li>';
                    }
                    html += '</ul><ul class="category-items">';
                    for (var i = 6; i < categoryArr.length; i++) {
                        var categoryLi = categoryArr[i];
                        // console.log(liData);
                        html += '<li class="category-goods">';
                        html += '<a class="goods-link" href="' + categoryLi.sourceUrl + '">';
                        html += '<img alt="" src="' + categoryLi.imgUrl + '">';
                        html += '<span class="text-name">' + categoryLi.name + '</span></a>';
                        html += '<a class="goods-buy-link" href="//item.mi.com/buymibook/air"> 选购 </a></li>';
                        html += '</li>';
                    }
                    html += '</ul>';
                    $('.site-category-detail').html(html);
                } else {
                    $('.site-category-detail').css('width', '265px');
                    var html = '<ul class="category-items">';
                    for (var i = 0; i < categoryArr.length; i++) {
                        var categoryLi = categoryArr[i];
                        // console.log(liData);
                        html += '<li class="category-goods">';
                        html += '<a class="goods-link" href="' + categoryLi.sourceUrl + '">';
                        html += '<img alt="" src="' + categoryLi.imgUrl + '">';
                        html += '<span class="text-name">' + categoryLi.name + '</span></a>';
                        html += '<a class="goods-buy-link" href="//item.mi.com/buymibook/air"> 选购 </a></li>';
                        html += '</li>';
                    }
                    html += '</ul>';
                    $('.site-category-detail').html(html);
                }
            }
        })


        $('.site-category-detail').fadeIn(500);
    })
    $('.site-category').on('mouseleave', function () {
        $('.site-category-detail').fadeOut(500);
    })

    // 智能硬件主体ajax获取数据
    $.ajax({
        dataType: 'json',
        url: url + 'hardware',
        success: function (data) {
            $('.intelligent_list').html(template('template_show', data));
            // console.log(data);
        }
    })
    //搭配区域
    $.ajax({
        url: url + 'product',
        dataType: 'json',
        data: {
            toptitle: 'match'
        },
        success: function (data) {
            // console.log(data);
            $('.collocation_container').html(template('template_collocation', data));
            $('.collocation_top h3').html(data.topTitleName);
            $('.collocation_sub li').first().addClass('active');
            $('.collocation_list').on('mouseover', 'li', function () {
                if ($(this).find('.review-content').html() == '') {
                    $(this).find('.review').remove();
                }
            })
            $('.collocation_sub').on('mouseover', 'li', function () {
                $(this).addClass('active').siblings().removeClass('active');
                $.ajax({
                    url: url + 'product',
                    dataType: 'json',
                    data: {
                        key: $(this).attr('key')
                    },
                    success: function (data) {
                        // console.log(data);
                        $('.collocation_list').html(template('template_subs', data));

                    }
                })
            })
        }
    })

    //配件区域
    $.ajax({
        url: url + 'product',
        dataType: 'json',
        data: {
            toptitle: 'accessories'
        },
        success: function (data) {
            // console.log(data);
            $('.parts_container').html(template('template_parts', data));
            $('.parts_top h3').html(data.topTitleName);
            $('.parts_sub li').first().addClass('active');
            $('.parts_list').on('mouseover', 'li', function () {
                if ($(this).find('.review-content').html() == '') {
                    $(this).find('.review').remove();
                }
            })
            $('.parts_sub').on('mouseover', 'li', function () {
                $(this).addClass('active').siblings().removeClass('active');
                $.ajax({
                    url: url + 'product',
                    dataType: 'json',
                    data: {
                        key: $(this).attr('key')
                    },
                    success: function (data) {
                        // console.log(data);
                        $('.parts_list').html(template('template_subs', data));

                    }
                })
            })
        }
    })

    //周边区域
    $.ajax({
        url: url + 'product',
        dataType: 'json',
        data: {
            toptitle: 'around'
        },
        success: function (data) {
            // console.log(data);
            $('.around_container').html(template('template_around', data));
            $('.around_top h3').html(data.topTitleName);
            $('.around_sub li').first().addClass('active');
            $('.around_sub').on('mouseover', 'li', function () {
                $(this).addClass('active').siblings().removeClass('active');
                $.ajax({
                    url: url + 'product',
                    dataType: 'json',
                    data: {
                        key: $(this).attr('key')
                    },
                    success: function (data) {
                        // console.log(data);
                        $('.around_list').html(template('template_subs', data));
                    }
                })
            })
        }
    })

    //为你推荐区域
    var current_page = 1;

    function getAjax() {
        $.ajax({
            url: url + 'recommend',
            dataType: 'json',
            data: {
                page: current_page
            },
            success: function (data) {
                // console.log(data);
                $('.info_list').append(template('template_info', data));
            }
        })
    }

    getAjax();
    $('.info_top .button .next').on('click', function () {
        if (current_page == 4) {
            $(this).css('color', '#ddd');
            alert('不好意思,这是最后一页哦!');
            return;
        } else {
            $(this).css('color', '#777');
            current_page++;
            console.log(current_page);
            getAjax();
            $('.info_list').animate({
                left: '-1226px'
            })
        }
    })
    $('.info_top .button .prev').on('click', function () {
        if (current_page == 1) {
            $(this).css('color', '#ddd');
            alert('不好意思,这是第一页哦!');
            return;
        } else {
            $(this).css('color', '#777');
            current_page--;
            console.log(current_page);
            getAjax();
            $('.info_list').animate({
                left: '+0px'
            })
        }
    })
    // console.log(current_page);

    //热门产品区域
    $.ajax({
        url: url + 'hotcomment',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            $('.hot_list').html(template('template_hot', data));
        }
    })

    //内容区域
    $.ajax({
        url: url + 'content',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            // console.log(template('content_template', data));
            $('.body_content>ul').html(template('content_template', data));
            //内容区域轮播图

            var mySwiper = new Swiper('.swiper-container', {
                // direction: 'vertical',
                // loop: true,
                // 如果需要分页器
                pagination: '.swiper-pagination',

                // 如果需要前进后退按钮
                // 如果需要前进后退按钮
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',

            });
        }
    })

    //视频区域
    $.ajax({
        url: url + 'video',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            $('.videos_list').html(template('video_template', data));
            $('.videos_list>li>a>i').click(function () {
                $('video').slideDown();
                $('.mask').fadeIn();
            })
        }
    })
    $('.mask').click(function () {
        $('video').slideUp();
        $('.mask').fadeOut();
    })
})