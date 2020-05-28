const excel = require('excel4node');

class excel_writer {
    constructor () {
        this.workbook = new excel.Workbook();
        this.style = this.workbook.createStyle({
            font: {
                size: 12
            },
            alignment: {
                horizontal: 'right',
            },
        })
    }

    add_worksheet (name, data) {
        let worksheet = this.workbook.addWorksheet(name);
        worksheet.cell(1, 1).string("Date").style(this.style)
        worksheet.cell(2, 1).date(new Date()).style({ font: {size: 12}, numberFormat: 'yyyy.mm.dd' })
        Object.entries(data).map((val, idx) => {
            worksheet.cell(1, idx + 2).string(val[0]).style(this.style)
            worksheet.cell(2, idx + 2).number(val[1]).style(this.style)
        })  
    }
    
    write () {
        this.workbook.write('Excel.xlsx');
    }
}

module.exports = excel_writer