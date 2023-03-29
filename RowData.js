export class RowModel {
    
    constructor(data, rowMetaData, rowState) {
        this._data = data;
        this._rowMetaData = rowMetaData;
        this._rowState = rowState;

    }

    getData() {
        return this._data;
    }

    getRowMetaData() {
        return this._rowMetaData;
    }

    getRowState() {
        return this._rowState;
    }
}

export default class Row {

    toggleChildren = () => {};
    updateData = () => {};

    constructor(rowModel, rowAPI) {
        this._rowModel = new RowModel(rowModel.data, rowModel.rowMetaData, rowModel.rowState);

        this.toggleChildren = rowAPI.toggleChildren;
        this.updateData = rowAPI.updateData;
    }
}