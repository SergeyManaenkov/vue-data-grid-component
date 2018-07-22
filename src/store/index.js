import 'es6-promise/auto'; // т.к. для VUEX нужна поддержка promise, а в IE promise неподдерживается. Подключаем библиотеку-полефил
require( 'es6-object-assign' ).polyfill();// IE 11 не поддерживает Object.assign
/*import 'es6-map';

require( 'es6-set/implement' );*/

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

/* Создает экземпляр строки данных для группирующего элемента */
function dataItemGroup( options ) {
    let o = options;
    let defaults = {
        title: '',
        childGroups: null,
        groupSettings: null,
        parent: null,
        childs: [],
        level: 0,
        isOpen: true,
        isGroup: true
    };
    Object.assign( defaults, o );
    return defaults;
}

export const store = new Vuex.Store( {
    strict: process.env.NODE_ENV !== 'production',
    state: {
        groups: [
            new group( { field: 'LevelPointName' } ),
            new group( { field: 'IndicatorTitle', isOpen: false } ),
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
        defaultIndent: 17,
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
        setOpenGroup( state, rowGroup ) {
            rowGroup.isOpen = !rowGroup.isOpen;
        },
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
        setOpenGroup( { commit }, rowGroup ) {
            commit( 'setOpenGroup', rowGroup )
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
            let dataRowsBody = demoData;

            setTimeout( () => {
                // Сортируем данные
                const sortDataRowsBody = dataRowsBody.slice( 0 ).sort( getters.sort );

                let { groups } = state;

                const rootGroups = {};
                if ( groups.length ) {
                    let firstGroup = groups[0];
                    for ( const row of sortDataRowsBody ) {
                        let groupTitle = row[firstGroup.field];
                        let root = rootGroups[groupTitle];
                        if ( !root ) {
                            root = rootGroups[groupTitle] = new dataItemGroup( {
                                title: groupTitle,
                                groupSettings: firstGroup,
                                isOpen: firstGroup.isOpen,
                                childGroups: {}
                            } );
                        }

                        let parentGroup = root;
                        for ( let i = 1; i < groups.length; i++ ) {
                            let group = groups[i];
                            let titleGroup = row[group.field];
                            if ( !parentGroup.childGroups[titleGroup] ) {
                                parentGroup.childGroups[titleGroup] = new dataItemGroup( {
                                    title: titleGroup,
                                    groupSettings: group,
                                    parent: parentGroup,
                                    level: i,
                                    isOpen: group.isOpen,
                                    childGroups: (i == groups.length - 1 ? null : {})
                                } );
                            }
                            parentGroup = parentGroup.childGroups[titleGroup];
                        }
                        row.parent = parentGroup;
                        parentGroup.childs.push( row );
                    }
                } else {
                    rootGroups[0] = {
                        childs: sortDataRowsBody
                    };
                }

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