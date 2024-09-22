function matrixConfigReducer(genConfig, action){
  switch (action.type) {
    case 'updateNbRowsAndCols':{
      return {...genConfig, nbRows:action.nbRows, nbCols:action.nbCols};
    }
    case 'updateHoveredCell':{
      return {...genConfig, hoveredCell: action.hoveredCell}
    }
    default: {
      throw Error('Unknown action for genConfigReducer: ' + action.type);
    }
  }
}
export default matrixConfigReducer;