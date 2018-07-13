import Vue from 'vue';
import Vuex from 'vuex';

// Подключаем плагин
Vue.use( Vuex );

export const store = new Vuex.Store( {
    strict: process.env.NODE_ENV !== 'production',
    state: {
        rowsHeader: [
            {
                text: 'Header 1',
                name: 'Header 1',
                state: 'Header 1'
            }
        ],
        rowsBody: [
            {
                text: 'td 1',
                name: 'td 1',
                state: 'тест 1'
            },
            {
                text: 'td 2',
                name: 'td 2',
                state: 'тест 2'
            }
        ],
        rowsFooter: [
            {
                text: 'Footer 1',
                name: 'Footer 1',
                state: 'Footer 1'
            }
        ]
    },
    getters: {

    },
    mutations: {},
    actions: {}

} );