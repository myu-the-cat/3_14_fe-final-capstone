import React, {useState, useEffect} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Navigation from "../../Layout/Navigation";
import CardAdd from "../card/CardAdd";

function Study(){
    const navigate = useNavigate();
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const [ cardFlip, setCardFlip] = useState(false);
    const [ index, setIndex ] = useState(0);
    const { pathname } = useLocation();

    const breadcrumb = [
        {link: "/", title: "Home", active: false},
        {link: `/decks/${deck.id}`, title: deck.name, active: false},
        {link: "", title: "Study", active: true},
    ];

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

    if (!deck.cards || deck.cards.length <= 2 ){
        const cardLength = deck.cards ? deck.cards.length : 0;

        return (
            <div>
                <Navigation props={breadcrumb} />
                <h2>{deck.name}: Study</h2>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cardLength} cards in this deck.</p>
                <CardAdd pathname={pathname.replace("/study", "")} />
            </div>
        )
    };

    const handleFlip = () => {
        setCardFlip(!cardFlip);
    };

    const handleClick = () => {
        if (index < deck.cards.length - 1){
            setIndex(index + 1);
            setCardFlip(false);
        } else {
            const confirm = window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.");
            if (confirm) {
                setIndex(0);
                setCardFlip(false);
                navigate(`/decks/${deckId}/study`);
            } else {
                navigate("/");
            }
        }
    }
    
    return (
        <div>
            <Navigation props={breadcrumb} />
            <h2>{deck.name}:Study</h2>
            <div>
                <div>
                    <h5>Card {index+1} of {deck.cards.length || 0}</h5>
                </div>
                <p>{cardFlip ? deck.cards?.[index]?.back : deck.cards?.[index]?.front}</p>
                <button onClick={handleFlip}>Flip</button>
                {cardFlip && <button onClick={handleClick}>Next</button>}
            </div>        
        </div>
    );

};

export default Study;