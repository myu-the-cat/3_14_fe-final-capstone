import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api"; 
import Navigation from "../../Layout/Navigation";
import CardForm from "./CardForm";

function CardEdit(){
    const [deck, setDeck] = useState({});
    const { deckId, cardId } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);


    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then((deck) => {
                setDeck(deck)})
            .catch((error) => {
                console.error(error)
            });
        
        readCard(cardId, abortController.signal)
            .then((card) => {
                setCard(card)})
            .catch((error) => {
                console.error(error)
            });

        return () => abortController.abort();        
    }, [deckId, cardId]);

    const handleChange = ({ target }) => {
        setCard({...card, [target.name]: target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        updateCard(card, abortController.signal)
            .then(() =>{
                navigate(`/decks/${deckId}`);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const breadcrumb = [
        {link: "/", title: "Home", active: false},
        {link: `/decks/${deck.id}`, title: deck.name, active: false},
        {link: "", title: "Add Card", active: true},
    ];

    if(!card){
        return <p>Fetching information</p>
    }

    return(
        <div>
            <Navigation props={breadcrumb} />
            <h2>Edit Deck</h2>
            <CardForm handleChange={handleChange} handleSubmit={handleSubmit} card={card} deckId={deckId} add={false}/>
        </div>
    );
};

export default CardEdit;