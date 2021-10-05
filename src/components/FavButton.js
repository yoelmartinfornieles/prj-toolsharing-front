import noFav from '../images/no-fav.png'
import fav from '../images/fav.png'

function FavButton(props){
    
    const {isFav} = props
    const {handleSubmitFav} = props
    const {handleSubmitDeleteFav} = props
   
    
    return (
        <div>
        {isFav? <button onClick={handleSubmitDeleteFav}><img src={fav} alt=""/></button> : <button onClick={handleSubmitFav}><img src={noFav} alt=""/></button>}
        </div>
    )
}

export default FavButton