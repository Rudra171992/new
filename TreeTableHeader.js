import React from "react";
import Header from "terra-clinical-header";
import ButtonGroup from 'terra-button-group';
import Button from "terra-button";
import IconEllipses from "terra-icon/lib/icon/IconEllipses";

const TreeTableHeader = (props) => {

    const startContent = () => {
        return (
            <ButtonGroup id="right-button-group">
                <ButtonGroup.Button text="Button 1"/>
            </ButtonGroup>
        );
    }

    const endContent = () => {
        return (
            <ButtonGroup id="right-button-group">
                <ButtonGroup.Button onClick={props.handleExpandAll} style={{ marginRight: "10px"}} text="Expand All"/>
                <ButtonGroup.Button onClick={props.handleCollapseAll} style={{ marginRight: "10px"}} text="Collapse All"/>
                <ButtonGroup.Button style={{ marginRight: "10px"}} icon={<IconEllipses />}/>
            </ButtonGroup>
        );
    }

    return(<Header startContent={startContent()} endContent={endContent()} />);
}

export default TreeTableHeader;