<template>
    <div class="col border">
        {{ text }}
    </div>
</template>

<script>
    import { numeral } from '../../utility';

    export default {
        props: ["column", "row"],
        computed: {
            text: function () {
                let { column, row } = this;
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

            }
        }
    }
</script>


<style>

</style>