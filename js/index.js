$(function () {
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
        url: 'http://192.168.70.88:9900/api/nav',
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
            $('.search_result').slideDown();
            // $('.head_search').css('border', '1px solid #ff670');
            $('.sample_goods').hide();
        },
        'blur': function () {
            $('.search_result').slideUp();
            $('.head_search input').val('');
            $('.sample_goods').show();
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
            url: 'http://192.168.70.88:9900/api/nav',
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
        url: 'http://192.168.70.88:9900/api/lunbo',
        dataType: "json",
        success: function (data) {
            // console.log(JSON.parse(data));
            // var itemDom = data;
            console.log(data);
            $('#Carousel .carousel-inner a').each(function (index, ele) {
                $(ele).attr('href', data[index].sourceUrl);
                $(ele).find('img').attr('src', data[index].imgUrl);
            })
        }
    })
    // ajax获取轮播图侧边栏导航数据
    $.ajax({
        url: 'http://192.168.70.88:9900/api/items',
        success: function (data) {
            // console.log(data);
            var itemsDom = JSON.parse(data);
            var html = '';
            for (var i = 0; i < itemsDom.length; i++) {
                var itemsLi = itemsDom[i];
                // console.log(itemsLi);
                html += '<li type="' + itemsLi.type + '">' + itemsLi.content + '</li>';
                $('.side-left').html(html);
            }
        }
    })
    // 鼠标移入左侧边栏弹出右拉框列表
    $('.top-side-left').on('mouseenter', '.side-left li', function () {
        var typeValue = $(this).attr('type');
        // console.log(typeValue);
        $.ajax({
            url: 'http://192.168.70.88:9900/api/items',
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
})