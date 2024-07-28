import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createDeck } from "../../utils/api";
import Navigation from "../../Layout/Navigation";

function DeckForm(){ 
    const navigate = useNavigate();
    const initialFormData = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState({...initialFormData});

    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({ ...formData, [target.name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createDeck(formData);
        navigate("/decks");
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
                <div className="formGroup">
                    <label htmlFor="name">
                        Name <input 
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Deck Name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </label>
                </div>
                <div className="formGroup">
                    <label htmlFor="description">
                        Description <textarea 
                            id="description"
                            type="textarea"
                            name="description"
                            placeholder="Deck Description"
                            onChange={handleChange}
                            value={formData.description}
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

export default DeckForm;