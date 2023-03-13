import { t } from 'i18next';
import React, { ErrorInfo } from 'react';
import cn from 'classnames';

import css from './index.module.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  showComponentStack?: boolean;
  invertedColors?: boolean;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className={cn(css.layout, this.props.invertedColors && css.invertedColors)}>
          <h3>{`${t('errors.somethingWentWrong')}`}</h3>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.props.showComponentStack && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
