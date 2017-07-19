'use strict';
var heightEqua = (function(){
    function convertHeight(){
        (function ( $ ) {
            $.fn.convert_height=function(){
                var element=$(this)
                $(element).innerHeight("auto");
                var h_=0;
                var itemss=$(element);
                itemss.each(function(){
                    if(h_<$(this).innerHeight()) h_=$(this).innerHeight();
                })
                itemss.each(function(){
                    $(this).innerHeight(h_);
                })
            };
        }( jQuery ));
    }
    function feedHieght(){
             $(".slick-list").each(function(){
                $(this).find(".item-slider-new").convert_height();
                 });
    }
    function resizeHeight() {
        feedHieght();
    }
    function init() {
        convertHeight();
        resizeHeight();
        $(window).on('load',function() {
            feedHieght();
        });
        $(window).on('resize',function(){
            feedHieght();
        });
    }
    return {
        init: init,
    }
})();

export {heightEqua};
