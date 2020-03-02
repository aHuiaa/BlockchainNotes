function route(handle, pathname, body) {

    if (typeof handle[pathname] === "function") {
        return handle[pathname](body);
    } else {
        console.log("No request handler found for " + pathname);
        return "404 Not found";
    }
}

exports.route = route;