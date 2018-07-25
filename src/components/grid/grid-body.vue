<template>

    <div class="container-body border bg-light">
        <grid-body-group-row
                v-for="(rowGroupObj) in rows"
                :row="rowGroupObj"
        ></grid-body-group-row>
    </div>

</template>

<script>
    import GridBodyGroupRow from './grid-body-group-row.vue';

    export default {
        props: ["rows"],
        components: {
            GridBodyGroupRow
        }
    }
</script>

