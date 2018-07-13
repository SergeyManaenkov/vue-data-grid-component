<template>

        <tbody>
        <grid-row
                v-for="(row, index) in rows"
                :key="index"
                v-bind:row="row"
        ></grid-row>
        </tbody>
</template>

<script>
    import gridRow from './grid-row.vue';

    export default {
        props: ["rows"],
        components: {
            gridRow
        }
    }
</script>


<style>

</style>