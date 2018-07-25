<template>
    <div class="col border">
        {{ text }}
    </div>
</template>

<script>
    import { getValueCell } from '../../utility';

    export default {
        props: ["column", "row"],
        computed: {
            text: function () {
                let { column, row } = this;
                // Форматируем значение для ячейки
                return getValueCell( { column, row } );
            }
        }
    }
</script>


