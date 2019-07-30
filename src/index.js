import React, { Component } from "react";
import localforage from "localforage";

export default class MemoryFoam extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }

  componentDidMount() {
    const w = this.myInput.current.offsetWidth;
    const h = this.myInput.current.offsetHeight;
    if (w === 0 && h === 0) {
      localforage.getItem(`mf-${this.props.id}`, function(err, value) {
        this.setState({ w: value.dims.w, h: value.dims.h });
      });
    } else {
      this.setState({ w, h });
    }
  }
  storeMe = () => {
    const w = this.myInput.current.offsetWidth;
    const h = this.myInput.current.offsetHeight;
    localforage.setItem(`mf-${this.props.id}`, { dims: { w, h } }, function(
      err
    ) {});
  };

  render() {
    const { w, h } = this.state;
    return (
      <div ref={this.myInput} style={{ width: w + "px", height: h + "px" }}>
        this.props.children
      </div>
    );
  }
}
