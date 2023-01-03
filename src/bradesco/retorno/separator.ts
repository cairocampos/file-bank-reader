import { Line } from "./interfaces/Line";

export class Separator {
  protected data: Line[] = [];
  constructor(
    private line:string
  ){}

  process() {
    const result: any = {};
    this.data.forEach(data => {
      const valor = this.line.substring(data.start - 1, data.end).trim();
      if(data.transform) {
        const transform = data.transform(valor)
          result[data.label] = transform
      } else {
        result[data.label] = valor
      }
    });

    return result;
  }
}
