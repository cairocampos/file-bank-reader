import { Line } from "./interfaces/Line";
import { Separator } from "./separator";
import { Transform } from "./transform";

export class Header extends Separator
{
  protected data: Line[] = [
    // {label: "identificacao_registro", start: 1, end: 1},
    // {label: "identificacao_arquivo_retorno", start: 1, end: 2},
    // {label: "literal_retorno", start: 3, end: 9},
    // {label: "codigo_servico", start: 10, end: 11},
    // {label: "literal_servico", start: 12, end: 26},
    // {label: "codigo_empresa", start: 27, end: 46},
    // {label: "nome_empresa", start: 47, end: 76},
    // {label: "numero_banco", start: 77, end: 79},
    // {label: "nome_banco", start: 80, end: 94},
    {label: "data_gravacao_arquivo", start: 95, end: 100, transform: Transform.localeDate}, //
    // {label: "zeros", start: 101, end: 108},
    {label: "numero_aviso_bancario", start: 109, end: 113}, //
    // {label: "branco1", start: 114, end: 379},
    {label: "data_credito", start: 380, end: 385, transform: Transform.localeDate}, //
    // {label: "branco2", start: 386, end: 394},
    // {label: "numero_sequencial_registro", start: 395, end: 400},
  ];
}