import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sudoku Solver';

  // game board data. zero indicates 'none selected'
  sampleData: number[] =
  [8, 5, 6, 0, 1, 4, 7, 3, 0,
  0, 9, 0, 0, 0, 0, 0, 0, 0,
  2, 4, 0, 0, 0, 0, 1, 6, 0,
  0, 6, 2, 0, 5, 9, 3, 0, 0,
  0, 3, 1, 8, 0, 2, 4, 5, 0,
  0, 0, 5, 3, 4, 0, 9, 2, 0,
  0, 2, 4, 0, 0, 0, 0, 7, 3,
  0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 8, 6, 3, 0, 2, 9, 4];

  data: number[];

  constructor() {
    this.clear();
  }

  // clear the game board
  clear() {
    this.data = Array(81).fill(0);
  }

  // preset the gameboard to some sample data
  setSample() {
    this.data = this.sampleData.slice();
  }

  indexOf(x1: number, y1: number, x2: number, y2: number): number {
    return (y1 * 3 + y2) * 9 + (x1 * 3) + x2;
  }

  // handle cell tapping. Increment that cell
  tapCell(index: number) { this.data[index] = (this.data[index] + 1) % 10; }





  // solve the sudoku, if possible, and update the gameboard if a solution is found
  attack() {

    // start the search tree
    const myIdea: number[] = this.attack2(new Array());

    // if a solution was found, copy it to the game board
    if (myIdea != null) {
      this.data = myIdea;
    }
  }

  /*
   * Find a complete solution given a partial solution. Return the first complete solution found (dfs) or null if none possible.
   * Ideas are numbers to fill in to the zeroes on the game board starting with the top left.
   * In this method. Find the possible values for the next zero given existing ideas, and recurse for each.
   */
  attack2(ideas: number[]): number[] {

    // Used to count the number of zeroes in the game board
    let ideaIndex = 0;

    // Make a copy of the game board and fill in the zeroes with any ideas so far
    const myData = new Array(81);

    let headIndex = -1;

    // Make a copy of data ... and fill in the ideas
    for (let index = 0; index < 81; index++) {
      if (this.data[index] > 0 ) {
        myData[index] = this.data[index];
      } else if (ideaIndex < ideas.length ) {
        myData[index] = ideas[ideaIndex++];
      } else {
        ideaIndex++;
        myData[index] = 0;
        if (headIndex === -1) {
          headIndex = index;
        }
      }
    }

   // This cell cannot be any that exists in the block, the row or the column
   const takenByBlock = this.getTakenByBlock(myData, headIndex);
   const takenByRow = this.getTakenByRow(myData, headIndex);
   const takenByCol = this.getTakenByCol(myData, headIndex);
   const taken = takenByBlock.concat(takenByRow).concat(takenByCol);

   for (let i = 1; i < 10; i++) {
     if (!taken.includes(i)) {
       // This is the end condition - have just solved the last zero
       if (ideaIndex === ideas.length + 1) {
         myData[headIndex] = i;
         return myData;
       }
       // Recurse using the new partial result
       const search = this.attack2(ideas.concat(i));
       if (search != null) {
         // If a solution was found, return it right away
         return search;
       }
     }
   }
   return null;
  }

  // get the non-zero (taken) numbers that are in the same block as myIndex
  getTakenByBlock(idea: number[], myIndex: number): number[] {
    // which block?
    const myBlockX = Math.floor((myIndex % 9) / 3);
    const myBlockY = Math.floor(myIndex / 27);
    // what are the numbers in my block?
    return  idea.filter((value, index) => Math.floor((index % 9) / 3) === myBlockX && Math.floor(index / 27) === myBlockY);
  }

  // get the non-zero (taken) numbers that are in the same column as myIndex
  getTakenByCol(idea: number[], myIndex: number): number[] {
    // which col?
    const myX = myIndex % 9;
    // what are the numbers in my col?
    return idea.filter((value, index) => index % 9 === myX);
  }

  // get the non-zero (taken) numbers that are in the same row as myIndex
  getTakenByRow(idea: number[], myIndex: number): number[] {
    // which row?
    const myY = Math.floor(myIndex / 9) ;
    // what are the numbers in my col?
    return idea.filter((value, index) => Math.floor(index / 9) === myY);
  }
}

