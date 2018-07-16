<template>
    <td>
        {{ text }}
    </td>
</template>

<script>
    import { numeral } from './grid-formatting';

    export default {
        props: ["column", "row"],
        computed: {
            text: function () {
                let { column, row } = this;

                switch ( column.type ) {
                    case 'numeral':
                        let num = numeral(row[column.field]);
                        return num.format(column.format);
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