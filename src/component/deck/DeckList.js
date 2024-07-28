import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api";
import Deck from "./Deck";
import { NavLink } from "react-router-dom";

function DeckList(){
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal)
            .then((response) => {
                setDecks(response);
            })
            .catch((error) => {
                setError(error);
            });
        return () => abortController.abort();   
    }, []);

    if (error) {
        return <p>ERROR: {error.message}</p>
    }

    const list = decks.map((deck) => (
        <div key={deck.id}>
            <Deck deck={deck}/>
        </div>
    ));

    return(
        <div>
            <NavLink to="/decks/new">
                <button type="button">Create Deck</button>
            </NavLink>
            <div>{list}</div>
        </div>
    );
};

export default DeckList;