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
  for await (const file of readFiles()) {
    console.log('[FILE]: ', file)
    const {name: filename} = parse(file)
    const boleto = new Boleto(join(__dirname, `${RETORNOS_DIR}/${file}`));
    const data = await boleto.read()

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Worksheet Name'); 

    const headingColumnNames = [
      {
        label: "Número aviso bancário",
        value:"numero_aviso_bancario"
      },
      {
        label: "Data do crédito",
        value:"data_credito"
      },
      {
        label: "Data da gravação do arquivo",
        value: "data_gravacao_arquivo"
      }
    ]

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

    const trailerHeadingColumnNames = [
      {
        label: "Quantidade de títulos em cobrança",
        value:"quantidade_titulos_em_cobrancas"
      },
      {
        label: "Valor total em cobrança",
        value:"valor_total_em_cobrancas"
      },
      {
        label: "Número sequencial do registro",
        value: "numero_sequencial_registro"
      }
    ]

    const style = wb.createStyle({
      font: {
        color: '#FF0800',
        size: 12,
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    // header
    ws.cell(1, 1, 1, 3, true).string('Registro Header Label');

    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
        ws.cell(2, headingColumnIndex++)
            .string(heading.label)
    });

    let rowIndex = 3;
    headingColumnNames.forEach((item:any) => {
      let columnIndex = 1;
      Object.keys(data.header).forEach(columnName =>{
          ws.cell(rowIndex,columnIndex++)
              .string(data.header[item.value])
      });
    })


    //body
    ws.cell(5, 1, 5, bodyHeadingColumnNames.length, true).string('Registro Body Content');

    let bodyHeadingColumnIndex = 1;
    bodyHeadingColumnNames.forEach(heading => {
        ws.cell(6, bodyHeadingColumnIndex++)
            .string(heading.label)
    });

    let bodyRowIndex = 7;
    data.body.forEach( record => {
      let columnIndex = 1;
      bodyHeadingColumnNames.forEach((item:any) => {
        ws.cell(bodyRowIndex,columnIndex++)
                .string(record[item.value])
      })
      bodyRowIndex++;
    });

    // footer

    const teste = bodyRowIndex + 2
    ws.cell(teste, 1, teste, 3, true).string('Registro Trailler');

    let footerColumnIndex = 1;
    trailerHeadingColumnNames.forEach(heading => {
        ws.cell(teste + 1, footerColumnIndex++)
            .string(heading.label)
    });

    let footerRowIndex = teste + 2;
    let footerColumnIndexT = 1;
    trailerHeadingColumnNames.forEach((item:any) => {
      ws.cell(footerRowIndex,footerColumnIndexT++)
        .string(data.trailer[item.value])
    })

    // header

    // let rowIndex = 3;
    // headingColumnNames.forEach((item:any) => {
    //   let columnIndex = 1;
    //   Object.keys(data.header).forEach(columnName =>{
    //       ws.cell(rowIndex,columnIndex++)
    //           .string(data.header[item.value])
    //   });
    // })


    wb.write(join(__dirname, `${PARSER_DIR}/${file}.xlsx`));

    // xlsx(excelData, {
    //   fileName: join(__dirname, `${PARSER_DIR}/${filename}`), // Name of the resulting spreadsheet
    //   extraLength: 3, // A bigger number means that columns will be wider
    //   writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    //   writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
    //   RTL: true, // Display the columns from right-to-left (the default value is false)
    // })
  }
  console.timeEnd()
}

start()

// var wb = new xl.Workbook();

// // Add Worksheets to the workbook
// var ws = wb.addWorksheet('Sheet 1');
// var ws2 = wb.addWorksheet('Sheet 2');

// var style = wb.createStyle({
//   font: {
//     color: '#FF0800',
//     size: 12,
//   },
//   numberFormat: '$#,##0.00; ($#,##0.00); -',
// });

// // Set value of cell A1 to 100 as a number type styled with paramaters of style
// ws.cell(1, 1)
//   .number(100)
//   .style(style);

// // Set value of cell B1 to 200 as a number type styled with paramaters of style
// ws.cell(1, 2)
//   .number(200)
//   .style(style);

// // Set value of cell C1 to a formula styled with paramaters of style
// ws.cell(1, 3)
//   .formula('A1 + B1')
//   .style(style);

// // Set value of cell A2 to 'string' styled with paramaters of style
// ws.cell(2, 1)
//   .string('string')
//   .style(style);

// // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
// ws.cell(3, 1)
//   .bool(true)
//   .style(style)
//   .style({font: {size: 14}});

// ws.cell(4, 1, 4, 3, true)
// .string('Testando')
// .style(style)

// wb.write('Excel.xlsx');