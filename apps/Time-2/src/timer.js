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
  return <h1>Hello, world!</h1>;
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);