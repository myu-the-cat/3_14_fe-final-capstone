import React from "react";
import { NavLink, useLocation } from "react-router-dom";


function Card({ card, handleDelete }){
   const { pathname } = useLocation();

   return(
       <div>
           <table>
               <tbody>
                   <tr>
                       <td>{card.front}</td>
                       <td>{card.back}</td>
                   </tr>
               </tbody>
           </table>
           <div>
               <NavLink to={`${pathname}/cards/${card.id}/edit`}>
                   <button>Edit</button>
               </NavLink>
               <button type="button" onClick={() => handleDelete(card.id)}>Delete</button>
           </div>
       </div>
   );
};

export default Card;