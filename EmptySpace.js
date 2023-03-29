import React from "react";

const EmptySpace = (props) => {

    let empty = [];
    const emptyComp = () => {
        for (let i = 0; i < props.depth; i++) {
            empty.push(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)
        }
        return empty;
    }

    return <> {emptyComp()} </>;
}

export default EmptySpace;