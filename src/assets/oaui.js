/**
 * Created by ryf on 2016/8/4.
 */
/**
 * Created by chenshanlian on 2014/10/21.
 */
define(function(require,exports){
  var jQuery=require('jquery');
  var $ = jQuery
    var maskArr=[];
    //显示遮罩层
    var showMask = function(){
        var jsMsk = "js_msk"+new Date().valueOf();
        var domMsk = document.createElement('div');
        domMsk.style.zIndex=999+maskArr.length;
        domMsk.id = jsMsk;
        domMsk.className = 'ct-msk';
        maskArr.push(jsMsk);
        document.body.appendChild(domMsk);
    }
    var closeMask = function(){
        //var jsMsk = "js_msk";
        if(maskArr && maskArr.length > 0){
            var dom=document.getElementById(maskArr.splice(maskArr.length-1,1)[0]);
            dom&&(dom.style.display = 'none');
        }

    }
    /*
     *基本弹出层方法
     *参数格式为json
     * title 弹出层标题
     * cont 弹出层内容
     * btnDom 控制显示弹出层显示位置的 $对象按钮】
     * noMask 不现实弹出层 默认为false
     */
    var expendUI=function($id,opt){
        if($id.length>1){
            $id.each(function(i,item){
                expendUI($(item),opt);
            });
            return;
        }

        var opt= $.extend({
            max_height:116,
            height:116,
            bottom:10,
            right:5
        },opt);
        var _height=$id.height();
        if(_height>opt.height){
            $id.css('height',opt.max_height+'px');
            $id.append($('<span class="expend-content-line" style="display:block;bottom:'+opt.bottom+'px;right:'+opt.right+'px"><a class="expend-switch es-close" style="display: inline;"><span>展开</span><i></i></a></span>'))
                .on('click','.expend-switch',function(){
                    var _this=$(this);
                    if(_this.hasClass('es-close')){
                        $id.css('overflow','visible');
                        $id.animate({'height':_height+'px','padding-bottom':'20px'});
                        _this.removeClass('es-close').html('<span>收起</span><i></i>');
                    }else{
                        $id.css('overflow','hidden');
                        $id.animate({'height':opt.max_height+'px','padding-bottom':'0px'});
                        _this.addClass('es-close').html('<span>展开</span><i></i>');
                    }

                });
        }
    }
    exports.expendUI=expendUI;
    /*
     * 拖拽
     *
     * */
    var _drag=function(divDom,target,setting){
        setting =setting || {};
        $(divDom).on('mousedown',target,function (e) {
            disabledcheck();
            var _$parent = $(divDom);
            var _oldpageX = e.pageX;
            var _oldpageY = e.pageY;
            var _oldLeft = parseInt(_$parent.css("left"));
            var _oldTop = parseInt(_$parent.css("top"));
            Ileft = _oldLeft;
            Itop = _oldTop;
            $("body").attr("onselectstart", "return false").css("user-select", "none");
            $(document).mousemove(function (e) {
                Ileft = e.pageX - _oldpageX + _oldLeft;
                Itop = e.pageY - _oldpageY + _oldTop;
                var _imaxLeft = setting.imaxLeft || $(document).width() - _$parent.outerWidth();
                if(setting.imaxT || setting.imaxT==0){
                    if($.isNumeric(parseInt(setting.imaxT))){
                        var _imaxTop=parseInt(setting.imaxT);
                    }else if(setting.imaxT=='parent'){
                        var _imaxTop=_$parent.parent().height()-_$parent.height();
                    }else{
                        var _imaxTop=$(setting.imaxT).height()-_$parent.height();
                    }
                }
                if (Ileft <= 0) {
                    Ileft = 0;
                }
                if (Ileft >= _imaxLeft) {
                    Ileft = _imaxLeft;
                }
                if (Itop <= 0) {
                    Itop = 0;
                }
                if(setting.imaxT || _imaxTop==0){
                    if (Itop >= _imaxTop) {
                        Itop = _imaxTop;
                    }
                }
                _$parent.css({ top: Itop, left: Ileft });
                $(document).css("cursor", "move");
            });
            $(document).mouseup(function () {
                setting.upcbk && setting.upcbk();
                _$parent.css({ top: Itop, left: Ileft, "margin": 0 });
                $(document).css("cursor", "auto").unbind("mousemove").unbind("mouseup");
                huifucheck();
            });
        });
    }

    var showbox = function(json){
        var documenttitle=document.title;
        var titleStr = '';
        var isalert = '';
        if(json.title){
            titleStr = '<span class="ct-close">×</span><div class="ct-ly-h1">'+json.title+'</div>';
        }
        if(json.isalert){
            isalert = ' is-alert'
        }
        var divDom = document.createElement('div');
        var js_fj_id_index=$('#js_fj_id').css('z-index')||0;
        divDom.style.zIndex = json.zIndex || 1000+maskArr.length;
        divDom.style.zIndex=parseInt(js_fj_id_index)+parseInt(divDom.style.zIndex);
        divDom.id = new Date().valueOf(); //初始化弹出层的ID
        divDom.className = 'ct-ly' + isalert;
        divDom.innerHTML = titleStr + json.cont;
        document.body.appendChild(divDom);

        if(json.btnDom){
            json.noMask = true;
        }
        if(!json.noMask){
            showMask();
        }

        if(typeof json.success ==='function') {
            json.success();
        }
        if(typeof json.error === 'function') {
            json.error();
        }
        //关闭方法
        divDom.close = function(){
            //divDom.parentNode.removeChild(divDom);
            if(navigator.userAgent.indexOf("MSIE")>=0||navigator.userAgent.indexOf("Mozilla")>=0) {//判断当前浏览器是否为IE
                $(divDom).find("iframe").remove();//先移除iframe
            }
            $(divDom).remove();
            if(!json.noMask){
                closeMask();
            }
            $("#js_lg_tp_div").hide();
        };
        divDom.againShow = function () {
            var $box = $(divDom);
            var n_left = $(window).width() / 2 - $box.width() / 2;
            var n_top = $(window).height() / 2 - $box.height() / 2;
            $box.css({ top: n_top, left: n_left, margin: 0, position: "fixed" });
        };
        //定位方法
        divDom.position = function(){
            var $divDom = $(divDom);
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var winScrollTop = $(window).scrollTop();
            if(location != top.location){
                winHeight = $(window.parent).height();
                winScrollTop = $(window.parent).scrollTop();
            }
            //控制弹出层的位置
            var leftNum = winWidth / 2 - $divDom.width() / 2;
            var topNum = (winHeight / 2 - $divDom.height() / 2) + winScrollTop;
            if(json.btnDom){
                leftNum = json.btnDom.offset().left;
                if(leftNum + $divDom.width() >= winWidth){
                    leftNum = winWidth - $divDom.width();
                }
                if($(window).scrollTop()>json.btnDom.offset().top-100){
                    $(window).scrollTop(json.btnDom.offset().top-100)
                }
                topNum = json.btnDom.offset().top - $divDom.height() - 5;
            }
            if (topNum < 0){
                topNum = 0;
            }
            if(leftNum < 0){
                leftNum = 0;
            }
            $divDom.css({left: parseInt(leftNum), top: parseInt(topNum)});
        }
        divDom.position();
        //关闭事件
        $(divDom).on('click','.ct-close,.gray96x32,.gray94x32,.btn-gray96x32',function(){
            //by善练
            if(!$(this).hasClass('confirm')){
                divDom.close();
            }
            document.title=documenttitle;
        });
        document.title=documenttitle;
        _drag(divDom,'.ct-ly-h1')
        return	divDom;
    };
    //确定提示框
    var i8Confirm = function(json,cbk,cancelcbk){
        //json.body谁加的 我表示不知道干嘛的 先处理一下
        var confirmHtml = (json.body? json.body : "")+'<div class="ct-ly-msg">'+ json.title +'</div>'+
            '<div class="tcenter">' +
            '<span class="ct-confirm ct-ly-btn col-blue">确定</span>'+
            '<span class="ct-cancel ct-ly-btn col-f1">取消</span>'+
            '</div>';
        var divDom = showbox({ cont: confirmHtml,btnDom:json.btnDom?json.btnDom: null,title:json.bodytitle ? json.bodytitle : null});
        //确定事件
        $(divDom).delegate('.ct-confirm','click',function(){
            cbk(divDom);
            divDom.close();
        });
        //取消事件
        $(divDom).delegate('.ct-cancel','click',function(){
            cancelcbk && cancelcbk();
            divDom.close();
        });
        return divDom
    }
    var i8alert = function (json) {
        $('div.is-alert').remove();
        if(!json.type){
            json.type = 1;
        }
        /*if(Object.prototype.toString.call(json) === '[object String]'){
         var _json=json;
         json={};
         json.type = 1;
         json.title=_json;
         };*/

        var contHtml = '<div class="ct-alert ct-at-'+ json.type +'"><i></i>'+ json.title+'</div>';
        var divDom = showbox({
            noMask: json.noMask == undefined ? true : json.noMask,
            isalert:true, btnDom:json.btnDom?json.btnDom: null,
            cont:contHtml,
            zIndex:10000
        });
        setTimeout(function(){
            divDom.close();
            if(json.cbk){
                json.cbk();
            }
        },json.time || 2000);
    }
    /*
     title: 提示内容；
     type: 1 or 2 or 3 显示颜色 默认1 红色 2 绿色 3 黑色
     stype: 是否自动关闭
     */
    var i9alert = function (json) {
        var time = 2000;
        var _color = " #FF690E";
        var stypehtml = "";
        if (!json.type) {
            json.type = 1;
        }
        //提示内容类型
        if (json.type != 1) {
            _color = " #717276";
        }
        //显示方式
        if (json.stype) {
            stypehtml = '<span class="lg_fm_close"></span>';
        }
        if (json.time) {
            time = json.time;
        }
        var domobj = document.getElementById("js_lg_tp_div");
        if (domobj) {
            domobj = $(document.getElementById("js_lg_tp_div"));
            domobj.html('<i class="lg_fm_' + json.type + '"></i>' + json.title + stypehtml);
        } else {
            var htmlstr = '<div id="js_lg_tp_div" style="position:absolute; z-index:10000; left:50%; top:50%;' +
                'font-size:12px;color:' + _color + '; padding:2px 2px;' +
                'line-height:20px; display:none;">' +
                '<i class="lg_fm_' + json.type + '"></i>' + json.title + stypehtml + '</div>';
            $("body").append(htmlstr);
            domobj = $(document.getElementById("js_lg_tp_div"));
        }
        domobj.css({ "margin-left": 0 - domobj.width() / 2, "margin-top": 0 - domobj.height() / 2, color: _color, "position": "fixed" });
        if (json.btnDom) {
            var _left = json.btnDom.offset().left;
            var _top = json.btnDom.offset().top +json.btnDom.outerHeight()+2;
            if (_top < 0)
                _top = 1;
            var _right = "auto";
            var wdwidht = $(window).width();
            var boxwidth = domobj.width();
            if (_left > (wdwidht - boxwidth)) {
                _left = "auto";
                _right = 0;
            }
            domobj.css({ margin: 0, left: _left, top: _top, right: _right, position: "absolute" });
        }
        domobj.show();
        if (json.stype) {
            $(".lg_fm_close").click(function () {
                $(this).parent().hide();
            });
            return;
        }
        setTimeout(function () {
            domobj.hide();
            if (json.cbk) {
                json.cbk();
            }
        }, time);
    };
    var rightalert = function (json) {
        var time = 2000;
        var _color = " #FF690E";
        var stypehtml = "";
        if (!json.type) {
            json.type = 1;
        }
        //提示内容类型
        if (json.type != 1) {
            _color = " #717276";
        }
        //显示方式
        if (json.stype) {
            stypehtml = '<span class="lg_fm_close"></span>';
        }
        if (json.time) {
            time = json.time;
        }
        var domobj = document.getElementById("js_lg_tp_div");
        if (domobj) {
            domobj = $(document.getElementById("js_lg_tp_div"));
            domobj.html('<i class="lg_fm_' + json.type + '"></i>' + json.title + stypehtml);
        } else {
            var htmlstr = '<div id="js_lg_tp_div" style="position:absolute; z-index:10000; left:50%; top:50%;' +
                'font-size:12px;color:' + _color + ';' +
                ' display:none;">' +
                '<i class="lg_fm_' + json.type + '"></i>' + json.title + stypehtml + '</div>';
            $("body").append(htmlstr);
            domobj = $(document.getElementById("js_lg_tp_div"));
        }
        domobj.css({ "margin-left": 0 - domobj.width() / 2, "margin-top": 0 - domobj.height() / 2, color: _color, "position": "fixed"});
        if (json.btnDom) {
            var _left = json.btnDom.offset().left +5+ json.btnDom.outerWidth();
            var _top = json.btnDom.offset().top;
            if (_top < 0)
                _top = 1;
            var _right = "auto";
            var wdwidht = $(window).width();
            var boxwidth = domobj.width();
            if (_left > (wdwidht - boxwidth)) {
                _left = "auto";
                _right = 0;
            }
            domobj.css({ margin: 0, left: _left, top: _top, right: _right, position: "absolute",lineHeight: json.btnDom.outerHeight()+"px" });
        }
        domobj.show();
        if (json.stype) {
            $(".lg_fm_close").click(function () {
                $(this).parent().hide();
            });
            return;
        }
        setTimeout(function () {
            domobj.hide();
            if (json.cbk) {
                json.cbk();
            }
        }, time);
    };
    var listLoading = function(dom){
        dom.html('<span style="line-height: 30px; text-align: center; display: block;">加载中...</span>');
    }

    //浮层拖动功能
    var Ileft = 0;
    var Itop = 0;
    //禁用文字选择
    function disabledcheck() {
        document.unselectable = "on";
        document.onselectstart = function () {
            return false;
        }
        $("body").css("-moz-user-select", "none");
    }
    //恢复文字选中
    function huifucheck() {
        document.unselectable = "off";
        document.onselectstart = null;
        $("body").css("-moz-user-select", "text");
    }

    (function($){
        $.fn.setSelect = function(json){
            if($(this).length <= 0){
                return;
            }
            var json=json||{};
            var options = $(this).find("option");
            var thisInnerHTML = $(this).html();
            var _width = json.width || $(this).width();
            var _defaultValue = '';
            var _defualtHtml = '--请选择--';
            var selectedId = '';
            var selOption = $(this).find("option:selected");

            if(!json.showdef){//是否强制设置请选择
                if(selOption.length > 0){
                    _defualtHtml = selOption.html();
                    _defaultValue = $(this).val();
                }else{
                    if(options.length >0){
                        _defualtHtml = options[0].innerHTML;
                        _defaultValue = $(options[0]).attr('value');
                    }
                }
            }

            var labelDom = document.createElement('label');
            labelDom.className = 'i8-select '+json.newi8select;
            labelDom.id = $(this).attr('id') || 'i8select'+Math.random()*10E16;
            var optionsHtml = '<i class="i8-select-drop '+json.dropstyle+'"></i><span class="i8-select-cked '+json.ckedstyle+'" value="'+ _defaultValue +'">'+ _defualtHtml +'</span><span class="i8-sel-options">';
            var tpl = (thisInnerHTML.replace(/<option/g,"<em").replace(/<\/option>/g,'</em>').replace(/<OPTION/g,"<em").replace(/<\/OPTION>/g,'</em>'));

            optionsHtml += tpl + '</span>';
            labelDom.innerHTML = optionsHtml;

            $(this).replaceWith(labelDom);
            var $label = $(labelDom);
            $label.setValue(selectedId);
            //$label.css({'width':_width,'height': _height, lineHeight: _height+ 2+"px"});
            $label.css({'width':_width, lineHeight: _height+ 2 +"px"});
            if(json && json.style){
                $label.attr("style",json.style);
            }
            var _height = $label.outerHeight();
            $label.find('.i8-sel-options').css('top',_height);
            $label.delegate('em','click',function(){
                var spanDom = $(this);
                $label.find('span.i8-select-cked').html(spanDom.html()).attr('value',spanDom.attr('value'));
                $label.find('span.i8-sel-options').hide();
                if(json && json.cbk)
                    json.cbk(spanDom);
                return false;
            });
            $label.click(function(){
                var labs = $('label.i8-select');
                labs.each(function(){
                    if(!(this == labelDom)){
                        $(this).find('span.i8-sel-options').hide()
                    }
                });
                $label.find('span.i8-sel-options').toggle(function(){
                    $label.mCustomScrollbar&&mCustomScrollbarTop($label);
                });
                return false;
            });
            var mCustomScrollbarTop=function(label){
                var top=label.find('em[value="'+label.getValue()+'"]').index()*(_height+2);
                label.find('.i8-sel-options').mCustomScrollbar('scrollTo',-top+'px');
            }
            if(!window.i8selbind){
                window.i8selbind=true;
                $(document).on('click',function(){
                    $('span.i8-sel-options').hide();
                });
            }
            return this;
        }
        $.fn.getValue = function(){
            return $(this).find('span.i8-select-cked').attr('value');
        }
        $.fn.setValueByIndex = function(index){
            var selectDom = $(this).find('span.i8-select-cked');
            var $cu_option=$(this).find('span.i8-sel-options option').eq(index);
            selectDom.attr('value',$cu_option.attr('value')).html($cu_option.html());
            return;
        }
        $.fn.setValue = function(id){
            var hasSel=false;
            var selectDom = $(this).find('span.i8-select-cked');
            $(this).find('span.i8-sel-options em').each(function(){
                if($(this).attr('value') == id || $.trim($(this).text()) == $.trim(id)){
                    selectDom.attr('value', $(this).attr('value')).html($(this).html());
                    hasSel=true;
                    return;
                }
            });
            if(!hasSel){
                $(this).setValueByIndex(0);
            }
        }
        $.fn.setKey = function(text){
            var selectDom = $(this).find('span.i8-select-cked');
            $(this).find('span.i8-sel-options em').each(function(){
                if($.trim($(this).html()) == text){
                    selectDom.attr('value', $(this).attr('value')).html($(this).html());
                    return;
                }
            });
        }
        $.fn.updateSelect=function(opts){
            var showdef=opts.showdef,
                $sel=opts.$sel,
                data=opts.data,
                key=opts.key,
                value=opts.value,
                _html='<i class="i8-select-drop newselecti"></i>';
            if(showdef){
                _html+='<span class="i8-select-cked '+(opts.ckedstyle || '')+'" value="">--请选择--</span>'
            }
            _html+='<span class="i8-sel-options">';
            if(!value){
                $.each(data,function(index,val){
                    if(opts.valueByIndex){
                        _html+='<em value="'+index+'">'+val+'</em>';
                    }else{
                        _html+='<em value="'+val+'">'+val+'</em>';
                    }
                })
            }else{
                $.each(data,function(index,item){
                    _html+='<em value="'+item[key || value]+'">'+item[value]+'</em>';
                })
            }
            _html+'<span>'
            $sel.html(_html);
        },
            $.fn.getKey = function(){
                return $(this).find('span.i8-select-cked').html();
            }
        $.fn.getDom = function(){
            return $(this).find('span.i8-select-cked');
        }

        $.fn.setTime=function(json){
            json=json||{};
            //this.addClass(!this.val()?'date-bg':'date-bg checked');
            this.addClass('date-bg checked');
            this.on('click',function(){
                json.enableKeyboard=false;
                WdatePicker(json);
                var _this=$(this);
                /*if(_this.val()==''){
                 _this.removeClass('checked');
                 }else{
                 _this.addClass('checked');
                 }*/
                var _t=_this.val();
                _this.val('').val(_t);//解决ie8光标兼容性

            });
            this.on('keydown',function(){
                return false;
            })
            return this;
        }

        $.fn.setTextArea=function(json){
            var json= $.extend({
                l_height:'22',
                m_height:'36',
                color:'#f00',
                width:'698'
            },(json||{}));
            var _parent=this.parent();
            if(_parent.hasClass('textareaparent')) {
                return;
            }
            this.css({'line-height':json.l_height+'px','position':'absolute','height':'100%','width':json.width+'px'});
            //_parent=$('<div class="textareaparent" style="line-height: '+json.l_height+'px"></div>');
            this.wrap('<div class="textareaparent rel" style="line-height: '+json.l_height+'px"></div>');
            _parent=this.parent();
            _parent.append('<div class="textplace" style="word-break: break-all; min-height: '+json.m_height+'px; width:'+json.width+'px;"></div>')
            this.on('input propertychange',function(){
                var _this=$(this);
                _this.parent().find('.textplace').html(_this[0].value);
            });
        }
    })(jQuery);


    //处理低版本placeHolder
    (function($){
        $.fn.placeholder=function(all){
            if(all){
                var isAdvBrowser = false;
            }else{
                var isAdvBrowser=!/msie [6,7,8,9]/.test(navigator.userAgent.toLowerCase());
            }
            this.each(function(){
                var _this=$(this);
                if(isAdvBrowser){
                    return;
                }
                _this.placeVal=_this.attr('placeholder');
                _this.val(_this.placeVal);
                _this.focus(function(){
                    if(_this.val()==_this.placeVal){
                        _this.val('');
                    }
                }).blur(function(){
                    if(_this.val()=='' || _this.val()==null){
                        _this.val(_this.placeVal);
                    }
                })
            })
            return this;
        }
    })(jQuery);
    //注册添加删除事件
    (function($){
        $.fn.initAddAndDel=function(options){
            var tpl=options.tpl,
                lineClass=options.lineClass,
                addClass=options.addClass || '.add',
                delClass=options.delClass || '.del',
                $cont=$(this);
            var onlyDelClass=delClass.substr(1);
            var refresh=function($parents){
                $parents.addClass('noadd');
                if($parents.length>1){
                    $parents.last().removeClass('noadd');
                    $parents.first().removeClass('onlyone');
                }else{
                    $parents.last().addClass('onlyone');
                }
            }
            refresh($cont.find(lineClass));
            $cont.on('click',delClass,function(){
                if(!options.beforedel || (options.beforedel && (options.beforedel($(this))!=false))){
                    $(this).parents(lineClass).remove();
                    options.afterdel && options.afterdel($(this));
                    refresh($cont.find(lineClass));
                }
            })
            $cont.on('click',addClass,function(){
                if(!options.beforeadd || (options.beforeadd && (options.beforeadd($(this))!=false))){
                    $(lineClass).last().after(tpl);
                    options.afteradd && options.afteradd($(this));
                    refresh($cont.find(lineClass));
                }
            })
        }
    })(jQuery);
    //滚动时固定元素
    (function($){
        $.fn.scrollFixed=function(dofixcallback,undofixcallback){
            var $this=$(this);
            var _this=this;
            var _iTop=this.offset().top;
            function doinputfix(){
                var _bscroll=document.body.scrollTop || document.documentElement.scrollTop;
                if(_bscroll>_iTop){
                    $this.removeClass('rel');
                    $this.addClass('fix');
                    dofixcallback && dofixcallback.call(_this);
                }else{
                    $this.removeClass('fix');
                    $this.addClass('rel');
                    undofixcallback && undofixcallback.call(_this);
                }
            }
            $(window).scroll(function(){
                doinputfix();
            })
            doinputfix();
            return this;
        }
    })(jQuery);

    //添加addinputclear
    (function($){
        $.fn.i8searchEvent=function(ops){
            ops=ops || {};
            //自定义事件列表
            /*
             * DelayKeyUp
             * */
            //初始化参数
            ops= $.extend({
                init:function(){},
                content:'body',
                doms:{
                    clearbtn:'.app_clear_txt_btn',
                    nodata:'.nodata',
                    searchdd:'.search-dd',
                    items:('.search-dd li a')
                },
                callbacks:{
                    onChange:function(){},
                    onNoDate:function(){},
                    onEmptyInput:function(){}
                },
                htmls:{
                    nodata:'<li class="nodata">未找到匹配的信息</li>'
                },
                keydownDelay:60
            },ops)

            //合并
            var _cbks =  ops.callbacks,
                _input =  this,
                _doms = ops.doms,
                _htmls = ops.htmls,
                _times= ops.times,
                _clearbtn  =  $(ops.content).find(ops.clearbtn);
            //限定doms
            for(var domskey in _doms){
                _doms[domskey]=$(ops.content).find(_doms[domskey]);
            }
            _doms.searchdd.noItem = false;
            //初始化
            _htmls.nodata && _doms.searchdd.append(_htmls.nodata);
            ops.init();
            //input绑定keyup
            _input.keydown(function(){
                _input.keyDownVal=_input.val();
            })
                .keyup(function(ev){
                    var _keycode=ev.keyCode;
                    clearTimeout(_input.timer);
                    _input.timer=setTimeout(function(){
                        _doms.searchdd.noItem =false;//是否触发_cbks.onNoDate；
                        _doms.items.show();
                        _input.keyUpVal=_input.val();
                        if(_input.keyUpVal==''){
                            _cbks.onEmptyInput();
                            return;
                        }
                        if(_input.keyDownVal==_input.keyUpVal){
                            return;
                        }
                        _cbks.onChange(_keycode);
                        _doms.searchdd.noItem && _cbks.onNoDate();
                    },ops.keydownDelay)
                })
            return this;
        }
    })(jQuery);

    //输入错误提示 闪动背景颜色效果
    var TxtBoxWarn = function (txtobj) {
        var colors = ["rgb(255,255,255)", "rgb(255,238,238)", "rgb(255,221,221)", "rgb(255,204,204)", "rgb(255,187,187)", "rgb(255,255,255)", "rgb(255,238,238)", "rgb(255,221,221)", "rgb(255,204,204)", "rgb(255,187,187)", "rgb(255,255,255)"];
        var colorAnimate = function (cls) {
            var clrTimer = null;
            if (cls.length > 0) {
                clrTimer = setTimeout(function () {
                    txtobj.css({ "background-color": cls.shift() });
                    colorAnimate(cls);
                }, 100);
            } else {
                clearTimeout(clrTimer);
            }
        }
        colorAnimate(colors);
    };
    var render_loading_mid_w=function(box){
        var $box=$(box)
        if($box.get(0).tagName.toLowerCase()=='tbody'){
            $box.html('<td colspan="999"><div class="ld-64-write" style="width:64px;height: 64px;"></div></td>');
        }else{
            $box.html('<div class="ld-64-write" style="width:64px;height: 64px;"></div>');
        }
        return
    }
    var render_loading=function(box,type){
        var _class='';
        if(type && (type!='write' && type!='gray')){//如果不是write和gray直接赋值class;
            _class=type;
        }else{
            type=type || 'write';
            _class='ld-64-'+type+'';
        }
        var _size=_class.split('-')[1];
        var $box=$(box)
        if($box.get(0).tagName.toLowerCase()=='tbody'){
            $box.html('<td colspan="999"><div class="'+_class+'" style="width:'+_size+'px;height: '+_size+'px;"></div></td>');
        }else{
            $box.html('<div class="'+_class+'" style="width:'+_size+'px;height: '+_size+'px;"></div>');
        }
        return;
    }
    var render_no_data=function(box,txt,colspan){
        //没有数据
        var txt=txt || "没有找到任何数据~";
        var colspan=colspan || 999;
        var $box=$(box)
        if($box.get(0).tagName.toLowerCase()=='tbody'){
            $box.html('<tr><td colspan="'+colspan+'"><div class="noresult">\
                        <div class="no-resulticon noresult-icon"></div>\
                            <div class="noresult-title">'+txt+'</div>\
                        </div></td></tr>');
        }else{
            $box.html('<div class="noresult">\
                        <div class="no-resulticon noresult-icon"></div>\
                            <div class="noresult-title">'+txt+'</div>\
                        </div>');
        }
        if($(box).attr('panl')){
            $($(box).attr('panl')).html('');
        }else{
            $("#js_cement_page_panl").html("");
        }
    }
    var showDielog =function (url,width,height){
        var winOption = "height="+height+",width="+width+",top=50,left=50,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,fullscreen=0";
        if(window.showModalDialog){
            return window.open (url,"_blank",winOption)
            //return window.showModalDialog(url,window, "dialogWidth:"+width+"px;status:no;dialogHeight:"+height+"px");
        }else{
            return  window.open(url,window, winOption);
        }
    }
    function accAdd(arg1,arg2){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2))
        return (arg1*m+arg2*m)/m
    }
    function accSubtr(arg1,arg2){
        var r1,r2,m,n;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        //last modify by deeka
        //动态控制精度长度
        n=(r1>=r2)?r1:r2;
        return ((arg1*m-arg2*m)/m).toFixed(n);
    }
    // function accMult(arg1,arg2)
    // {
    //     var m=0,s1=arg1.toString(),s2=arg2.toString();
    //     try{m+=s1.split(".")[1].length}catch(e){}
    //     try{m+=s2.split(".")[1].length}catch(e){}
    //     return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    // }
    // function accDivide(arg1,arg2){//除法
    //     var t1=0,t2=0,r1,r2;
    //     try{t1=arg1.toString().split(".")[1].length}catch(e){}
    //     try{t2=arg2.toString().split(".")[1].length}catch(e){}
    //     with(Math){
    //         r1=Number(arg1.toString().replace(".",""))
    //         r2=Number(arg2.toString().replace(".",""))
    //         return (r1/r2)*pow(10,t2-t1);
    //     }
    // }
    // Number.prototype.accAdd = function (arg){
    //     return accAdd(this,arg);
    // }
    // Number.prototype.accSubtr = function (arg){
    //     return accSubtr(this,arg);
    // }
    // Number.prototype.accMult = function (arg){
    //     return accMult(this,arg);
    // }
    // Number.prototype.accDivide = function (arg){
    //     return accDivide(this,arg);
    // }
    exports.showNoTitle = showbox;
    exports.showbox = showbox;
    exports.confirm = i8Confirm;
    exports.alert = i8alert;
    exports.formalert = i9alert;
    exports.loading = listLoading;
    exports.txterror = function(message,btnDom){
        i9alert({title:message,stype: true, btnDom: btnDom});
        setTimeout(function(){
            $("#js_lg_tp_div").fadeOut(500);
        },3000);
    }
    exports.trterror = function(message,btnDom){
        rightalert({title:message,stype: true, btnDom: btnDom});
        setTimeout(function(){
            $("#js_lg_tp_div").fadeOut(500);
        },3000);
    }
    exports.wlding32 = function(){

    }
    exports.error = function(message,btnDom){
        i8alert({title: message,btnDom:btnDom});
    }
    exports.write= function(message){
        i8alert({title: message,type:2});
    }
    exports.simpleWrite= function(message,btnDom){
        i8alert({title: message,type:2,btnDom:btnDom});
    }
    exports.successMask= function(message){
        i8alert({title: message,type:2,noMask:false});
    }
    exports.simpleAlert= function(message,btnDom){
        i8alert({title: message,type:1,btnDom:btnDom});
    }
    exports.render_loading_mid_w=render_loading_mid_w;
    exports.render_loading = render_loading;
    exports.render_no_data = render_no_data;
    exports.txtError = TxtBoxWarn;
    exports.showDielog=showDielog;
    exports.drag=_drag;
});
