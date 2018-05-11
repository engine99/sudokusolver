import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sudoku Solver';
  data = [0,0,0,0,0,0,0,0,0]; // row-major ordering of 9
  
  tapCell(index : int) { this.data[index]++; }
}
