<template>
        <tbody>
        <grid-body-row
                v-for="(groupData, key, index) in rows"
                :key="index"
                v-bind:groupData="groupData"
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