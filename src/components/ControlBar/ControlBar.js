import { useEffect } from "react";

function ControlBar({genConfig, updateGenConfig, onSubmitGenAction}){

    const handleOnChangeNbRows = function(event){
        const nbRows = parseInt(event.target.value);
        updateGenConfig({ ...genConfig, nbRows })
    }

    const handleOnChangeNbCols = function(event){
        const nbCols = parseInt(event.target.value);
        updateGenConfig({ ...genConfig, nbCols })
    }

    const handleOnSubmit = function(event){
        // Prevent the browser from reloading the page
        event.preventDefault();
    
        // get the form data and transform it in JSON format
        const form = event.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());
    
        onSubmitGenAction(formJSON);
    }
    
    useEffect(()=>{
        console.log("ControlBar useEffect")
    });

    return(
        <>
            {console.log("ControlBar rendering")}
            <form onSubmit={handleOnSubmit}>
                <label>
                    Nb rows
                    <input name="nbRows" value = {genConfig.nbRows} onChange={handleOnChangeNbRows}/>
                </label>

                <label>
                    Nb columns
                    <input name="nbCols" value = {genConfig.nbCols} onChange={handleOnChangeNbCols}/>
                </label>
                <button type="submit">Generate</button>
            </form>
            <div>
                {genConfig.hoveredCell?.index>=0?<p>Cell ({genConfig.hoveredCell.rowPos},{genConfig.hoveredCell.colPos}) hovered </p>:<p>Nothing hovered</p>}
            </div>
        </>
    )
}

export default ControlBar;