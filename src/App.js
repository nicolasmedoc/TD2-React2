import './App.css';
import Matrix from './components/matrix/Matrix';
import ControlBar from './components/ControlBar/ControlBar';
import { useEffect, useReducer } from 'react';
import { matrixDataReducer, initMatrixData } from './reducers/MatrixDataReducer';
import matrixConfigReducer from './reducers/MatrixConfigReducer';

// here import other dependencies

const initGenConfig={nbRows:4,nbCols:4};

// a component is a piece of code which render a part of the user interface
function App() {
  const [genConfig,configDispatch] = useReducer(matrixConfigReducer,initGenConfig)
  const updateGenConfig = function(newGenConfig){
    configDispatch({ ...newGenConfig, type:'updateNbRowsAndCols' });
  }

  const [matrixData,matrixDataDispatch] = useReducer(matrixDataReducer, initMatrixData);

  const handleCellSelection = function(cellData){
    matrixDataDispatch({type:'updateSelectedItem',cellData})
  }

  const handleCellHovered = function(cellData){
    configDispatch({type:"updateHoveredCell", hoveredCell:cellData})
  }

  const generateAndStoreNewData = function(newGenConfig){
    matrixDataDispatch({ ...newGenConfig, type:"generate" })
  }

  useEffect(()=>{
    console.log("App useEffect");
  })

  return (
    <div className="App">
        {console.log("App rendering")}
        <div id="control-bar-container">
          <ControlBar genConfig={genConfig} updateGenConfig={updateGenConfig} onSubmitGenAction={generateAndStoreNewData}/>
        </div>  
        <div id="view-container">
          <Matrix matrixData={matrixData} handleCellSelection={handleCellSelection} handleCellHovered={handleCellHovered}/>
        </div>
    </div>
  );
}

export default App;
