<template>
    <tr><grid-cell
            v-bind:row="row"
    >{{ row.name }}</grid-cell></tr>
</template>

<script>
    import gridCell from './grid-cell';
    export default
    {
        props: ["row"],
        components: {
            gridCell/*: import ('./grid-cell')*/
        }
    }
</script>

<style>

</style>