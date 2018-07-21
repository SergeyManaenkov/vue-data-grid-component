<template>
    <th :colspan="colspan">
        <span :style="{marginLeft: indent}">{{ text }}</span>
    </th>
</template>

<script>
    import { numeral } from '../../utility';
    /*import { mapState } from 'vuex';*/

    export default {
        props: ["row", "colspan"],
        computed: {
            /*...mapState( [
                'groups'
            ] ),*/
            text() {
                let { row } = this;
                return row.title;
            },
            indent() {
                return (this.row.level * 15) + 'px';
            }
        }
    }
</script>


<style>

</style>