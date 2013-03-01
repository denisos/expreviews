// Backbone bootstrapping
// ------
// The bootstrapping process will fire on every page
(function (reviews, pdp, $) {

    console.log("Bootstrapping backbone "+(new Date()).getTime());

    // Instantiating the main application router
    // 
    reviews.routers.appRouter = new reviews.routers.AppRouter();

    // instantiate book collection too
    reviews.collections.bookCollection = new reviews.collections.BookCollection();

    // Start Backbone Routing
    // ----------------------
    Backbone.history.start();

 
}(window.reviews, jQuery));