function ControlBar({genConfig,onSubmitGenAction}){
    const handleOnSubmit = function(event){
        // Prevent the browser from reloading the page
        event.preventDefault();
    
        // get the form data and transform it in JSON format
        const form = event.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());
    
        onSubmitGenAction(formJSON);
    }
    
    return(
        <>
            <form onSubmit={handleOnSubmit}>
                <label>
                    Nb rows
                    <input name="nbRows" defaultValue = {genConfig.nbRows}/>
                </label>

                <label>
                    Nb columns
                    <input name="nbCols" defaultValue = {genConfig.nbCols}/>
                </label>
                <button type="submit">Generate</button>
            </form>
        </>
    )
}

export default ControlBar;