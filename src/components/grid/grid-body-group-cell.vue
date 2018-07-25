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
                if ( this.row.childs && this.row.childs.length ) {
                    return this.row.childs.length;
                }
            },
            isOpen() {
                return this.row.isOpen;
            }
        },
        methods: {
            ...mapActions( [
                'setOpenGroup'
            ] )
        }
    }
</script>


<style scoped>
    .grid-cell {
        cursor: pointer;
    }
    .col{
        padding-right: 0px;
        padding-left: 0px;
    }
</style>