<template>
    <div class="col">
        {{ text }}
    </div>
</template>

<script>
    //import { numeral } from 'grid-formatting';
    let numeral = require('numeral');
    require('numeral/locales/ru');
    numeral.locale('ru');


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
                }

                return row[column.field];
            }
        }
    }
</script>


<style>

</style>