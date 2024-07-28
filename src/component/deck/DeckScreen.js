import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../../utils/api"; 
import Navigation from "../../Layout/Navigation";
import DeckDelete from './DeckDelete';
import CardAdd from '../card/CardAdd';
import CardList from '../card/CardList';

function DeckScreen(){
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const { deckId } = useParams();
    const { pathname } = useLocation();

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then((deck) => {
                setDeck(deck)
                setCards(deck.cards)
            })
            .catch((error) => {
                    console.error(error)
                });

        return () => abortController.abort();  

    }, [deckId]);

    const handleDelete = (cardId) => {
        const result = window.confirm(`Delete this card?\n\nYou will not be able to recover it.`);
        if(result) {
            deleteCard((cardId)
                .then(() => {
                    setCards((currentCard) =>
                    currentCard.filter((card) => card.id !== cardId));
                })
            )
        };
    };

    const breadcrumb = [
        {link: "/", title: "Home", active: false},
        {link: "", title: "Create Deck", active: true},
    ];

    console.log(pathname);

    return(
        <div>
            <Navigation props={breadcrumb} />
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <div>
                <NavLink to={`${pathname}/edit`}>
                    <button>View</button>
                </NavLink>
                <NavLink to={`${pathname}/study`}>
                    <button>Study</button>
                </NavLink>
                <CardAdd pathname={pathname}/>
                <DeckDelete deck={deck}/>
            </div>
            {deck.cards && ( <CardList cards={cards} handleDelete={handleDelete} />)}
        </div>
    );
};

export default DeckScreen;