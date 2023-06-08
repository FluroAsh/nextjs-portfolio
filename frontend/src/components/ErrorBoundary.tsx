import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  fallback?: ReactNode
  children: ReactNode // remove the Readonly type
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDervedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("error caught by error boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
      // return (
      //   <div>
      //     <h2>Oops, there is an error!</h2>
      //     <button
      //       type="button"
      //       onClick={() => this.setState({ hasError: false })}
      //     >
      //       Try again?
      //     </button>
      //   </div>
      // )
    }

    return this.props.children
  }
}

export default ErrorBoundary
