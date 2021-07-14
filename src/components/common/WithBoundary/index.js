import React from 'react';

const DefaultError = () => <h1>Something went wrong.</h1>;

const WithBoundary = (Child, OnError = null) => {
  return class index extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    componentDidCatch(error, errorInfo) {
      console.error(error, errorInfo);
      this.setState({ hasError: true });
    }
    render() {
      if (this.state.hasError) {
        return OnError ? <OnError /> : <DefaultError />;
      }
      return <Child {...this.props} />;
    }
  };
};

export default WithBoundary;
