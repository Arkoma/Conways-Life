import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f],
]

/**
 * CCA canvas
 */
class CCACanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
		this.cca = new CCA(props.width, props.height);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
		this.animFrame();
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
		let cells = this.cca.getCells();
		let canvas = this.refs.canvas
		let ctx = canvas.getContext('2d');

		const { width, height } = this.props;

		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, width, height);

		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		let buffer = imageData.data;

		for (let row = 0; row < height; row++) {
			for (let col = 0; col < width; col++) {
				let index = (row * width + col) * 4;

				let currentNumber = cells[row][col];
				
				buffer[index + 0] = COLORS[currentNumber][0];
				buffer[index + 1] = COLORS[currentNumber][1];
				buffer[index + 2] = COLORS[currentNumber][2];
				buffer[index + 3] = 0xff;
				
			}
		}

		ctx.putImageData(imageData, 0, 0);
		
		this.cca.step();
	  requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Render
   */
	render() {
		return <canvas ref="canvas" width={this.props.width} height={this.props.height} />

  }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={800} height={600} />
      </div>
    )
  }
}

/**
 * Outer App component
 */
class App extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <CCAApp />
      </div>
    );
  }
}

export default App;
