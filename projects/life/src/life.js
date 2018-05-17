/**
 * Implementation of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {

  /**
   * Constructor
   */
  constructor(width, height, cells) {
		this.width = width;
		this.height = height;
		this.currentBufferIndex = 0;
		this.cells = [
			Array2D(width, height),
			Array2D(width, height)
		]
		this.randomize();
		this.COLORS = {
			'alive': [0, 0, 0],
			'dead' : [0xff, 0xff, 0xff]
		}
		this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
		return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
		let buffer = this.cells[this.currentBufferIndex];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[row][col] = 'alive';
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
		let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[backBufferIndex];

    function hasToDie(row, col) {
      const w = this.width;
      const h = this.height;
      const nextValue = currentBuffer[row][col];
			// console.log({ nextValue, currentBuffer, row, col });

      const neighbors = [];

			if (col > 0 && row > 0 && col < w - 1 && row < h - 1) {
				console.log({ row, col });
				const upperLeft = currentBuffer[row -1][col - 1];
				neighbors.push(upperLeft);
				const left = currentBuffer[row][col - 1];
				neighbors.push(left);
				const upperRight = currentBuffer[row -1][col + 1];
				neighbors.push(upperRight);
				const upperMid = currentBuffer[row -1][col];
				neighbors.push(upperMid);
				const lowerRight = currentBuffer[row + 1][col + 1];
				neighbors.push(lowerRight);
				const lowerMid = currentBuffer[row + 1][col];
				neighbors.push(lowerMid);
				const lowerLeft = currentBuffer[row + 1][col -1];
				neighbors.push(lowerLeft);
				const right = currentBuffer[row][col + 1];
				neighbors.push(right);
			}	else if (col === 0 || row === 0 || col >= w - 1 || row >= h - 1) {
				const upperLeft = 'dead';
				neighbors.push(upperLeft);
				const left = 'dead';
				neighbors.push(left);
				const upperRight = 'dead';
				neighbors.push(upperRight);
				const upperMid = 'dead';
				neighbors.push(upperMid);
				const lowerRight = 'dead';
				neighbors.push(lowerRight);
				const lowerMid = 'dead';
				neighbors.push(lowerMid);
				const lowerLeft = 'dead';
				neighbors.push(lowerLeft);
				const right = 'dead';
				neighbors.push(right);
			}

			let aliveCounter = 0;
      for (let neighbor of neighbors) {
				if (neighbor === 'alive') aliveCounter++;
        console.log('neighbor', neighbor);
      }
			if (nextValue === 'alive') {
				if (aliveCounter < 2) {
					return true;
				} else if (aliveCounter === 2 || aliveCounter === 3) {
					return false;
				} else if (aliveCounter > 3) {
					return true;
				} else {
					return false;
				}
			}
			if (nextValue === 'dead') {
				if (aliveCounter === 3) {
					return false;
				} else {
					return true;
				}
			}
			return false;
		}
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (hasToDie.call(this, row, col)) {
					backBuffer[row][col] = 'dead';
        } else {
					backBuffer[row][col] = 'alive';
        }
      }
   }
   this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
	
  }
}

export default Life;
