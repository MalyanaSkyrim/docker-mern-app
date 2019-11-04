import React, { Component } from "react";
import store from "./store";

const Subscrip = (InnerComponent, mapState) =>
  class extends Component {
    state = {
      ...mapState(store, this.props)
    };
    componentDidMount() {
      store.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
      store.removeChangeListener(this._onChange);
    }

    _onChange = () => {
      this.setState({
        ...mapState(store, this.props)
      });
    };

    render() {
      return (
        <InnerComponent state={this.state} {...this.props}></InnerComponent>
      );
    }
  };

export default Subscrip;
