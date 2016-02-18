/**
 * Created by duognnhu on 30/09/15.
 */
var browserify = require("browserify")
var watchify = require("watchify")
var source = require('vinyl-source-stream')
var gulp = require("gulp")
var watch = require("gulp-watch")

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
        return watcher.bundle()
            .pipe(source(opts.entry.relative))
            .pipe(gulp.dest(opts.outDir))
    }

    watcher.on('update', function (ids) {
        console.log("updating " + ids)
        rebundle()
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
                        transform: opts.transform
                    })
                    w.on('end', function () {
                        if (opts.end) {
                            opts.end()
                        }
                    })
                    return w
                } else {
                    console.log(vinyl.relative + " " + vinyl.event)
                }
            }))
    }
}