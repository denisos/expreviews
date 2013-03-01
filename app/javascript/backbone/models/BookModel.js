
(function (reviews, Backbone, $, _) {

    // BookModel represents a book
    //
    reviews.models.BookModel = Backbone.Model.extend({

        // extract just the book fields we're interested in by overriding
        //  parse and returning a map of fields which backbone will set
        //  into each model
        //
        parse: function(response) {
            var vol = response.volumeInfo;

            // to-do: make more robust
            return {title: vol.title, 
                    subtitle: vol.subtitle || null,
                    authors: vol.authors && vol.authors[0] || 'unknown',
                    thumbImg: vol.imageLinks && vol.imageLinks.smallThumbnail || vol.previewLink || null,
                    isbn: vol.industryIdentifiers && vol.industryIdentifiers.length > 1 ? vol.industryIdentifiers[0].identifier : null};
        }
    });

}(window.reviews, Backbone, jQuery, _));