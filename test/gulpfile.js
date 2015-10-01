/**
 * Created by duognnhu on 30/09/15.
 */
var browchify = require("../index")
var gulp = require("gulp")
var reactify = require("reactify")

gulp.task("watch_multiple_js", function () {
    return browchify.watch({
        entries: "./js/*.js",
        outDir: "./build/",
        transform: reactify
    })
})

gulp.task("watch_single_js", function () {
    return browchify.watch({
        entries: "./js/dummy.js",
        outDir: "./build/single/",
        transform: [reactify]
    })
})