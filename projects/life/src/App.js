import React, { Component } from 'react';
import Life from './life';
import './App.css';

/**
 * Life canvas
 */
class LifeCanvas extends Component {

  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();
  }

  componentDidMount() {
		// requestAnimationFrame(() => {this.animFrame()});
		this.animFrame();
  }

  animFrame() {
		let canvas = this.refs.canvas;
		let ctx = canvas.getContext('2d');

    // Request another animation frame
    // Update life and get cells
		let cells = this.life.getCells();
		console.log('this', this);
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);	
			// Get canvas framebuffer, a packed RGBA array
		let buffer = imageData.data;
    // Convert the cell values into white or black for the canvas
		const { width, height } = this.props;
		for (let row = 0; row < height; row++) {
			for (let col = 0; col < width; col++) {
				let index = (row * width + col) * 4;
				let color = this.life.COLORS.alive;
				if (cells[row][col] === 'dead') {
					color = this.life.COLORS.dead;
				}
				buffer[index + 0] = color[0];
				buffer[index + 1] = color[1];
				buffer[index + 2] = color[2];
				buffer[index + 3] = 0xff;
			}
		}
    // Put the new image data back on the canvas
		ctx.putImageData(imageData, 0, 0);
    // Next generation of life
		this.life.step();
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
 * Life holder component
 */
class LifeApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <LifeCanvas width={10} height={10} />
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
        <LifeApp />
      </div>
    );
  }
}

export default App;
