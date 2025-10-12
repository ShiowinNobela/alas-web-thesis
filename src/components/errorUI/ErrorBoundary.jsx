import React from 'react';
import { Button } from '../ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error('Error caught by boundary:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback({
              error: this.state.error,
              errorInfo: this.state.errorInfo,
              resetError: this.resetError,
            })
          : this.props.fallback;
      }

      return (
        <div className="bg-neutral text-primary flex h-full flex-col items-center justify-center">
          <p className="mb-2 text-lg font-bold">Something went wrong</p>
          <p className="mb-4 text-center">{this.state.error && this.state.error.toString()}</p>
          <Button onClick={this.resetError}>Try Again</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
