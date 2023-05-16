import { Parser } from "json2csv";
import { join, parse, extname } from "path";
import { Boleto } from "./bradesco/retorno/boleto"
import { writeFile, readdir } from 'fs/promises'
const xl = require('excel4node')

import xlsx, { IJsonSheet } from 'json-as-xlsx'

const RETORNOS_DIR = 'assets/retornos'
const PARSER_DIR = 'assets/parser'

async function* readFiles() {
  const files = await readdir(join(__dirname, RETORNOS_DIR));
  const filesFiltered = files.filter(el => extname(el).toUpperCase() === '.RET')
  for(const file of filesFiltered) {
    yield file
  }
}

const start = async () => {
  console.time()
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('Worksheet Name'); 
  const bodyHeadingColumnNames = [
    {
      label: "Código cliente",
      value: "codigo_cliente"
    },
    {
      label: "Número documento",
      value: "numero_documento"
    },
    {
      label: "Vata de vencimento",
      value: "data_vencimento_titulo"
    },
    {
      label: "Valor do titulo",
      value: "valor_titulo"
    },
    {
      label: "Data do crédito",
      value: "data_credito"
    },
    {
      label: "Juros de mora",
      value: "juros_mora"
    },
    {
      label: "Valor pago",
      value: "valor_pago"
    },
    {
      label: "Identificação do titulo no banco",
      value: "identificacao_titulo_no_banco"
    },
    {
      label: "data ocorrência no banco",
      value: "data_ocorrencia_no_banco"
    },
    {
      label: "Identificação de Ocorrência",
      value: "identificacao_ocorrencia"
    },
    {
      label: "Despesas de cobrança para códigos de ocorrência 02 - Entrada Confirmada - 28 - Débito de Tarifas",
      value: "despesas_cobranca_para_codigos_ocorrencia"
    },
    {
      label: "Outras despesas custas de protesto",
      value: "valor_outras_despesas",
    }
  ]

  //body
  ws.cell(1, 1, 1, bodyHeadingColumnNames.length, true).string('Registro Body Content');

  let bodyHeadingColumnIndex = 1;
  bodyHeadingColumnNames.forEach(heading => {
      ws.cell(2, bodyHeadingColumnIndex++)
          .string(heading.label)
  });
  

  let bodyRowIndex = 3;

  for await (const file of readFiles()) {
    console.log('[FILE]: ', file)
    const boleto = new Boleto(join(__dirname, `${RETORNOS_DIR}/${file}`));
    const data = await boleto.read()

    data.forEach( record => {
      let columnIndex = 1;
      bodyHeadingColumnNames.forEach((item:any) => {
        ws.cell(bodyRowIndex,columnIndex++)
                .string(record[item.value])
      })
      bodyRowIndex++;
    });


  }
  wb.write(join(__dirname, `${PARSER_DIR}/resultado.xlsx`));
  console.timeEnd()
}

start()