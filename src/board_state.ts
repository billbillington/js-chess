import  * as _ from 'lodash'
import { default as Piece } from './piece'
import { default as BoardLocation } from './board_location'

export default class BoardState {
  private data: any;

  constructor(){
    this.data = {};
  }

  add(piece: Piece, location: BoardLocation): void {
    let hash: string = location.hash();
    if(this.data[hash]){
      throw new Error('attempt to set occupied location');
    }

    this.data[hash] = piece;
  }

  remove(piece: Piece, location: BoardLocation): void {
    let pieceAtLocation = this.get(location);
    if(piece !== pieceAtLocation){
      throw new Error(
        `attempt to remove incorect piece from location ${location.hash()}`
      )
    }


  }

  get(location: BoardLocation): Piece {
    return <Piece>this.data[location.hash()];
  }

  getLocation(piece: Piece): BoardLocation {
    let hash: string;
    let keys = _.keys(this.data);
    for(let i = 0; i < keys.length; i++){
      let currentKey = keys[i];
      if( this.data[currentKey] == piece){
        hash = currentKey;
        break;
      }
    }

    if(hash) {
      return BoardLocation.fromHash(hash);
    } else {
      return undefined;
    }
  }
}
