import 'es6-promise/auto'; // т.к. для VUEX нужна поддержка promise, а в IE promise неподдерживается. Подключаем библиотеку-полефил
require( 'es6-object-assign' ).polyfill();// IE 11 не поддерживает Object.assign
import 'es6-map';

require( 'es6-set/implement' );

import { createSorting } from "../utility"

import Vue from 'vue';
import Vuex from 'vuex';

import demoData from './demo-data';

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

/* Создает экземпляр строки данных */
class dataItemGroup {
    constructor( options = {} ) {
        const o = options;
        this.title = o.title, // String
            this.isGroup = true, // Boolean
            this.parent = o.parent || null, // dataItemGroup
            this.groupChilds = new Map(), // Map
            this.childs = [] // Array
    }
}


export const store = new Vuex.Store( {
    strict: process.env.NODE_ENV !== 'production',
    state: {
        groups: [
            new group( { field: 'MyRole' } ),
            new group( { field: 'LevelPointName' } ),
            new group( { field: 'IndicatorTitle' } )
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
        rowsHeader: [],
        rowsBody: [],
        rowsFooter: []
    },
    getters: {
        createSort: ( { sortingColumns, groups } ) => {
            let settingsSorting = (groups || []).concat( (sortingColumns || []) );

            if ( settingsSorting.length ) {
                return createSorting( settingsSorting );
            }
            return undefined;
        }
    },
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
                    Code: 'Header text',
                    IndicatorTitle: 'Header name',
                    LevelPointName: 'Header state',
                    PlanDateDiff: 'PlanDateDiff'
                },
                {
                    Code: 'Header text 2',
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
            let dataRowsBody = demoData;

            setTimeout( () => {
                // Сортируем данные
                const sortDataRowsBody = dataRowsBody.slice( 0 ).sort( getters.createSort );

                //const groupMap = new Map();
                const roots = {};
                let { groups } = state;

                for ( let dataRow of sortDataRowsBody ) {
                    let keyGroup = getKeyGroup( dataRow );
                    let root = roots[keyGroup];
                    if ( !root ) {
                        root = roots[keyGroup] = {
                            childs: []
                        };
                        groups.reduce( function ( r, group ) {
                            r.groups = r.groups || [];
                            r.groups.push({
                                title: dataRow[group.field]
                            });

                            return r;
                        } , root);
                    }
                    root.childs.push( dataRow );
                }

                function getKeyGroup( dataRow ) {
                    let concatTitleGroup;
                    concatTitleGroup = groups.reduce( function ( st, group ) {
                        st += dataRow[group.field];
                        return st;
                    }, '' );
                    return concatTitleGroup;
                }


                debugger;
                //commit( 'dataRowsBody', sortDataRowsBody );
                commit( 'dataRowsBody', roots );
            }, 50 );

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
            }, 2000 )
        }
    }

} );