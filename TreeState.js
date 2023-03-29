import { RowModel } from "./RowData";

export default class TreeState {

    constructor(dataRowModel) {
        this._dataRowModel = dataRowModel;
        this._hasData = (dataRowModel.length > 0);
        this._height = 0;
    }


    static create(data) {
        function _processNode(
            children, depth, index, top, isVisible = false
        ) {
            let result = [];
            let _top = top;
            for (let child of children) {
                if (child.children != null && child.children.length > 0) {
                    const childRowModel = new RowModel(child.data, {
                        depth: depth,
                        index: index++,

                        height: child.height,
                        hasChildren: true,
                    }, {
                        isVisible: isVisible,
                        isExpanded: false,
                        top: _top,
                    })

                    if (isVisible) {
                        _top+= child.height;
                    }

                    let hasVisibleChildren = false;
                    const grandchildren = _processNode(child.children, depth + 1, index, _top);

                    const grandchildrenRowModels = [];

                    for (let grandchild of grandchildren) {
                        grandchildrenRowModels.push(grandchild);
                        index++;

                        if (grandchild.getRowState().isVisible) {
                            hasVisibleChildren = true
                        }
                    }

                    result.push(
                        hasVisibleChildren
                            ? new RowModel(childRowModel.getData(), childRowModel.getRowMetaData(), {...childRowModel.getRowState(), isExpanded: true })
                            : childRowModel
                    );
                    
                    grandchildrenRowModels.map(gcRowModel => result.push(gcRowModel));
                } 
                else {
                    result.push(new RowModel(child.data, {
                        depth: depth,
                        index: index ++,

                        height: child.height,
                        hasChildren: false,
                    }, {
                        isVisible: isVisible,
                        isExpanded: false,
                        top: _top,
                    }));
                }
            }

            return result;
        }

        const rowModels = _processNode(data, 0, 0, 0, true);
        return new TreeState(rowModels);
    }

    static toggleChildren(source, model) {
        if ((model.getRowMetaData().index === source.getData().length - 1 ) 
            || model.getRowMetaData().hasChildren == false) {

                return new TreeState(source.getData().slice());

        }

        const currentDepth = model.getRowMetaData().depth;
        let shouldToggleOpen = false;
        
        let lastChildIndex = model.getRowMetaData().index + 1;
        while(lastChildIndex < source.getData().length) {
            const currentRow = source.getData(lastChildIndex);
            if (currentRow.getRowMetaData().depth < currentDepth + 1) {
                break;
            }

            if (shouldToggleOpen == null) {
                shouldToggleOpen = !currentRow.getRowState().isVisible;
            }

            lastChildIndex++;
        }
    }

    static sliceRows(source, from, to) {
        if (from < 0) {
          throw new Error(`Invalid range: from < 0 (${from} < 0).`);
        }
        if (from > source._dataRowModel.length) {
          throw new Error(`Invalid range: from > max size (${from} > ${source.data.length}).`);
        }
        if (to > source._dataRowModel.length) {
          throw new Error(`Invalid range: to > max size (${to} > ${source.data.length}).`);
        }
        if (from > to) {
          throw new Error(`Invalid range: from > to (${from} > ${to}).`);
        }
    
        return source._dataRowModel.slice(from, to);
    }

    static _hideRowsInRange(source, from = 0, to = source._dataRowModel.length) {
      const startRange = TreeState.sliceRows(source, 0, from);
      let _top = source._dataRowModel[from].getRowState().top;
      const updatedRange = TreeState.sliceRows(source, from, to).map((model) => {
        if (model.getRowMetaData().depth > 0 && model.getRowState().isVisible) {
          model.getRowState().isVisible = false;
        }
        model.getRowState().isExpanded = false;
        model.getRowState().top = _top;
        if (model.getRowState().isVisible) {
          _top+= model.getRowMetaData().height;
        }
        return model;
      });
      const endRange = TreeState.sliceRows(source, to, source._dataRowModel.length).map((model) => {
        model.getRowState().top = _top;
        if (model.getRowState().isVisible) {
          _top+= model.getRowMetaData().height;
        }
        return model;
      });
  
      // Update getRowState().isExpanded for rows before the from↔to range
      if (startRange.length > 0 && updatedRange.length > 0) {
        if (startRange[startRange.length - 1].getRowMetaData().depth < updatedRange[0].getRowMetaData().depth) {
          startRange[startRange.length - 1].getRowState().isExpanded = false;
        }
      }
  
      return new TreeState(startRange.concat(updatedRange, endRange));
    }
    

    static _showRowsInRange(source, from = 0, to = source._dataRowModel.length, depthLimit) {
        const startRange = TreeState.sliceRows(source, 0, from);
        let _top = source._dataRowModel[from].getRowState().top;
        const updatedRange = TreeState.sliceRows(source, from, to).map((model, i) => {
          if (model.getRowMetaData().depth > 0 && !model.getRowState().isVisible) {
            // If a depthLimit value is set, only show nodes with a depth value less or equal
            if (depthLimit == null || (depthLimit != null && model.getRowMetaData().depth <= depthLimit)) {
              model.getRowState().isVisible = true;
            }
          }
          model.getRowState().top = _top;
          if (model.getRowState().isVisible) {
            _top+= model.getRowMetaData().height;
    
            if (model.getRowMetaData().hasChildren) {
              // Peek at the next row, if depth > currentDepth & it will be toggled to be visible,
              // $state.isExpanded on the current row will be set to true
              if (from + i + 1 < to) {
                const nextRowModel = source._dataRowModel[from + i + 1];
                if (nextRowModel.getRowMetaData().depth > model.getRowMetaData().depth && depthLimit == null
                  || (depthLimit != null && nextRowModel.getRowMetaData().depth <= depthLimit)) {
                  model.getRowState().isExpanded = true;
                }
              }
            }
          }
          
          return model;
        });
        const endRange = TreeState.sliceRows(source, to, source._dataRowModel.length).map((model) => {
          model.getRowState().top = _top;
          if (model.getRowState().isVisible) {
            _top+= model.getRowMetaData().height;
          }
          return model;
        });
    
        // Update $state.isExpanded for rows before the from↔to range
        if (startRange.length > 0 && updatedRange.length > 0) {
          if (startRange[startRange.length - 1].getRowMetaData().hasChildren &&
            startRange[startRange.length - 1].getRowMetaData().depth < updatedRange[0].getRowMetaData().depth) {
            startRange[startRange.length - 1].getRowState().isExpanded = true;
          }
        }
    
        return new TreeState(startRange.concat(updatedRange, endRange));
    }


    static toggleChildren(source, model) {
        if (
          model.getRowMetaData().index == source._dataRowModel.length - 1 // Last item, no children available
          || model.getRowMetaData().hasChildren == false
        ) {
          return new TreeState(source._dataRowModel.slice());
        }
    
        const currentDepth = model.getRowMetaData().depth;
        let shouldToggleOpen = null;
    
        let lastChildIndex = model.getRowMetaData().index + 1;
        for (; lastChildIndex < source._dataRowModel.length; lastChildIndex++) {
          const currentRow = source._dataRowModel[lastChildIndex];
          if (currentRow.getRowMetaData().depth < currentDepth + 1) {
            break;
          }
    
          if (shouldToggleOpen == null) {
            shouldToggleOpen = !currentRow.getRowState().isVisible;
          }
        }
    
        return shouldToggleOpen
          ? TreeState._showRowsInRange(source, model.getRowMetaData().index + 1, lastChildIndex, currentDepth + 1)
          : TreeState._hideRowsInRange(source, model.getRowMetaData().index + 1, lastChildIndex);
    }

    static expandAll(source, depthLimit) {
      return TreeState._showRowsInRange(source, undefined, undefined, depthLimit);
    }
  
    static collapseAll(source) {
      return TreeState._hideRowsInRange(source);
    }
}