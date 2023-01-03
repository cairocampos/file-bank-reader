import { Line } from "./interfaces/Line";
import { Separator } from "./separator";
import { Transform } from "./transform";

export class Detail extends Separator
{
  protected data: Line[] = [
    // {label: "identificacao_registro",start: 1, end: 1},
    // {label: "tipo_inscricao_empresa",start: 2, end: 3},
    // {label: "numero_inscricao_empresa",start: 4, end: 17},
    // {label: "zeros1",start: 18, end: 20},
    // {label: "identificacao_empresa_cedente",start: 21, end: 37},
    {label: "codigo_cliente", start: 38, end: 48}, // Número do controle do participante
    // {label: "zeros2",start: 63, end: 70},

    {label: "identificacao_titulo_no_banco",start: 71, end: 82}, // Numero titulo

    // {label: "uso_banco1",start: 83, end: 92},
    // {label: "uso_banco2",start: 93, end: 104},
    // {label: "indicador_rateio_credito",start: 105, end: 105},
    // {label: "zeros3",start: 106, end: 107},
    // {label: "carteira",start: 108, end: 108},
    {label: "identificacao_ocorrencia",start: 109, end: 110}, // identificação de Ocorrência
    {label: "data_ocorrencia_no_banco",start: 111, end: 116, transform: Transform.localeDate},
    {label: "numero_documento",start: 117, end: 126},
    {label: "identificacao_titulo_no_banco2",start: 127, end: 146},

    {label: "data_vencimento_titulo",start: 147, end: 152, transform: Transform.localeDate}, // data de vencimento

    {label: "valor_titulo",start: 153, end: 165, transform: Transform.money}, // valor do titulo

    // {label: "banco_cobrador",start: 166, end: 168},
    // {label: "agencia_cobradora",start: 169, end: 173},
    // {label: "especie_titulo",start: 174, end: 175},
    {label: "despesas_cobranca_para_codigos_ocorrencia",start: 176, end: 188}, //Despesas de cobrança para os códigos
    {label: "valor_outras_despesas",start: 189, end: 201, transform: Transform.money}, // Outras despesas custas de protesto
    // {label: "juros_operacao_em_atraso",start: 202, end: 214},
    // {label: "iof_devido",start: 215, end: 227},
    {label: "abatimento_concedido_sobre_titulo",start: 228, end: 240}, // Abatimento concedido sobre o titulo
    {label: "desconto_concedido",start: 241, end: 253}, // Desconco concedido

    {label: "valor_pago",start: 254, end: 266, transform: Transform.money}, // valor pago

    {label: "juros_mora",start: 267, end: 279, transform: Transform.money}, // juros mora

    // {label: "outros_creditos",start: 280, end: 292},
    // {label: "brancos1",start: 296, end: 294},
    // {label: "motivo_codigo_ocorrencia",start: 295, end: 295},

    {label: "data_credito",start: 296, end: 301, transform: Transform.localeDate},

    // {label: "brancos2",start: 302, end: 318},
    // {label: "motivos_rejeicao_ocorrencia",start: 319, end: 328},
    // {label: "brancos3",start: 329, end: 394},
    // {label: "numero_sequencial_registro",start: 395, end: 400},
  ]
}