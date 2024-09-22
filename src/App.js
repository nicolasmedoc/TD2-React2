import './App.css';
import Matrix from './components/matrix/Matrix';
import ControlBar from './components/ControlBar/ControlBar';
import { genGridData } from './utils/helper';
import { useState, useEffect } from 'react';

// here import other dependencies

const initGenConfig={nbRows:4,nbCols:4};
const initGenData = genGridData(initGenConfig.nbRows,initGenConfig.nbCols);

// a component is a piece of code which render a part of the user interface
function App() {
  const [genData,setGenData] = useState(initGenData);
  function getColLabels(data){
    const colLabels=[]
    data.forEach((dataItem)=>{colLabels[dataItem.colPos]=dataItem.colLabel})
    return colLabels;
  }
  const [colLabels,setColLabels] = useState(getColLabels(genData))
  
  function getRowLabels(data){
    const rowLabels=[]
    data.forEach((dataItem)=>{rowLabels[dataItem.rowPos]=dataItem.rowLabel})
    return rowLabels;
  }
  const [rowLabels,setRowLabels] = useState(getRowLabels(genData))

  const generateAndStoreNewData = function(newGenConfig){
    const newGenData = genGridData(newGenConfig.nbRows,newGenConfig.nbCols)
    setGenData(newGenData)
    setColLabels(getColLabels(newGenData))
    setRowLabels(getRowLabels(newGenData))
  }

  useEffect(()=>{
    console.log("App useEffect");
  })

  return (
    <div className="App">
        {console.log("App rendering")}
        <div id="control-bar-container">
          <ControlBar initGenConfig={initGenConfig} onSubmitGenAction={generateAndStoreNewData}/>
        </div>  
        <div id="view-container">
          <Matrix matrixData={genData} colLabels={colLabels} rowLabels={rowLabels}/>
        </div>
    </div>
  );
}

export default App;
