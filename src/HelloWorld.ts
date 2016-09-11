export default class HelloWorld {
  name: string;

  constructor(name: string){
    this.name = name;
  }

  message() {
    return "Hello! " + this.name;
  }
}
