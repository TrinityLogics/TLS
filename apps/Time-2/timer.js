// 'use strict';

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return (
//       <button onClick={() => this.setState({ liked: true }) }>
//         Add
//       </button>
//     );
//   }
// }

// let domContainer = document.querySelector('#react-timers');
// ReactDOM.render(<LikeButton />, domContainer);

function MyApp() {
  return React.createElement(
    'h1',
    null,
    'Hello, world!'
  );
}

var container = document.getElementById('root');
var root = ReactDOM.createRoot(container);
root.render(React.createElement(MyApp, null));