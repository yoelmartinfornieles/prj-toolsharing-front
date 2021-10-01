function FavButton(props){
    
    const {isFav} = props
    const {handleSubmitFav} = props
    const {handleSubmitDeleteFav} = props
   
    
    return (
        <div>
        {isFav? <button onClick={handleSubmitDeleteFav}>Remove from Fav</button> : <button onClick={handleSubmitFav}>Fav</button>}
        </div>
    )
}

export default FavButton