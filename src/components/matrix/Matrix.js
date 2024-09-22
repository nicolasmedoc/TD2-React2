import './Matrix.css'
import { getDefaultFontSize,getYlGnBu} from '../../utils/helper';
import { useEffect, useContext } from 'react';
import { MatrixConfigDispatchContext } from '../../reducers/MatrixConfigContext';
import { MatrixDataContext, MatrixDataDispatchContext } from '../../reducers/MatrixDataContext';

const cellSize= 34;
const radius = cellSize / 2;
const colorsYlGnBu = getYlGnBu();
const fontSize=getDefaultFontSize()
const margin={left:100,top:100}
const marginLabelsToMatrix=5;


function Cell({cellData, sizeValue, colorValue}){
    const dataDispatch = useContext(MatrixDataDispatchContext)
    const configDispatch = useContext(MatrixConfigDispatchContext)

    const handleOnClick = function(){
        dataDispatch({type:"updateSelectedItem", cellData})
    }
    const handleOnMouseEnter = function(){
        configDispatch({type:"updateHoveredCell", hoveredCell:cellData})
    }
    const handleOnMouseLeave = function(){
        configDispatch({type:"updateHoveredCell", hoveredCell:{}})
    }
    const transformStr="translate("+(cellData.colPos*cellSize)+", "+(cellData.rowPos*cellSize)+")"
    const color = colorsYlGnBu[Math.floor(colorValue*colorsYlGnBu.length)]
    const strokeWidth=cellData.selected?2:0;
    const strokeColor="red"
    return(
        <g transform={transformStr} onClick={handleOnClick} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <rect className="CellRect" width={cellSize-1} height={cellSize-1} fill="lightgray"/>
            <circle cx={radius} cy={radius} r={Math.max(2,radius*sizeValue)} fill={color} stroke={strokeColor} strokeWidth={strokeWidth}/>
        </g>
    )
}

function RowLabel({rowPos,rowLabel}){
    const transformStr='translate(0,'+(cellSize*(rowPos) + cellSize/2 + fontSize/2)+')'
    return(
        <g transform={transformStr}>
            <text className="RowLabel" textAnchor="end">{rowLabel}</text>
        </g>
    )
}

function ColLabel({colPos,colLabel}){
    const transformStr='translate('+(colPos*cellSize + cellSize/2)+',0) rotate(-45)'
    return(
        <g transform={transformStr}>
            <text className="ColLabel">{colLabel}</text>
        </g>
    )
}

function Matrix(){
    const matrixData = useContext(MatrixDataContext);
    const renderMatrix = function(){
        let minNbProductSold = Number.POSITIVE_INFINITY
        let maxNbProductSold = Number.NEGATIVE_INFINITY
        matrixData.genData.forEach(cellData=>{
            if(cellData.nbProductSold<minNbProductSold)minNbProductSold=cellData.nbProductSold;
            if(cellData.nbProductSold>maxNbProductSold)maxNbProductSold=cellData.nbProductSold;
        });

        return matrixData.genData.map(cellData=>{
            return <Cell key={(cellData.index)}
                cellData={cellData}
                sizeValue={(cellData.nbProductSold-minNbProductSold)/(maxNbProductSold-minNbProductSold)}
                colorValue={cellData.salesGrowth}
                />
        })
    }
    const renderColLabels = function(){
        return matrixData.colLabels.map((colLabel,i)=>{
            return (
                <ColLabel key={colLabel} colPos={i} colLabel={colLabel}></ColLabel>
            )
        })
    }
    const renderRowLabels = function(){
        return matrixData.rowLabels.map((rowLabel,i)=>{
            return (
                <RowLabel key={rowLabel} rowPos={i} rowLabel={rowLabel}></RowLabel>
            )
        })
    }
    
    useEffect(()=>{
        console.log("Matrix useEffect");
    });

    return(
        <svg className="MatrixSVG" width="100%" height="100%" >
            {console.log("Matrix rendering")}
            <g transform={'translate('+(margin.left-marginLabelsToMatrix)+','+(margin.top)+')'}>
                {renderRowLabels()}
            </g>
            <g transform={'translate('+(margin.left)+","+(margin.top-marginLabelsToMatrix)+')'}>
                {renderColLabels()}
            </g>
            <g transform={"translate("+margin.left+","+margin.top+")"}>
                {renderMatrix()}
            </g>
        </svg>
    )
}

export default Matrix;