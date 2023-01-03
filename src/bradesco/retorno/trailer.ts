import { Line } from "./interfaces/Line";
import { Separator } from "./separator";
import { Transform } from "./transform";

export class Trailer extends Separator
{
    protected data: Line[] = [
      // {label: "identificacao_registro",start: 1,end: 1},
      // {label: "identificacao_registro",start: 2,end: 2},
      // {label: "identificacao_tipo_registro",start: 3,end: 4},
      // {label: "codigo_banco",start: 5,end: 7},
      // {label: "brancos1",start: 18,end: 25},
      {label: "quantidade_titulos_em_cobrancas",start: 18,end: 25, transform: Transform.number},
      {label: "valor_total_em_cobrancas",start: 26,end: 39, transform: Transform.money},
      {label: "numero_sequencial_registro",start: 395,end: 400},
    ];
}