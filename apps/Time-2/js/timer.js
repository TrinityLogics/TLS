'use strict'; 
const e = React.createElement; 
class TimerDisplay extends React.Component { 
  constructor(props) { 
    super(props); 
    this.state = { complete: false }; 
  } 
 
  render() { 
    if (this.state.complete) { 
      return 'Yes I Really Like This.'; 
    } 
 
    return e( 
      'button', 
      { onClick: () => this.setState({ complete: true }) }, 
      'Like Button' 
    ); 
  } 
}

const domContainer = document.querySelector('#react-timers');
const root = ReactDOM.createRoot(domContainer)
root.render(e(TimerDisplay));