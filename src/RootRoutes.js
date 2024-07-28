import React from "react";
import { Routes, Route } from "react-router-dom";
import DeckList from "./component/deck/DeckList";
import DeckForm from "./component/deck/DeckForm";
import DeckScreen from "./component/deck/DeckScreen";
import Study from "./component/study/Study";
import DeckEdit from "./component/deck/DeckEdit";
import CardCreate from "./component/card/CardCreate";
import CardEdit from "./component/card/CardEdit";
import NotFound from "../src/Layout/NotFound";


function RootRoutes(){
    return (
        <Routes>
            <Route path="/" element={<DeckList />} />
            <Route path="/decks" element={<DeckList />} />
            <Route path="/decks/new" element={<DeckForm />} />
            <Route path="/decks/:deckId" element={<DeckScreen />} />
            <Route path="/decks/:deckId/study" element={<Study />} />
            <Route path="/decks/:deckId/edit" element={<DeckEdit />} />
            <Route path="/decks/:deckId/cards/new" element={<CardCreate />} />
            <Route path="/decks/:deckId/cards/:cardId/edit" element={<CardEdit />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default RootRoutes;