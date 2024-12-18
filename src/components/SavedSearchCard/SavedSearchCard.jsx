import "./SavedSearchCard.css";

function SavedSearchCard({item})

{

  console.log(item);

  return (
    <div className="card__wrapper">
      <div className="card__colorblock"></div>
      <div className="card__text">
        <h3 className="card__title">{item.topic}</h3>
        <p className="card__summary">{item.topicResponse}</p>
      </div>
    </div>
  );
}

export default SavedSearchCard;
