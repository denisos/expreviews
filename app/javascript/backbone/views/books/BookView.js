
(function (reviews, Backbone, $, _, dust) {

  /*
   * Displays a book 
   *
   * @class BookView 
   */
  reviews.views.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',

    events: {
        'click .book'            : 'handleBookSelected'
       
    },

    /*
     * called once at creation
     *
     * @method initialize
     */ 
    initialize: function () {
        _.bindAll(this, 'render', 'handleBookSelected');

        // bind to the book
        this.model.on('change', this.render, this);
    },

    /*
     * show the book
     *
     * @method render
     */    
    render: function () {
        var self = this;

        // render a book
        //
        dust.render("book_book", this.model.toJSON(), function (err, output) {
            if (err) { throw err; }

            self.$el.html(output);

        });
      
        return this;
    },

    handleBookSelected: function(event) {
        event.stopPropagation(); 
        event.preventDefault();

        this.trigger(reviews.views.BookView.BOOKSELECTED, this.model);
    }


  },
  {
    BOOKSELECTED: "BookSelected"
  });

}(window.reviews, Backbone, jQuery, _, dust));