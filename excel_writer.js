const excel = require('excel4node');

function to_excel(dict) {
    const workbook = new excel.Workbook();
    const style = workbook.createStyle({
        font: {
            size: 12
        },
        alignment: {
            horizontal: 'right',
        },
    })
    let worksheet = workbook.addWorksheet('Sheet 1');
    worksheet.cell(1, 1).string("Date").style(style)
    worksheet.cell(2, 1).date(new Date()).style({ font: {size: 12}, numberFormat: 'yyyy.mm.dd' })
    Object.entries(dict).map((val, idx) => {
        worksheet.cell(1, idx + 2).string(val[0]).style(style)
        worksheet.cell(2, idx + 2).number(val[1]).style(style)
    })  
    workbook.write('Excel.xlsx');
}

module.exports = {
    to_excel: (dict) => to_excel(dict)
}