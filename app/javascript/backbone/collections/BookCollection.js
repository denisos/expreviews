
(function (reviews, Backbone, $, _) {

    // BookCollection
    //

    //  convenience references to top level models and views namespaces
    var c = reviews.collections,
        m = reviews.models;

    c.BookCollection = Backbone.Collection.extend({
		model: m.BookModel,

        url: function() {
            return 'https://www.googleapis.com/books/v1/volumes?q=' + this.searchTerm;
        },

        setSearchTerm: function(term) {
            this.searchTerm = term;
        },

        parse: function(response) {
            return response.items;
        },

        /* 
         * override backbone sync to use jsonp
         *
         */
        sync: function (method, model, options) {  
            options.dataType = "jsonp";  
            return Backbone.sync(method, model, options);  
        }


    });

}(window.reviews, Backbone, jQuery, _));