import './App.css';
import Matrix from './components/matrix/Matrix';
import ControlBar from './components/ControlBar/ControlBar';
import { genGridData } from './utils/helper';
import { useState } from 'react';

// here import other dependencies

// a component is a piece of code which render a part of the user interface
function App() {
  const [genConfig,setGenConfig] = useState({nbRows:4,nbCols:4});
  const initGenData = genGridData(genConfig.nbRows,genConfig.nbCols);
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
  const updateGenConfigAndGenerate = function(newGenConfig){
    setGenConfig(newGenConfig);
    const newGenData = genGridData(newGenConfig.nbRows,newGenConfig.nbCols)
    setGenData(newGenData)
    setColLabels(getColLabels(newGenData))
    setRowLabels(getRowLabels(newGenData))
  }
  return (
    <div className="App">
        <div id="control-bar-container">
          <ControlBar genConfig={genConfig} onSubmitGenAction={updateGenConfigAndGenerate}/>
        </div>  
        <div id="view-container">
          <Matrix matrixData={genData} genConfig={genConfig} colLabels={colLabels} rowLabels={rowLabels}/>
        </div>
    </div>
  );
}

export default App;
