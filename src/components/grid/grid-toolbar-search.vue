<template>
    <div class="form-group">
        <input
                class="form-control form-control-sm"
                type="text"
                placeholder="Введите текст для поиска"
                @keyup.enter="onSearch($event)"
        >
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        methods: {
            ...mapActions([
                'onSearch'
            ])
        }
    }
</script>

<style scoped>

</style>
