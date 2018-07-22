<template>

    <div class="container-footer border font-weight-bold bg-light">
        <grid-footer-row
                v-for="(row, index) in rows"
                :key="index"
                v-bind:row="row"
        ></grid-footer-row>
    </div>


</template>


<script>
    import GridFooterRow from './grid-footer-row.vue';

    export default {
        props: ["rows"],
        components: {
            GridFooterRow
        }
    }
</script>


<style>

</style>