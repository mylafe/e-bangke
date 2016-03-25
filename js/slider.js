/**
 * 焦点图切换效果
 *
 */

    function Slider(options){
        this.defaults = {
            // 焦点图容器
            container: '#slider_wrap',
            // 按钮容器的className
            navClassName: 'lideshow-num',
            navEvent: 'click',
            // 滑动速度
            speed: 5000,
            // 是否自动播放
            isAutoPlay: true
        };
        this.size = 0;
        this.index = 0;
        this.timer = null;

        if($.isPlainObject(options)){
            $.extend(this.defaults, options);
        }
    }

    Slider.prototype = {
        /**
         * 执行切换效果
         * @return {[type]} [description]
         */
        show: function(){
			
            var wrap = $(this.defaults.container),
                list = wrap.find('li'),
                nav = wrap.siblings('.js-slider-nav'),
                index = this.index;

            nav.find('li.on').removeClass('on');
            $.each(list, function(k, v){
                if(index == k){
                    list.eq(k).fadeIn('normal', function(){
                        $(this).css('z-index', 9);
                    });
                    nav.find('li').eq(k).addClass('on');
                }else{
                    list.eq(k).fadeOut('normal', function(){
                        $(this).css('z-index', 1);
                    });
                }
            });

            // 设置index
            this.index++;
            if(this.index == this.size){
                this.index = 0;
            }
        },
        play: function(){
            var that = this;
            // var fn = arguments.callee;

            if(this.defaults.isAutoPlay){
                this.timer = setInterval(function(){
                    // fn.call(that);
                    that.show();
                }, this.defaults.speed);
            }
        },
        bind: function(){
            var that = this,
                wrap = $(this.defaults.container),
                nav = wrap.siblings('.js-slider-nav');

            // slider nav
            nav.delegate('li', this.defaults.navEvent, function(e) {
                var self = $(this),
                    index = parseInt(self.data('index'), 10);

                if(self.hasClass('on')){
                    return false;
                }

                clearInterval(that.timer);
                that.timer = null;
                that.index = isNaN(index) ? 0 : index;
                that.show();
                return false;
            });

            // autoplay
            wrap.hover(function() {
                clearInterval(that.timer);
                that.timer = null;
            }, function() {
                that.play();
            });
        },
        init: function(){
            var wrap = $(this.defaults.container);

            this.size = wrap.find('li').size();

            var str = '<ul class="js-slider-nav ' + this.defaults.navClassName + '">';
            var cls = '';
            for(var i = 0; i < this.size; i++){
                cls = (i === 0) ? 'on' : '';
                str += '<li data-index="' + i + '" class="' + cls + '"></li>';
            }
            str += '</ul>';

            if(this.size > 1){
                $(str).insertAfter(this.defaults.container);
            }

            this.bind();
            this.play();
        }
    };

