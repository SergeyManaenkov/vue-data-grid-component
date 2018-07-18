import 'es6-promise/auto'; // т.к. для VUEX нужна поддержка promise, а в IE promise неподдерживается. Подключаем библиотеку-полефил
require( 'es6-object-assign' ).polyfill();// IE 11 не поддерживает Object.assign

import { createSorting } from "../utility"

import Vue from 'vue';
import Vuex from 'vuex';

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

class dataItem {
    constructor( data ) {
        this.item = data;
    }

}

class dataItemGroup {
    constructor( title, group ) {
        this.title = title;
        this.group = group;
        this.items = [];
        this.LevelItem = 0;
        this.isGroup = true;
    }

}

export const store = new Vuex.Store( {
    strict: process.env.NODE_ENV !== 'production',
    state: {
        groups: [
            new group( { field: 'text' } )
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
        rowsFooter: [],
        getSettingsSorting: ( { groups, columns } ) => {
            let settingsSorting = groups || [];
            for ( const column of columns ) {
                if ( column.sorting ) {
                    settingsSorting.push( column );
                }
            }
            return settingsSorting;
        },
        createSort: ( state ) => {
            const settingsSortings = state.getSettingsSorting( state );
            if ( settingsSortings.length ) {
                return createSorting( settingsSortings );
            }
            return undefined;
        }
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
                    state: null,
                    amount: null
                }
            ];

            setTimeout( () => {
                // Создаем функцию множественной сортировки на основании настроек взятых из групировок и колонок
                const sort = state.createSort( state );
/////////////////////////////////////////////////////////////
                // Сортируем данные
                const sortDataRowsBody = dataRowsBody.slice( 0 ).sort( sort );

                function getRoots( settings, dataCopy ) {
                    var roots = [];
                    for ( var i = 0; i < dataCopy.length; i++ ) {
                        var item = dataCopy[i];
                        if ( !item[settings.treeOptions.columnParentId] ) {
                            item.LevelItem = 0;
                            roots.push( item );
                            dataCopy.splice( i, 1 );
                            i--;
                        }
                    }
                    if ( settings.treeOptions && settings.treeOptions.sortRoot && settings.treeOptions.sortRoot.columns ) {
                        roots.sort( createFuncSort( settings ) );
                    }
                    if ( roots.length )
                        return roots
                    else
                        return undefined;
                }

                function getChildsForParent( settings, parentItem, dataCopy ) {
                    var parents = [];
                    for ( var i = 0; i < dataCopy.length; i++ ) {
                        var item = dataCopy[i];
                        if ( item[settings.treeOptions.columnParentId] == parentItem[settings.treeOptions.columnId] ) {
                            item.LevelItem = parentItem.LevelItem + 1
                            item.parentItem = parentItem;
                            parents.push( item );
                            dataCopy.splice( i, 1 );
                            i--;
                        }
                    }
                    if ( settings.treeOptions && settings.treeOptions.sortChilds && settings.treeOptions.sortChilds.columns ) {
                        parents.sort( createFuncSort( settings ) );
                    }
                    return parents;
                }

                let { groups, columns } = state;
                if ( groups && groups.length && dataRowsBody.length ) {

                    const dataRowsBodyCopy = dataRowsBody.slice( 0 );

                    let currentTitleGroup = '';
                    const rootDataGroup = [];
                    let rootSet = new Set();

                    groups.forEach( function ( _group ) {
                        for ( let i = 0; i < dataRowsBodyCopy.length; i++ ) {
                            let item = dataRowsBodyCopy[i];

                            rootSet.add( item[_group.field] );

                        }
                    } );
                }


////////////////////////////////////////////////////////////////////////
                commit( 'dataRowsBody', sortDataRowsBody );
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
            }, 2000 )
        }
    }

} );