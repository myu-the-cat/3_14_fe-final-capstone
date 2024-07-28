import React from "react";
import { useNavigate } from "react-router-dom";

function CardForm({ handleChange, handleSubmit, card, deckId, add }){
    const navigate = useNavigate();

    if(!card){
        return <p>Fetching information</p>;
    }

    return(
        <form name="createCard" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="front">Front</label>
                <textarea id="front" type="textarea" name="front" placeholder="Card Front"
                    onChange={handleChange} value={card.front || ""} required={true} />
            </div>
            <div>
                <label htmlFor="back">Back</label>
                <textarea id="back" type="textarea" name="back" placeholder="Card Back" 
                    onChange={handleChange} value={card.back || ""} required={true} />
            </div>
            <button type="button" onClick={() => {navigate(`/decks/${deckId}`)}}>
                {add ? "Done" : "Cancel"}</button>
            <button type="submit" onClick={() => {
                if (add){
                    window.location.reload();
                }}}>{add ? "Save" : "Submit"}</button>
        </form>
    );
};

export default CardForm;