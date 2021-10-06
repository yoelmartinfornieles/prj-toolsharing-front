import noFav from '../images/no-fav.png'
import fav from '../images/fav.png'

function FavButton(props){
    
    const {isFav} = props
    const {handleSubmitFav} = props
    const {handleSubmitDeleteFav} = props
   
    
    return (
        <div>
        {isFav? <button className="fav-but" onClick={handleSubmitDeleteFav}><img src={fav} alt="fav"/></button> : <button className="no-fav-but" onClick={handleSubmitFav}><img src={noFav} alt="no-fav" /></button>}
        </div>
    )
}

export default FavButton