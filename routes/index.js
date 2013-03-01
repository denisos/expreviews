
/*
 * GET home page.
 */

exports.index = function(req, res){

  
    var reviewsStore    = req.app.get('reviewsStore');
    res.locals.session = req.session;

    reviewsStore.list(function (reviews) {

        res.render('index', { reviews: JSON.stringify(reviews)});
    });

};

exports.saveReview = function(req, res){
  
    var reviewsStore    = req.app.get('reviewsStore');
    res.locals.session = req.session;

    if (req.body && req.body.isbn && req.body.review) {
        console.log('post body data passes check :', req.body);

        reviewsStore.add(req.body, function() {
            res.send(200);
        });
    } else {
        res.send(400);
    }
};