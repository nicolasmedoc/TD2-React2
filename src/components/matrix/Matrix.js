import './Matrix.css'
import { getDefaultFontSize,getYlGnBu} from '../../utils/helper';

const cellSize= 34;
const radius = cellSize / 2;

function Cell({cellData, sizeValue, colorValue}){
    const transformStr="translate("+(cellData.colPos*cellSize)+", "+(cellData.rowPos*cellSize)+")"
    const colorsYlGnBu = getYlGnBu();
    const color = colorsYlGnBu[Math.floor(colorValue*colorsYlGnBu.length)]
    return(
        <g transform={transformStr}>
            <rect className="CellRect" width={cellSize-1} height={cellSize-1} fill="lightgray"/>
            <circle cx={radius} cy={radius} r={Math.max(2,radius*sizeValue)} fill={color} />
        </g>
    )
}

function RowLabel({rowPos,rowLabel}){
    const fontSize=getDefaultFontSize()
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

function Matrix({matrixData,genConfig, colLabels, rowLabels}){
    const renderMatrix = function(){
        let minNbProductSold = Number.POSITIVE_INFINITY
        let maxNbProductSold = Number.NEGATIVE_INFINITY
        matrixData.forEach(cellData=>{
            if(cellData.nbProductSold<minNbProductSold)minNbProductSold=cellData.nbProductSold;
            if(cellData.nbProductSold>maxNbProductSold)maxNbProductSold=cellData.nbProductSold;
        });

        return matrixData.map(cellData=>{
            return <Cell key={(cellData.index)}
                cellData={cellData}
                sizeValue={(cellData.nbProductSold-minNbProductSold)/(maxNbProductSold-minNbProductSold)}
                colorValue={cellData.salesGrowth}
                />
        })
    }
    const renderColLabels = function(){
        return colLabels.map((colLabel,i)=>{
            return (
                <ColLabel key={i} colPos={i} colLabel={colLabel}></ColLabel>
            )
        })
    }
    const renderRowLabels = function(){
        return rowLabels.map((rowLabel,i)=>{
            return (
                <RowLabel key={i} rowPos={i} rowLabel={rowLabel}></RowLabel>
            )
        })
    }
    const margin={left:100,top:100}
    const marginLabelsToMatrix=5;
    return(
        <svg className="MatrixSVG" width="100%" height="100%" >
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