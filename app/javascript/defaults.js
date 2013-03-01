// Setting up default namespaces if they do not exist
// --------------------
// Adding console.log utilities if missing 

// reroute legacy backbone urls
//if (window.location.href.match('#!/') !== null) {
//  window.location.href = window.location.href.replace('#!/', '');
//}

function emptyFunction() { }
if (window.console === undefined) {
    window.console = {
        log: emptyFunction,
        error: emptyFunction,
        info: emptyFunction,
        trace: emptyFunction
    };
}

// Adding window.reviews namespace if missing 
if (window.reviews === undefined) {
    window.reviews={};
    window.reviews.models = {};
    window.reviews.views = {};
    window.reviews.collections = {};
    window.reviews.routers = {}; 
}
