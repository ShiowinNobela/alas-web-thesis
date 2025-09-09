import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from 'flowbite-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
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
      errorInfo: null
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function' 
          ? this.props.fallback({ 
              error: this.state.error, 
              errorInfo: this.state.errorInfo, 
              resetError: this.resetError 
            })
          : this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-6 text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[300px]">
          <AlertTriangle className="w-12 h-12 mb-4" />
          <p className="mb-2 font-medium">Something went wrong</p>
          <p className="mb-4 text-sm text-center">
            {this.state.error && this.state.error.toString()}
          </p>
          <Button onClick={this.resetError} color="failure">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;