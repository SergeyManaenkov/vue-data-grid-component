let numeral = require( 'numeral' );
require( 'numeral/locales/ru' );
numeral.locale( 'ru' );

export const getValueCell = function ( options ) {
    let { column, row } = options;
    // Форматируем текст для ячейки
    switch ( column.type ) {
        case 'numeral':
            if ( row[column.field] == null || row[column.field] == undefined ) {
                return '';
            }
            let num = numeral( row[column.field] );
            return num.format( column.format );
            break;
        default:
            return row[column.field];
            break;
    }

};
