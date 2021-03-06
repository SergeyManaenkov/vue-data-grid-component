require( "babel-polyfill" );
import 'es6-promise/auto'; // т.к. для VUEX нужна поддержка promise, а в IE promise неподдерживается. Подключаем библиотеку-полефил
//require( 'es6-object-assign' ).polyfill();// IE 11 не поддерживает Object.assign
/*import 'es6-map';
require( 'es6-set/implement' );*/

import { createSorting, createDataView } from "../utility"

import Vue from 'vue';
import Vuex from 'vuex';

import demoData from './demo-data';
import { getValueCell } from '../utility';

// Подключаем плагин
Vue.use( Vuex );

/* Создает экземпляр колонки */
class column {

    constructor( options = {} ) {
        let defaultOptions = {
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

        Object.assign( this, defaultOptions, options );
    }

}

/* Создает экземпляр группировки */
class group {
    constructor( options = {} ) {
        let defaultOptions = {
            field: null,
            type: 'string',// string | numeral |
            format: null,
            isOpen: true,
            sorting: {
                ignoreCase: true, // false: сортировать с учетом прописных букв | true: сортировать без учетом прописных букв
                direction: undefined // undefined: asc | -1: desc
            }
        };

        Object.assign( this, defaultOptions, options );
    }

}

/* Создает экземпляр сортировки */
class sorting {
    constructor( options = {} ) {
        let defaultOptions = {
            field: null,
            sorting: {
                ignoreCase: true,// false: сортировать с учетом прописных букв | true: сортировать без учетом прописных букв
                direction: undefined // undefined: asc | -1: desc
            }
        };

        Object.assign( this, defaultOptions, options );
    }
}

/* Создает экземпляр строки данных */
class dataItem {
    constructor( options = {} ) {
        Object.assign( this, options );
    }
}

export const store = new Vuex.Store( {
    strict: process.env.NODE_ENV !== 'production',
    state: {
        initData: demoData, /* [] */
        initDataView: {},
        groups: [
            new group( { field: 'LevelPointName' } ),
            new group( { field: 'IndicatorTitle', isOpen: true } ),
            new group( { field: 'MyRole', isOpen: true } )
        ],
        columns: [
            new column( { field: 'Code' } ),
            new column( { field: 'MyRole' } ),
            new column( { field: 'LevelPointName' } ),
            new column( { field: 'IndicatorTitle', require: true, colspan: 2 } ),
            new column( {
                field: 'PlanDateDiff', type: 'numeral', format: '0,0.[000000]'
            } )
        ],
        sortingColumns: [
            new sorting( { field: 'Code' } )
        ],
        defaultIndent: 20,
        rowsHeader: [],
        rowsBody: {},
        rowsFooter: []
    },
    getters: {
        sort: ( { sortingColumns, groups } ) => {
            let settingsSorting = (groups || []).concat( (sortingColumns || []) );

            if ( settingsSorting.length ) {
                return createSorting( settingsSorting );
            }
            return undefined;
        }
    },
    mutations: {
        setInitDataView( state, DataView ) {
            state.initDataView = DataView;
        },
        setOpenGroup( state, rowGroup ) {
            rowGroup.isOpen = !rowGroup.isOpen;
        },
        dataRowsHeader( state, dataRowsHeader = [] ) {
            state.rowsHeader = dataRowsHeader;
        },
        dataRowsBody( state, dataRowsBody = {} ) {

            Vue.set(state, 'rowsBody', dataRowsBody);
            //state.rowsBody = dataRowsBody;
        },
        dataRowsFooter( state, dataRowsFooter = [] ) {
            state.rowsFooter = dataRowsFooter;
        }
    },
    actions: {
        onSearch( { commit, state, getters }, e ) {
            let textSearch = e.target.value;
            if(!textSearch){
                commit( 'dataRowsBody', state.initDataView );
                return;
            }
            const regSearch = new RegExp( textSearch, 'i' );
            const { initData, columns, groups } = state;
            const data = initData.filter( function ( row ) {
                for ( const column of columns ) {
                    // Форматируем значение для ячейки
                    let text = getValueCell( { column, row } );
                    if ( regSearch.test( text ) ) {
                        return true;
                    }
                }
            } );

            const options = {
                data,
                sort: getters.sort,
                groups
            };

            let rowsBodySearchResult = createDataView( options );
            commit( 'dataRowsBody', rowsBodySearchResult );
        },
        getRowsHeader( { commit } ) {
            let dataRowsHeader = [
                {
                    Code: 'Header text',
                    MyRole: 'Моя роль',
                    IndicatorTitle: 'Header name',
                    LevelPointName: 'Header state',
                    PlanDateDiff: 'PlanDateDiff'
                },
                {
                    Code: 'Header text 2',
                    MyRole: 'Моя роль',
                    IndicatorTitle: 'Header name 2',
                    LevelPointName: 'Header state 2',
                    PlanDateDiff: 'PlanDateDiff 2'
                }
            ];
            setTimeout( () => {
                commit( 'dataRowsHeader', dataRowsHeader );
            }, 0 )

        },
        getRowsBody( { commit, state, getters } ) {
            setTimeout( () => {
                let { groups } = state;

                const options = {
                    data: state.initData,
                    sort: getters.sort,
                    groups
                };
                const rootGroups = createDataView( options );
                commit( 'setInitDataView', rootGroups );
                commit( 'dataRowsBody', rootGroups );
            }, 0 );

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
            }, 0 )
        }
    }

} );