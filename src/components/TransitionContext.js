import React from 'react'

// Context and HOC components for transitioning / animating 
// between static pages. This is only for PAGE transitions purposes i.e. path changes.
// See the React Context API for more info.
export const transitions = {
  enter: {
  	type: 'enter',
  	duration: 300,
  },
  exit: {
  	type: 'exit',
  	duration: 300,
  },
};

// Transition Context
export const TransitionContext = React.createContext({
  transition: transitions.enter,
  setTransition: () => {},
});

// Transition Consumer to be injected.
export const TransitionConsumer = TransitionContext.Consumer

// TransitionProvider i.e. our singleton object
export const TransitionProvider = class extends React.Component {
  constructor(props) {
    super(props)

    this.setTransition = (transition) => {
      this.setState({transition: {...this.state.transition, ...transition}})
    }

    this.state = {
      transition: {
        type: transitions.enter.type,
        path: window.location.pathname || '',
        duration: transitions.enter.duration,
        navOpen: window.history.state ? window.history.state.navOpen : true,
        prevPath: window.history.state ? window.history.state.prevPath: '',
        timeout: null,
      },
      setTransition: this.setTransition,
    }
  }

  render () {
    return (
       <TransitionContext.Provider value={this.state}>
        {this.props.children}
      </TransitionContext.Provider>
    )
  }
}

export default TransitionProvider
