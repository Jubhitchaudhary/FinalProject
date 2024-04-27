import './Card.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
    return (
        <div className='Card'>
            <h3>Name: {props.name}</h3>
            <h3>Super Power: {props.super_power}</h3>
            <h3>Color: {props.color}</h3>
            <Link to={"/edit/" + props.id}><button>Edit Crewmate</button></Link>
        </div>
    )
}

export default Card;