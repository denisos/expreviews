

(function (reviews, Backbone, $, _, dust) {

  //  convenience references to top level models and views namespaces
  var c = reviews.collections,
      v = reviews.views,
      m = reviews.models,
      r = reviews.routers;

  /*
   * View used to add a new review or display existing review
   *
   * @class BookReviewView 
   */
  v.BookReviewView = Backbone.View.extend({

    el: '#content',

    events: {
       'click #save'            : 'handleSaveBookReview',
       'click #search'          : 'handleSearchBookReview',
       'click #manualEntry'     : 'handleManualEntryBookReview',
       'keypress #title'        : 'handleTitleKeypress'
    },

    /*
     * called once at creation
     *
     * @method initialize
     */ 
    initialize: function () {
        _.bindAll(this, 'render', 'renderBookSearchSuccess', 'renderBookSearchError');

    },

    setModel: function(model) {
        this.model = model;

        this.model.on('change', this.render, this);
    },

    /*
     * show this review or allow create new
     *
     * @method render
     */    
    render: function () {
        var self = this,
            data = this.model.toJSON();

        // render the book review page passing data to run through template proper
        //
        dust.render("addreview_addreview", data, function (err, output) {
            if (err) { throw err; }

            self.$el.html(output);

        });
      
        return this;
    },    

    renderBookSearchSuccess: function(bookCollection, response) {
        var self = this,
            view,
            data = {};
        
        data.books = bookCollection.toJSON();

        // add a book results view for each book found
        bookCollection.each(function(book) {
            console.log(book.get("title"));

            view = new v.BookSearchResultsView({
                model: book
            });


            $('#booksSearchResults', self.$el).append(view.render().el);

            // add self as a listener to book select event
            // 
            view.on(v.BookView.BOOKSELECTED, self.handleSearchBookSelected, self);
        });

        $('#booksSearchResults', self.$el).parent().show();
        $('#entryDetails').hide();

        self.showSearchLoader(false);   

    },

    renderBookSearchError: function(bookCollection, response) {
        console.log("Error occured searching, please retry or enter manual info");

        this.showSearchLoader(false);

    },    

    handleSaveBookReview: function(event) {
        console.log("handleSaveBookReview");

        var self = this;

        // prevent the default link click behavior
        event.preventDefault();

        this.model.set({"isbn": $('#isbn').val(),
                        "title": $('#title').val(),
                        "review": $('#review').val()},
                        {silent:true}
                       );

        // on save success add the model to the local collection
        this.model.save({}).success(function() {
                                c.bookReviewColln.add(self.model);

                                // return to home page
                                r.appRouter.navigate('', {trigger: true});

                            });
    },

    /*
     * when user is entering a book review they can search the bookCollection
     *  for a match on title
     *
     * @param {Object} event
     */ 
    handleSearchBookReview: function(event) {
        // empty the html so no previous results present
        $('#booksSearchResults', self.$el).empty();

        // set the search term and then fetch the data passing
        //  success and error callbacks
        //
        c.bookCollection.setSearchTerm($('#title').val());

        this.showSearchLoader(true);

        c.bookCollection.fetch({success: this.renderBookSearchSuccess,
                                error: this.renderBookSearchError});

    },

    showSearchLoader: function(showLoader) {
        $('#search').toggle(! showLoader);
        $('#searchLoader').toggle(showLoader);   
    },

    handleTitleKeypress: function(event) {
//        console.log('keypress char: ', String.fromCharCode(event.which));
    },

    handleManualEntryBookReview: function(event) {
        $('#booksSearchResults', this.$el).parent().hide();

        $('#entryDetails', this.$el).show();
    },   

    handleSearchBookSelected: function(book) {
        console.log("Book choosen :", book);

        this.model.set("isbn", book.get("isbn"));
        this.model.set("title", book.get("title"));
        this.model.set("thumbImg", book.get("thumbImg"));

        this.handleManualEntryBookReview();
    }

  },
  {
    PLACEHOLDER_THUMB_IMG: "http://bks9.books.google.com/books?id=ezFihJmC8qAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"

  });

}(window.reviews, Backbone, jQuery, _, dust));