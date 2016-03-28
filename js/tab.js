;(function (window, $, undefined) {
    /*
     * tab切换插件
     * 用例：$('*').createTab();
     */
    $.fn.createTab = function (opt) {
        var def = {
            activeEvt: 'mouseover',
            activeCls: 'cur'
        }
        $.extend(def, opt);
        this.each(function () {
            var $this = $(this);
            var timer;
            $this.find('ul.title li').mouseover(def.activeEvt,function(){
                var index = $(this).index(),
                    that = $(this);
                timer = setTimeout(function(){
                    if(that.hasClass("tabli1")){
                        that.addClass('cur').siblings().removeClass('cur');
                    }else if(that.hasClass("tabli2")){
                        that.addClass('cur2').siblings().removeClass('cur2');
                    }else if(that.hasClass("tabli3")){
                        that.addClass('cur3').siblings().removeClass('cur3');
                    }else{
                        that.addClass('cur4').siblings().removeClass('cur4');
                    }
                    // tab1
                    $this.find('div.list1').animate({marginLeft:-1156*index},'slow');
                    // tab2
                    $this.find('div.list').animate({marginLeft:-835*index},'slow');
                    //tab3
                    $this.find('div.list3').animate({marginLeft:-835*index},'slow');
                    //tab4
                    $this.find('div.list4').animate({marginLeft:-835*index},'slow');
                },300);
            }).mouseout(function(){
                clearTimeout( timer );
            })
        });
    }

})(window, jQuery);
$(function(){
    $(".jyTable").createTab()
})