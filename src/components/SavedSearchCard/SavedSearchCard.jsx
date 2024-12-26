import './SavedSearchCard.css'
import trashcan from '../../assets/trash.svg'
import { Link } from 'react-router-dom'

function SavedSearchCard({ item, handleTopicCardClick, handleDeleteClick }) {
    return (
        <Link
            to="/study-page"
            className="card__wrapper"
            onClick={() => {
                handleTopicCardClick(item)
            }}
        >
            <div className={`card__colorblock card__colorblock-${item.color}`}>
                <button className="card__delete-btn">
                    <img
                        className="card__delete-img"
                        alt="small trashcan"
                        src={trashcan}
                        onClick={() => {
                            handleDeleteClick(item)
                        }}
                    ></img>
                </button>
            </div>
            <p className="card__title">{item.topic}</p>
        </Link>
    )
}

export default SavedSearchCard
