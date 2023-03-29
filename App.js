import React, { useState } from "react";
import Table from 'terra-table';
import Checkbox from 'terra-form-checkbox';
import CarePlanItem from "./CarePlanItem";
// import { treeTableDataView } from "./TreeTableDataView";
import TreeTableHeader from "./Header/TreeTableHeader";
import TreeState from "../model/TreeState";
// import TreeTableListRow from "./TreeTableList/TreeTableListRow";
import TreeTableCell from "./TreeTableList/TreeTableCell";
import Text from "terra-text";
import Hyperlink from "terra-hyperlink";
import { genData } from "../util/data";

const App = () => {
    const [treeTableData, setTreeTableData] = useState(TreeState.create(genData()))

    const handleToggle = (rowIndex) => {
        const updatedTreeData = TreeState.toggleChildren(treeTableData, treeTableData._dataRowModel[rowIndex]);
        setTreeTableData(updatedTreeData);
    }

    const handleExpandAll = () => {
        setTreeTableData(TreeState.expandAll(treeTableData, undefined));
    }

    const handleCollapseAll = () => {
        setTreeTableData(TreeState.collapseAll(treeTableData));
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
            attrs: { "transition-delay": "2s"}
        }
    );

    const filteredVisibleRows = data => data.filter(childItem => childItem.getRowState().isVisible === true)

    const createRows = data => data.map((childItem, index) => createRow(childItem, index));
    const generateCellView = () => createRows(filteredVisibleRows(treeTableData._dataRowModel));

    return (
        <>
            <div style={{ height: "100vh"}}>
                <Table
                summaryId="example-table"
                summary="This a fixed height table."
                fill
                numberOfColumns={4}
                cellPaddingStyle="standard"
                showSimpleFooter
                headerNode={<TreeTableHeader handleExpandAll={handleExpandAll} handleCollapseAll={handleCollapseAll}/>}
                dividerStyle="horizontal"
                columnWidths={[
                    { percentage: 4 },
                    { percentage: 40 },
                    { percentage: 15 },
                    { percentage: 25 },
                    { percentage: 15 },
                ]}
                headerData={{
                cells: [
                    {
                        id: 'CheckBox',
                        key: 'CheckBox',
                        children: <Checkbox isLabelHidden/>,
                    },
                    {
                        id: 'Description',
                        key: 'Description',
                        children: 'Description',
                    },
                    {
                        id: 'Type',
                        key: 'Type',
                        children: 'Type',
                    },
                    {
                        id: 'Discipline',
                        key: 'Discipline',
                        children: 'Discipline',
                    },
                    {
                        id: 'Action',
                        key: 'Action',
                        children: 'Action',
                    }
                ],
                }}
                bodyData={[{
                        rows: generateCellView()
                    }]}
            />
            </div>
      </>
    );
}

export default App;