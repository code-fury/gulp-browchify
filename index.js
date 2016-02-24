/**
 * Created by duognnhu on 30/09/15.
 */
var browserify = require("browserify")
var watchify = require("watchify")
var source = require('vinyl-source-stream')
var gulp = require("gulp")
var watch = require("gulp-watch")
var chalk = require("chalk")
var plumber = require("gulp-plumber")
/**
 *
 * @param opts entry is a vinyl
 * @returns {*}
 */
function browchify (opts) {
    opts.debug = (opts.debug !== undefined)? opts.debug : true

    var bundler = browserify({
        entries: [opts.entry.path], //initial files
        debug: opts.debug,
        cache: {}, packageCache: {}, fullPaths: true
    })

    if (opts.transform) {
        if (opts.constructor == Array) {
            opts.transform.forEach(function (tr) {
                console.log(tr)
                bundler.transform(tr, {global: true})
            })
        } else {
            bundler.transform(opts.transform, {global: true})
        }
    }
    var watcher = watchify(bundler)

    function rebundle() {
        return watcher.bundle().on('error', function (err) {
            console.error(chalk.red(err.toString('utf8')))
            if (opts.error) {
                opts.error(err.toString("utf8"))
            }
        }).on('end', function () {
            if (opts.end) {
                opts.end()
            }
        }).pipe(source(opts.entry.relative))
            .pipe(gulp.dest(opts.outDir))
    }

    watcher.on('update', function (ids) {
        console.log("updating " + ids)
        return rebundle()
    })

    return rebundle()
}

module.exports = {
    watch: function (opts) {
        return gulp.src(opts.entries)
            .pipe(watch(opts.entries, function (vinyl) {
                if (vinyl.event == "added" || vinyl.event == undefined) {
                    var w = browchify({
                        entry: vinyl,
                        outDir: opts.outDir,
                        transform: opts.transform,
                        end: opts.end,
                        error: opts.error
                    })
                    w.on('end', function () {
                        if (opts.end) {
                            opts.end()
                        }
                    }).on('error', function (err) {
                        if (opts.error) {
                            opts.error(err.toString("urf8"))
                        }
                        console.error(chalk.red(err.toString('utf8')))
                    })
                    return w
                } else {
                    console.log(vinyl.relative + " " + vinyl.event)
                }
            }))
    }
}