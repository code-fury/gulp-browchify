# gulp-browchify
This is an integration of gulp, browserify and watchify. 

# Example
```js
var browchify = require("gulp-browchify")
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
```

# Documentation
### browchify.watch(opts={})

#### opts.entries
##### Type: string
Glob to read

### opts.outDir
#### Type: String
Build destination 

### opts.transform
#### Type: String or Array
List of all transform for browserify

### opts.debug
#### Type: boolean
Determine whether debug messages should be printed to console or not. Default value is true.

### opts.end
#### Type: function
This function does not receive any parameters and will be called when a stream ends.
