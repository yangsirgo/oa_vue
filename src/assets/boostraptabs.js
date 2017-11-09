/*
* @Author: Xcar
* @Date:   2016-12-15 11:35:17
* @Last Modified by:   Xcar
* @Last Modified time: 2016-12-15 14:55:39
*/
  define(function(require,exports){
  var jQuery=require('jquery');
  var $ = jQuery
    var Addtabs = {
        options: {},
        add: function(opts){
            var id = 'tab_' + opts.id;
            $('li[role = "presentation"].active').removeClass('active');
            $('div[role = "tabpanel"].active').removeClass('active');
             //如果TAB不存在，创建一个新的TAB
                //创建新TAB的title
                var title = $('<li>', {
                    'role': 'presentation',
                    'id': 'tab_' + id,
                    'aria-url': opts.url,
                    'draggable': true
                }).append(
                    $('<a>', {
                        'href': '#' + id,
                        'aria-controls': id,
                        'role': 'tab',
                        'data-toggle': 'tab'
                    }).html(opts.title)
                );
                //是否允许关闭
            if (Addtabs.options.close) {
                title.append(
                    $('<i>', {'class': 'close-tab glyphicon glyphicon-remove'})
                );
            }
            //创建新TAB的内容
            var content = $('<div>', {
                'class': 'tab-pane',
                'id': id,
                'role': 'tabpanel'
            });
            $('.nav-tabs').append(title);
            $(".tab-content").append(content);

            content.append(opts.content);
                    //激活TAB
            $('#tab_' + id).addClass('active');
            $('#' + id).addClass('active');
            Addtabs.drop(opts.object);
        },
        close: function (id,obj) {
            //如果关闭的是当前激活的TAB，激活他的前一个TAB
            if (obj.find("li.active").attr('id') === "tab_" + id) {
                $("#tab_" + id).prev().addClass('active');
                $("#" + id).prev().addClass('active');
            }
            //关闭TAB
            $("#tab_" + id).remove();
            $("#" + id).remove();
            Addtabs.drop(obj);
            Addtabs.options.callback();
        },
        drop: function (obj) {
            element = obj.find('.nav-tabs');
            //创建下拉标签
            var dropdown = $('<li>', {
                'class': 'dropdown pull-right hide tabdrop tab-drop'
            }).append(
                $('<a>', {
                    'class': 'dropdown-toggle',
                    'data-toggle': 'dropdown',
                    'href': '#'
                }).append(
                    $('<i>', {'class': "glyphicon glyphicon-align-justify"})
                ).append(
                    $('<b>', {'class': 'caret'})
                )
            ).append(
                $('<ul>', {'class': "dropdown-menu"})
            )

            //检测是否已增加
            if (!$('.tabdrop').html()) {
                dropdown.prependTo(element);
            } else {
                dropdown = element.find('.tabdrop');
            }
            //检测是否有下拉样式
            if (element.parent().is('.tabs-below')) {
                dropdown.addClass('dropup');
            }
            var collection = 0;

            //检查超过一行的标签页
            element.append(dropdown.find('li'))
                .find('>li')
                .not('.tabdrop')
                .each(function () {
                    if (this.offsetTop > 5 || element.width() - $(this).position().left - $(this).width() < 83) {
                        dropdown.find('ul').prepend($(this));
                        collection++;
                    }
                });

            //如果有超出的，显示下拉标签
            if (collection > 0) {
                dropdown.removeClass('hide');
                if (dropdown.find('.active').length == 1) {
                    dropdown.addClass('active');
                } else {
                    dropdown.removeClass('active');
                }
            } else {
                dropdown.addClass('hide');
            }
        }
    }


    Addtabs.options = $.extend({
        content: '', //直接指定所有页面TABS内容
        close: true, //是否可以关闭
        monitor: 'body', //监视的区域
        iframeUse: true, //使用iframe还是ajax
        iframeHeight: $(document).height() - 107, //固定TAB中IFRAME高度,根据需要自己修改
        method: 'init',
        contextmenu: true,//是否使用右键菜单
        callback: function () { //关闭后回调函数
        }
    });
    exports.Addtabs = Addtabs;
});
