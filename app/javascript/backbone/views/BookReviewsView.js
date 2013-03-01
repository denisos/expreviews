


(function (reviews, Backbone, $, _, dust) {

  /*
   * Displays all the book reviews
   *
   * @class BookReviewsView 
   */
  reviews.views.BookReviewsView = Backbone.View.extend({

    el: '#content',

    events: {
       'click .bookReviewDetails'    : 'handleReviewEdit'

    },

    /*
     * called once at creation
     *
     * @method initialize
     */ 
    initialize: function () {
        _.bindAll(this, 'render');

        // bind to the reviews collection passed
        this.options.reviews.bind('reset', this.render, this);
    },

    /*
     * show all the reviews
     *
     * @method render
     */    
    render: function () {
        var self = this,
            data = {reviews: this.options.reviews.toJSON()};

        // render the reviews page passing data to run through template proper
        //
        dust.render("home_index", data, function (err, output) {
            if (err) { throw err; }

            self.$el.html(output);

        });
      
        return this;
    },   

    handleReviewEdit: function(event) {
        console.log("handleReviewEdit");

	}


  });

}(window.reviews, Backbone, jQuery, _, dust));