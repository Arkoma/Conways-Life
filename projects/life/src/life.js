/**
 * Implemention of a Life
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
  constructor(width, height) {
    this.width = width;
    this.height = height;
		this.currentBufferIndex = 0;
		this.cells = [
			Array2D(width, height),
			Array2D(width, height)
		]
		this.randomize();

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
   * Clear the cca grid
   */
  clear() {
		// const choice = Math.floor(Math.random() * 2);
		// let current = this.cells[this.currentBufferIndex]
		// for (let row = 0; row < this.height; row++) {
		//  for (let col = 0; col < this.width; col++) {
		//		current[row][col] = choice;
		//	}
		// }
		
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
		let buffer = this.cells[this.currentBufferIndex];
		for (let row = 0; row < this.height; row++) {
       for (let col = 0; col < this.width; col++) {
				 buffer[row][col] = Math.floor(Math.random() * 2) | 0;
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

		function countNeigbors(row, col) {
			let livingNeighbors = 0;

			// northwest
			if (row > 0 && col > 0) {
				if (currentBuffer[row - 1][col - 1] === 1) {
					livingNeighbors++;
				}
			}
				
			// north
			if (row > 0) {
				if (currentBuffer[row - 1][col] === 1) {
					livingNeighbors++;
				}
			}

			// northeast
			if (row > 0 && col < this.width - 1) {
				if (currentBuffer[row - 1][col + 1] === 1) {
					livingNeighbors++;
				}
			}
			
			// east
			if (col < this.width - 1) {
				if (currentBuffer[row][col + 1] === 1) {
					livingNeighbors++;
				}
			}
			
			// southeast
			if (row < this.height - 1 && col < this.width - 1) {
				if (currentBuffer[row + 1][col + 1] === 1) {
					livingNeighbors++;
				}
			}
			
			// south
			if (row < this.height - 1) {
				if (currentBuffer[row + 1][col] === 1) {
					livingNeighbors++;
				}
			}
			
			// southwest
			if (row < this.height - 1 && col > 0)  {
				if (currentBuffer[row + 1][col - 1] === 1) {
					livingNeighbors++;
				}
			}
			
			// west
			if (col > 0) {
				if (currentBuffer[row][col - 1] === 1) {
					livingNeighbors++;
				}
			}
			return livingNeighbors;
		}
		
		for (let row = 0; row < this.height; row++) {
       for (let col = 0; col < this.width; col++) {
				 const totalNeighbors = countNeigbors.call(this, row, col);

				 if (currentBuffer[row][col] === 1) {
					 if (totalNeighbors < 2 || totalNeighbors > 3) {
							backBuffer[row][col] = 0;
					 } else {
						 backBuffer[row][col] = currentBuffer[row][col];
					 }
				 } else {
					 if (totalNeighbors === 3){
						 backBuffer[row][col] = 1;
					 } else {
						 backBuffer[row][col] = currentBuffer[row][col];
					 }
				 }
				 
			}
			this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
		}
	} 
}

export default Life;
