import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import {
  TransitionConsumer,
  transitions,
} from '../components/TransitionContext'

/*
 * TransitionLink is a HOC component that triggers
 * changes in the transition context i.e. from entering to exiting
 * before navigations to new pages.
 */
const TransitionLink = class extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    let { to, setTransition, transition, timeout } = this.props

    if (typeof setTransition !== 'function') {
      return
    }
    if (to === window.location.pathname) {
      return
    }

    // Setup a timeout before triggering exiting transitions.
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      navigate(to, {
        state: {
          navOpen: transition.navOpen,
          prevPath: transition.path,
        },
      })
    }, transitions.exit.duration)

    setTransition({
      type: transitions.exit.type,
      path: to,
      duration: transitions.exit.duration,
      timeout: timeout,
    })
  }

  render() {
    let { to, className } = this.props

    // Only render valid internal links
    if (to === '') {
      return null
    }

    return (
      <div
        className={className}
        data-to={to}
        onMouseOver={this.handleClick}
        role="link"
        tabIndex="0"
      >
        {this.props.children}
      </div>
    )
  }
}

TransitionLink.defaultProps = {
  duration: 0,
  to: '',
  timeout: null,
}

TransitionLink.propTypes = {
  duration: PropTypes.number,
  to: PropTypes.string,
}

/* Wrap our link in a consumer and pass down context as props. */
const ConnectedTransitionLink = props => {
  return (
    <TransitionConsumer>
      {({ transition, setTransition }) => (
        <TransitionLink
          {...props}
          setTransition={setTransition}
          transition={transition}
        />
      )}
    </TransitionConsumer>
  )
}

export default ConnectedTransitionLink
