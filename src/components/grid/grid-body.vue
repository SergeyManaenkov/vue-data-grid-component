<template>

        <tbody>
        <grid-body-row
                v-for="(row, index) in rows"
                :key="index"
                v-bind:row="row"
                v-bind:currentTextGroup="currentTextGroup"
        ></grid-body-row>
        </tbody>
</template>

<script>
    import gridBodyRow from './grid-body-row.vue';

    export default {
        props: ["rows"],
        data(){
            return {
                currentTextGroup: null
            }
        },
        components: {
            gridBodyRow
        }
    }
</script>


<style>

</style>