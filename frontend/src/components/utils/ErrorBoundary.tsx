import { Component, ReactNode } from "react"
import ErrorDisplay from "./ErrorDisplay"

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError)
            return <ErrorDisplay message="Something went wrong. Please refresh the page." />
        return this.props.children
    }
}
