import { join } from 'path'
import { readFile } from 'fs/promises'
import { Header } from './header'
import { Detail } from './detail'
import { Trailer } from './trailer'

type Result = {
  header: any
  trailer: any
  body: any[]
}

export class Boleto {
  constructor(
    private file: string
  ){}

  async read() {
    const lines = (await readFile(this.file)).toString().split('\n');
    const result: Result = {
      header: {},
      trailer: {},
      body: []
    };
    const numLines = lines.length - 1;
    const header = lines[0] as string;

    const trailer = lines[numLines - 1] as string;
    result.header = (new Header(header)).process();
    for(let index = 1; index < (numLines - 1); index++) {
      const data = (new Detail(lines[index])).process();
      result.body.push(data)
    }

    result.trailer = (new Trailer(trailer)).process();
    // return result;
    return result.body;
  }
}