import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import Navigation from "../../Layout/Navigation";
import CardForm from "./CardForm";

function CardCreate(){
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [ card, setCard ] = useState({front: '', back:''});
    const [ deck, setDeck ] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then((deck) => {
                setDeck(deck)})
            .catch((error) => {
                console.error(error)
            });
        return () => abortController.abort();        
    }, [deckId]);


    const handleChange = ({ target }) => {
        setCard({...card, [target.name]: target.value});
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        createCard(deckId, card, abortController.signal)

            .then(() =>{
                navigate(`/decks/${deckId}`);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(()=> {
                setCard({ front: "", back: ""});
            });
    };

    const breadcrumb = [
        {link: "/", title: "Home", active: false},
        {link: `/decks/${deck.id}`, title: deck.name, active: false},
        {link: "", title: "Add Card", active: true},
    ];

    return (
        <div>
            <Navigation props={breadcrumb} />
            <h2>{deck.name}: Add Card</h2>
            <CardForm handleChange={handleChange} handleSubmit={handleSubmit} card={card} deckId={deckId} add={true}/>
        </div>
    );
};

export default CardCreate;