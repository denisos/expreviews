
(function (reviews, Backbone, $, _, dust) {

  /*
   * Displays a book when results of search
   *
   * @class BookSearchResultsView 
   */
  reviews.views.BookSearchResultsView = reviews.views.BookView.extend({

    /*
     * show the book as a result of search results
     *
     * @method render
     */    
    render: function () {
        var self = this;

        // render a book
        //
        dust.render("book_booksearchresults", this.model.toJSON(), function (err, output) {
            if (err) { throw err; }

            self.$el.html(output);

        });
      
        return this;
    }


  });

}(window.reviews, Backbone, jQuery, _, dust));