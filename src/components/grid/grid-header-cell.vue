<template >
    <div class="col">
        {{ text }}
    </div>
</template>

<script>
    export default {
        props: ["column", "row"],
        computed: {
            text: function () {
                let { column, row } = this;
                let text = row[column.field];

                return column.require === true ? text + ' *' : text;
            }
        }
    }
</script>


