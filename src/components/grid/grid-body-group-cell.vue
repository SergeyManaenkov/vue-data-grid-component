<template>
    <div class="col">
        <span
                class="grid-cell"
                @click="setOpenGroup(row)"
        >[{{ isOpen ? '-' : '+' }}]</span>
        <span class="badge badge-secondary badge-pill">{{ count }}</span>
        {{ text }}
    </div>
</template>

<script>
    import { numeral } from '../../utility';
    import { mapActions } from 'vuex';

    export default {
        props: ["row"],
        computed: {
            text() {
                let { row } = this;
                return row.title;
            },
            count() {
                debugger;
                if ( this.row.childs && this.row.childs.length ) {
                    return this.row.childs.length;
                } else if ( this.row.childGroups ) {
                    let parentCount = 0;
                    for ( const key in this.row.childGroups ) {
                        let childGroup = this.row.childGroups[key];
                        parentCount += childGroup.childs.length;
                    }
                    return parentCount;
                }
            },
            isOpen() {
                return this.row.isOpen;
            }
        },
        methods: {
            ...mapActions( [
                'setOpenGroup',
                'setCountGroup'
            ] )
        }
    }
</script>


<style scoped>
    .grid-cell {
        cursor: pointer;
    }
</style>