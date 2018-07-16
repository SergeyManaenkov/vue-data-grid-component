import 'es6-promise/auto'; // т.к. для VUEX нужна поддержка promise, а в IE promise неподдерживается. Подключаем библиотеку-полефил
require( 'es6-object-assign' ).polyfill();// IE 11 не поддерживает Object.assign

import { createSorting } from "../utility"

import Vue from 'vue';
import Vuex from 'vuex';

// Подключаем плагин
Vue.use( Vuex );

/* Создает экземпляр колонки */
function column( options = {} ) {
    this.defaultOptions = {
        field: null,
        type: 'string',// string | numeral |
        require: false,
        format: null,
        /*sorting: {
            ignoreCase: true,// false: сортировать с учетом прописных букв | true: сортировать без учетом прописных букв
            direction: undefined // undefined: asc | -1: desc
        },*/
        rowspan: 1,
        colspan: 1
    };

    return Object.assign( this.defaultOptions, options );
}

/* Создает экземпляр группировки */
function grouping( options = {} ) {
    this.defaultOptions = {
        field: null,
        type: 'string',// string | numeral |
        format: null,
        sorting: {
            ignoreCase: true, // false: сортировать с учетом прописных букв | true: сортировать без учетом прописных букв
            direction: undefined // undefined: asc | -1: desc
        }
    };

    return Object.assign( this.defaultOptions, options );
}

export const store = new Vuex.Store( {
    strict: process.env.NODE_ENV !== 'production',
    state: {
        groupings: [
            new grouping( { field: 'text' } )
        ],
        columns: [
            new column( { field: 'text' } ),
            new column( { field: 'name', require: true, colspan: 2 } ),
            new column( { field: 'state' } ),
            new column( {
                field: 'amount', type: 'numeral', format: '0,0.[000000]'
            } )
        ],
        rowsHeader: [],
        rowsBody: [],
        rowsFooter: []
    },
    getters: {},
    mutations: {
        dataRowsHeader( state, dataRowsHeader = [] ) {
            state.rowsHeader = dataRowsHeader;
        },
        dataRowsBody( state, dataRowsBody = [] ) {
            state.rowsBody = dataRowsBody;
        },
        dataRowsFooter( state, dataRowsFooter = [] ) {
            state.rowsFooter = dataRowsFooter;
        }
    },
    actions: {
        getRowsHeader( { commit } ) {
            let dataRowsHeader = [
                {
                    text: 'Header text',
                    name: 'Header name',
                    state: 'Header state'
                },
                {
                    text: 'Header text 2',
                    name: 'Header name 2',
                    state: 'Header state 2'
                }
            ];
            setTimeout( () => {
                commit( 'dataRowsHeader', dataRowsHeader );
            }, 0 )

        },
        getRowsBody( { commit, state } ) {
            debugger;
            const { groupings, columns } = state;
            let dataRowsBody = [

                {
                    text: 'a',
                    name: 'td name 1',
                    state: 'тест state 1',
                    amount: 1234567890.987654321
                },
                {
                    text: '1',
                    name: '3',
                    state: 'тест state 2',
                    amount: 2
                },
                {
                    text: '1',
                    name: '2',
                    state: 'тест state 2',
                    amount: 2
                },
                {
                    text: '1',
                    name: '3',
                    state: 'тест state 2',
                    amount: 0
                },
                {
                    text: '1',
                    name: 'null',
                    state: 'тест state 2',
                    amount: null
                }
            ];

            let _sortings = groupings || [];
            for ( const column of columns ) {
                if ( column.sorting ) {
                    _sortings.push( column );
                }
            }

            setTimeout( () => {
                if ( _sortings.length ) {
                    dataRowsBody = (dataRowsBody.slice( 0 ).sort( createSorting( _sortings ) ));
                }

                commit( 'dataRowsBody', dataRowsBody );
            }, 1000 );

        },
        getRowsFooter( { commit } ) {
            let dataRowsFooter = [
                {
                    text: 'Footer 1',
                    name: 'Footer 1',
                    state: 'Footer 1'
                }
            ];
            setTimeout( () => {
                commit( 'dataRowsFooter', dataRowsFooter );
            }, 3000 )
        }
    }

} );