import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api"; 
import Navigation from "../../Layout/Navigation";

function DeckEdit(){
    const [deck, setDeck] = useState({name: '', description:''});
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(undefined);


    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then((deck) => {
                setDeck(deck)})
            .catch(setError);
        return () => abortController.abort();        
    }, [deckId]);

    if (error) {
        return <p>`Error: ${error.message}`</p>
      }

    const handleChange = ({ target }) => {
        setDeck({...deck, [target.name]: target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        updateDeck(deck, abortController.signal)
            .then(() =>{
                navigate(`/decks/${deckId}`);
            })
            .catch((error) => {
                return <p>ERROR</p>
            });
        return () => abortController.abort(); 
    };

    const breadcrumb = [
        {link: "/", title: "Home", active: false},
        {link: "", title: "Create Deck", active: true},
    ];

    return(
        <div>
            <Navigation props={breadcrumb} />
            <h2>Create Deck</h2>
            <form name="createDeck" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">
                        Name <input 
                            id="name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={deck.name || ''}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="description">
                        Description <input 
                            id="description"
                            type="textarea"
                            name="description"
                            onChange={handleChange}
                            value={deck.description || ''}
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
                <NavLink to="/">
                    <button>Cancel</button>
                </NavLink>
            </form>
        </div>
    );

};

export default DeckEdit;