import React from "react";
import Card from "./Card";

function CardList({cards, handleDelete}){
    return (
        <div>
            {cards.map((card) => (
                <Card key={card.id} card={card} handleDelete={() => handleDelete(card.id)}/>
            ))}
        </div>
    );
};

export default CardList;