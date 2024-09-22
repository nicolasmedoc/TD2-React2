import { genGridData } from "../utils/helper";

export function matrixDataReducer(matrixData, action){
    switch (action.type) {
        case 'generate': {
          return generateNewData(action.nbRows,action.nbCols);
        }
        case 'updateSelectedItem': {
            const newGenData = matrixData.genData.map(cellData => {
                if (cellData.index === action.cellData.index) {
                return {...cellData,selected:!cellData.selected};
                } else {
                return cellData;
                }
            })
          return {
            genData: newGenData,
            colLabels: getColLabels(newGenData),
            rowLabels: getRowLabels(newGenData),
          };
        }
        default: {
          throw Error('Unknown action for matrixDataReducer: ' + action.type);
        }
      }
    
}

function getColLabels(data){
  const colLabels=[]
  data.forEach((dataItem)=>{colLabels[dataItem.colPos]=dataItem.colLabel})
  return colLabels;
}
function getRowLabels(data){
  const rowLabels=[]
  data.forEach((dataItem)=>{rowLabels[dataItem.rowPos]=dataItem.rowLabel})
  return rowLabels;
}
function generateNewData(nbRows,nbCols){
    const initGenData = genGridData(nbRows,nbCols);
    return {genData:initGenData, rowLabels: getRowLabels(initGenData), colLabels:getColLabels(initGenData)}
}
export const initMatrixData = generateNewData(4,4);