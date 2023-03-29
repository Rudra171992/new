import React, { useState } from "react";
import { genData } from "../util/data";
import CarePlanItem from "./CarePlanItem";
import Checkbox from 'terra-form-checkbox';
import TreeState from "../model/TreeState";
import TreeTableListRow from "./TreeTableList/TreeTableListRow";
import TreeTableCell from "./TreeTableList/TreeTableCell";
import Text from "terra-text";
import Hyperlink from "terra-hyperlink";

export const treeTableDataView = (props) => {
    const [treeTableData, setTreeTableData] = useState(TreeState.create(genData()))

    const handleToggle = (rowIndex) => {
        const updatedTreeData = TreeState.toggleChildren(treeTableData, treeTableData._dataRowModel[rowIndex]);
        setTreeTableData(updatedTreeData);
    }

    const createCell = (cell) => {
        switch(cell.key) {
            case "Checkbox":
                return { key: cell.key, children: <TreeTableCell> <Checkbox isLabelHidden/> </TreeTableCell>}
            case "Action": 
                return { key: cell.key, children: <Hyperlink href="">View Details</Hyperlink>};
            case "Description": 
                return { key: cell.key, children: <CarePlanItem hasChildren={cell.hasChildren} isExpanded={cell.isExpanded} rowIndex={cell.rowIndex} handleToggle={() => {handleToggle(cell.rowIndex)}} depth={cell.tabs} display={ `${cell.value}` } />};
            case "Discipline": 
                return { key: cell.key, children: <Text> {cell.value} </Text>};
            case "Type": 
                return { key: cell.key, children: <Text> {cell.value} </Text>};
        }
    };

    const createCellsForRow = cells => {
        let cellsList = [];
        const rowData = cells.getData();
        const rowMetaData = cells.getRowMetaData();
        const rowState = cells.getRowState();
        Object.entries(rowData).forEach(entry => {
            if (rowState.isVisible) {
                cellsList.push(createCell({ key: entry[0], value:entry[1], isExpanded: rowState.isExpanded, tabs: rowMetaData.depth, hasChildren: rowMetaData.hasChildren, rowIndex: rowMetaData.index}));
            }
        })

        return [{ key: "Checkbox", children: <Checkbox isLabelHidden/>}, ...cellsList];
    }

    const createRow = (rowData, index) => (
        {
            key: index,
            isStripped: index % 2 !== 0,
            cells: createCellsForRow(rowData),
        }
    );

    const filteredVisibleRows = data => data.filter(childItem => childItem.getRowState().isVisible === true)

    const createRows = data => data.map((childItem, index) => createRow(childItem, index));
    const generateCellView = createRows(filteredVisibleRows(treeTableData._dataRowModel));

    return generateCellView;
};