import './App.css';
import Matrix from './components/matrix/Matrix';
import ControlBar from './components/ControlBar/ControlBar';
import { genGridData} from './utils/helper';
import { useState, useEffect } from 'react';

// here import other dependencies

const initGenConfig={nbRows:4,nbCols:4};

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
function getMatrixData(nbRows,nbCols){
  const genData = genGridData(nbRows,nbCols);
  const rowLabels = getRowLabels(genData)
  const colLabels = getColLabels(genData)
  return {genData,rowLabels,colLabels};
}

const initMatrixData = getMatrixData(initGenConfig.nbRows,initGenConfig.nbCols);

// a component is a piece of code which render a part of the user interface
function App() {
  const [genConfig,setGenConfig] = useState(initGenConfig);

  const [matrixData,setMatrixData] = useState(initMatrixData);

  const generateAndStoreNewData = function(newGenConfig){
    const newMatrixData = getMatrixData(newGenConfig.nbRows,newGenConfig.nbCols)
    setMatrixData(newMatrixData);
  }

  useEffect(()=>{
    console.log("App useEffect");
  })

  return (
    <div className="App">
        {console.log("App rendering")}
        <div id="control-bar-container">
          <ControlBar genConfig={genConfig} updateGenConfig={setGenConfig} onSubmitGenAction={generateAndStoreNewData}/>
        </div>  
        <div id="view-container">
          <Matrix matrixData={matrixData}/>
        </div>
    </div>
  );
}

export default App;
