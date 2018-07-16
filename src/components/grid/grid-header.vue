<template>
    <thead class="thead-default">
    <grid-header-row
            v-for="(row, index) in rows"
            :key="index"
            v-bind:row="row"
            :attr="counterColumn"
    ></grid-header-row>
    </thead>
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