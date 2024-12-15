import "./SavedSearchCard.css";

function SavedSearchCard() {
  return (
    <div className="card__wrapper">
      <div className="card__colorblock"></div>
      <div className="card__text">
        <h3 className="card__title">Card Title</h3>
        <p className="card__summary">
         Let's try this with some different text that is also too long for a single card. Trying to get the ellipsis to show up.
        </p>
      </div>
    </div>
  );
}

export default SavedSearchCard;
