import React, { Component } from "react";
var Cookies = require("js-cookie");

export default class MemoryFoam extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
    this.state = this.getMyShizzle();
  }

  componentDidMount() {
    this.storeMe();
    const that = this;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        that.storeMe();
      });
    });

    var config = {
      attributes: true
    };
    observer.observe(this.myInput.current, config);
  }
  componentDidUpdate() {
    this.storeMe();
  }

  convertCookieToJSON(cookie) {
    var output = {};
    if (typeof cookie === "undefined") return {};
    cookie.split(/\s*;\s*/).forEach(function(pair) {
      pair = pair.split(/\s*=\s*/);
      output[pair[0]] = pair.splice(1).join("=");
    });
    var json = JSON.stringify(output, null, 4);
    return JSON.parse(json);
  }

  getMyShizzle() {
    const cookie = this.convertCookieToJSON(this.props.cookies);
    const w = cookie[`mf-w-${this.props.id}`];
    const h = cookie[`mf-h-${this.props.id}`];
    return {
      styles: {
        backgroundColor: "red",
        display: "block",
        width: w + "px",
        height: h + "px"
      }
    };
  }

  storeMe() {
    const w = this.myInput.current.offsetWidth;
    const h = this.myInput.current.offsetHeight;

    if (w > 0 && h > 0) {
      Cookies.set(`mf-w-${this.props.id}`, w);
      Cookies.set(`mf-h-${this.props.id}`, h);
    }
  }

  render() {
    const { styles } = this.state;
    return (
      <span ref={this.myInput} style={styles}>
        {this.props.children}
      </span>
    );
  }
}
