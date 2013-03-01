
/* a jquery plugin to animate in and out the side navigation */ 
(function($){
    // namespace the $
    $.fn.sideNavAnimate = function(options) {

        // merge options passed with defaults
        var opts = $.extend({
            duration: 100,
            animOffset: -200
        }, options || {});

        // return the wrapped set to allow chaining
        return this.each(function() {
            var $this = $(this);       // the current element

            $this
                // animate out by set to 0 and show hover icon
                .mouseenter(function(){
                        $this.find('.nav-icon').hide();
                        $this.find('.nav-icon-over').show();

                        $this.stop(true).animate({left:0}, opts.duration);
                })
                // animate back in by animOffset show off icon
                .mouseleave(function(){
                    $this.animate({left: opts.animOffset}, opts.duration, '', function() {
                        $this.find('.nav-icon').hide();
                        $this.find('.nav-icon-off').show();
                    });
                })
                // for click get value in data-url and jump to it
                .click(function(){
                    console.log("clicked element, link is", $this.data("url"));
                    document.location.href = $(this).data('url');
                });
        });
    };
})(jQuery);  