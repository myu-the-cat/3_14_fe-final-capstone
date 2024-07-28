import React from "react";
import DeckDelete from "./DeckDelete";
import { NavLink } from "react-router-dom";

function Deck({ deck }) {
    return(
        <div>
            <div>
                <h2>{deck.name}</h2>
                <p>{deck.cards.length} cards</p>
                <p>{deck.description}</p>
                <NavLink to={`/decks/${deck.id}`}>
                    <button>View</button>
                </NavLink>
                <NavLink to={`/decks/${deck.id}/study`}>
                    <button>Study</button>
                </NavLink>
                <DeckDelete deck={deck}/>
            </div>
        </div>
    );
};

export default Deck;