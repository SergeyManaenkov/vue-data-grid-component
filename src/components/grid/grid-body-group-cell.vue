<template>
    <div class="col"
         :colspan="colspan">
        <span :style="{marginLeft: indent}">
            <span
                    class="grid-cell"
                    @click="setOpenGroup(row)"
            >[{{ isOpen ? '-' : '+' }}]</span>
            {{ text }}
        </span>
    </div>
</template>

<script>
    import { numeral } from '../../utility';
    import { mapState, mapActions } from 'vuex';

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
            },
            isOpen() {
                return this.row.isOpen;
            }
        },
        methods: {
            ...mapActions([
                'setOpenGroup'
            ])
        }
    }
</script>


<style scoped>
    .grid-cell {
        cursor: pointer;
    }
</style>