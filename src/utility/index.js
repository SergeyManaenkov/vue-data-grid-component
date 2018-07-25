import { createSorting } from './sorting.js';
import { getValueCell } from "./formatting";

/* Создает экземпляр строки данных для группирующего элемента */
function dataItemGroup( options ) {
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
    Object.assign( defaults, options );
    return defaults;
}

function createDataView( options ) {
    let { groups, data, sort } = options;
    // Сортируем данные
    const _data = data.slice( 0 ).sort( sort );

    const rootGroups = {};
    if ( groups.length ) {
        let firstGroup = groups[0];
        for ( const row of _data ) {
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
            childs: _data
        };
    }

    return rootGroups;
}
export { createSorting, getValueCell, createDataView };