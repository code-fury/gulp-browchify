/**
 * Created by duognnhu on 30/09/15.
 */
var React = require("react")
var Dummy = require("./dummy")

module.exports = React.createClass({

    render: function () {
        return <div>Hello, {this.props.name}!</div>
    }
})
