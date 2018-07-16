import Vue from 'vue';
import App from './App.vue';

import { store } from './store/'

new Vue( {
    el: '#app',
    store,
    render: h => h( App ),
    viewName: 'Можно так передать параметры для компанента'
} );
