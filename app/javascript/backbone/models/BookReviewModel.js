
(function (reviews, Backbone, $, _) {

    // BookReviewModel a single book review
    //
    reviews.models.BookReviewModel = Backbone.Model.extend({
        url: function() {
            return '/reviews/' + this.get("isbn");
        },

        defaults: {
            "thumbImg": "http://bks9.books.google.com/books?id=ezFihJmC8qAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }

    });

}(window.reviews, Backbone, jQuery, _));