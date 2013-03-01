
(function (reviews, Backbone, $, _) {

    // Application Router
    // -------------------
    // The router will listen for URL changes and 
    // map to the specific controller that will handle the 
    // request.
    //
    // @class AppRouter

    //  convenience references to top level models and views namespaces
    var r = reviews.routers,
        v = reviews.views,
        m = reviews.models,
        c = reviews.collections;

    r.AppRouter = Backbone.Router.extend({
        // keys are url paths and values methods to call
        // for prototype, home is productList
        routes: {
            '': 'home',
            'reviews/add': 'addReview'
        },

        initialize: function() {

            // load up bootstrapped data which is in the script tag with id
            //   'init_data'
            var jsonText = document.getElementById('init_data').innerHTML, 
                initData = JSON.parse(jsonText);
              console.log(initData);        

            // create the review collection with bootstrapped data  
            c.bookReviewColln = new c.BookReviewCollection(initData);
  
        },

        /*
         * home, lists reviews
         * @method home
         */
        home: function() {
            console.log("AppRouter - intro page");

            // create view if not already present
            if (! v.bookReviewsView) {
                v.bookReviewsView = new v.BookReviewsView({reviews: c.bookReviewColln});
            }          
            v.bookReviewsView.render();
        },

        /*
         * addReview add new review using BookReviewView
         * @method addReview
         */
        addReview: function() {
            console.log("AppRouter - addReview page");

            // create view if not already present
            if (! v.bookReviewView) {
                v.bookReviewView = new v.BookReviewView();
            }
            v.bookReviewView.setModel(new m.BookReviewModel());

            // show the review page
            v.bookReviewView.render();
        }      
    });

}(window.reviews, Backbone, jQuery, _));
