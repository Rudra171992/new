import React from 'react';
import IconCaretRight from 'terra-icon/lib/icon/IconCaretRight';
import IconCaretDown from 'terra-icon/lib/icon/IconCaretDown';
import Text from 'terra-text';
import Button from "terra-button/lib/Button";
import Spacer from 'terra-spacer';
import EmptySpace from './TreeTableList/EmptySpace';

const CarePlanItem = (props) => {
    console.log(props)

    const displayIcon = () => {
        if (!props.hasChildren) return <div style={{ minWidth: "15px", maxWidth: "15px"}}></div>

        const transformStyle = props.isExpanded ? {transform: "rotate(90deg)",transition: "transform 100ms linear"}
            : {transform: "rotate(0)",transition: "transform 100ms linear"}

        // if (props.isExpanded) {
            return <IconCaretRight style={transformStyle}/>
        // } else {
            // return <IconCaretRight />
        // }
    }

    return (
        <>
            <span>
                <EmptySpace depth={ props.depth }/>
            </span>
            <Button 
                isDisabled = {!props.hasChildren}
                onClick={() => {props.handleToggle(props.rowIndex)}} 
                variant="utility" 
                icon={displayIcon()} 
            />
            <Text>{props.display}</Text>
        </>
    )
}

export default CarePlanItem;