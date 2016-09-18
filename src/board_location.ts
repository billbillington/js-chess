export default class BoardLocation {
  private _row: number;
  private _col: number;

  constructor(row: number, col: number) {
    if (row < 0) {
      throw new Error('row must be a positive');
    }
    if (col < 0) {
      throw new Error('col must be a positive');
    }
    if (row >= this.maxRows()) {
      throw new Error('row out of bounds');
    }
    if (col >= this.maxCols()) {
      throw new Error('col out of bounds');
    }

    this._row = row;
    this._col = col;
  }

  static fromHash(hash: string): BoardLocation{
    let result = this.hashRegex().exec(hash)
    if(!result) {
     throw new Error(`format of hash '${hash}' is invalid`)
    }

    let col: number = Number(result[1]);
    let row: number = Number(result[2]);
    return new BoardLocation(row, col);
  }

  row(): number{
    return this._row;
  }

  col(): number{
    return this._col;
  }

  hash(): string{
    return `c${this.col()}r${this.row()}`;
  }

  maxRows(): number{
    return 8;
  }

  maxCols(): number{
    return 8;
  }

  static hashRegex(): RegExp{
    return /c([0-9]+)r([0-9]+)/;
  }
}
