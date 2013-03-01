
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , dust = require('dustjs-linkedin')        // 1 denis added for dust
  , cons = require('consolidate')            // 2 denis added for dust
  , StorageCrud = require('./storeCrud');

if (!StorageCrud) {
    throw new Error("ERROR: reviews storage not exist");
}

// instantiate the storage manager
//
var reviewsStore = new StorageCrud({databaseName: 'nodejitsudb93315994410',
                                    server: 'alex.mongohq.com',
                                    port: 10042,
                                    collection: 'bookReviews',
                                    authInfo: {
                                        user: 'nodejitsu',
                                        password: 'a3bf2896d17cbf1cd4068210f8fa9bb8'
                                    } });

// create the express app
var app = express(); 

app.engine('dust', cons.dust);               // 3 denis added for dust

app.configure(function(){

    app.set('template_engine', 'dust');        // 4 denis added for dust
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'dust');            // 5 denis added for dust
    //  app.set('view engine', 'jade');          // 6 denis comment out jade engine

    app.set('reviewsStore', reviewsStore);     //make available to the app; is this the best way?

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));


    // basic error handler
    app.use(function(err, req, res, next) {
      console.error(err.stack);
      res.send(500, 'Internal Server Error occured!');
    });  
});

app.configure('development', function(){
    app.use(express.errorHandler());
});


app.get('/', routes.index);
app.post('/reviews/:isbn([0-9]+)', routes.saveReview);



app.listen(app.get('port'));
console.log("Express server listening on port " + app.get('port'));
