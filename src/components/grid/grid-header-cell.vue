<template >
    <th

    >
        {{ text }}
    </th>
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


<style>

</style>