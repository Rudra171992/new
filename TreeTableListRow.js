import React from "react";
import CarePlanItem from "../CarePlanItem";
import Checkbox from 'terra-form-checkbox';
import Text from "terra-text";

const TreeTableListRow = (props) => {

    const createCell = (cell) => {
        switch(cell.key) {
            case "Checkbox":
                return { key: cell.key, children: <Checkbox isLabelHidden/>}
            case "Action":
                return { key: cell.key, children: <Text>View Details</Text>};
            case "Description":
                return { key: cell.key, children: <CarePlanItem depth={ "" } display={ `${cell.value}` } />};
            case "Discipline":
                return { key: cell.key, children: <Text> `${cell.value}` </Text>};
            case "Type":
                return { key: cell.key, children: <Text> `${cell.value}` </Text>};
        
        }
    }

    const createCellsForRow = () => {
        let cellsList = [];
        Object.entries(props.cells).forEach(entry => {
            cellsList.push(createCell({ key: entry[0], value:entry[1]}));
        })

        return [{ key: "Checkbox", children: <Checkbox isLabelHidden/>}, ...cellsList];
    }

    return createCellsForRow();
}

export default TreeTableListRow;