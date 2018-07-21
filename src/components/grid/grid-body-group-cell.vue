<template>
    <div class="col" :colspan="colspan">
        <span :style="{marginLeft: indent}">{{ text }}</span>
    </div>
</template>

<script>
    import { numeral } from '../../utility';
    import { mapState } from 'vuex';

    export default {
        props: ["row", "colspan"],
        computed: {
            ...mapState( [
                'defaultIndent'
            ] ),
            text() {
                let { row } = this;
                return row.title;
            },
            indent() {
                return (this.row.level * this.defaultIndent) + 'px';
            }
        }
    }
</script>


<style>

</style>