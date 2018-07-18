<template>

        <tbody>
        <grid-body-row
                v-for="(row, index) in rows"
                :key="index"
                v-bind:row="row"
        ></grid-body-row>
        </tbody>
</template>

<script>
    import gridBodyRow from './grid-body-row.vue';

    export default {
        props: ["rows"],
        components: {
            gridBodyRow
        }
    }
</script>


<style>

</style>