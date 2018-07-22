<template>

    <div class="container-header border font-weight-bold bg-light">
        <grid-header-row
                v-for="(row, index) in rows"
                :key="index"
                :row="row"
        ></grid-header-row>
    </div>


</template>

<script>
    import GridHeaderRow from './grid-header-row.vue';

    export default {
        props: ["rows"],
        components: {
            GridHeaderRow
        },
        computed: {
            counterColumn(){
                return 0;
            },
            counterRow(){
                return 0;
            }
        }
    }
</script>


<style>

</style>