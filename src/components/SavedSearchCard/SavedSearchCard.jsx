import "./SavedSearchCard.css";
import trashcan from "../../assets/trash.svg";

function SavedSearchCard({item, handleTopicCardClick, handleDeleteClick})

{
  return (
    <div className="card__wrapper" onClick={()=>{handleTopicCardClick(item)}}>
      <div className="card__colorblock">
      <button className="card__delete-btn"><img className="card__delete-img" alt="small trashcan" src={trashcan} onClick={()=>{handleDeleteClick(item)}}></img></button>      
      </div>
      <p className="card__title">{item.topic}</p>
    </div>
  );
}

export default SavedSearchCard;
