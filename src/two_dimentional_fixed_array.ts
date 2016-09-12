export default class TwoDimentionalFixedArray<T> {
  public rowCount: number;
  public colCount: number;
  data: Array<Array<T>>;

  constructor(rowCount: number, colCount: number) {
    if (rowCount <= 0) {
      throw new Error('rowCount must be a positive integer');
    }
    if (colCount <= 0) {
      throw new Error('colCount must be a positive integer');
    }
    this.colCount = colCount;
    this.rowCount = rowCount;
    this.data = this.initArray(rowCount, colCount);
  }

  set(item: T, row: number, col: number): void {
    this.validateIndexes(row, col);
    this.data[row][col] = item;
  }

  get(row: number, col: number): T {
    this.validateIndexes(row, col);
    return this.data[row][col];
  }

  remove(row: number, col: number): T {
    let removed: T = this.get(row, col);
    this.set(undefined, row, col);
    return removed;
  }

  private initArray(rows: number, cols: number): Array<Array<T>>{
    let result = new Array<Array<T>>();
    for(let row = 0; row < rows; row++) {
      result[row] = new Array<T>();
    }
    return result;
  }

  private validateIndexes(row: number, col: number): void{
    if( row < 0 || col < 0 || row >= this.rowCount || col >= this.colCount){
      throw new Error('supplied index out of bounds')
    }
  }
}
