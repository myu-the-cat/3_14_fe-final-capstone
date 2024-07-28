import React from "react";
import { NavLink } from "react-router-dom";

function Navigation({ props }){
    return(
        <nav>
            <ol className="breadcrumb">
                {props.map((prop, index) => (
                    prop.active ? (<li key={index}>{prop.title}</li> ) : 
                    ( <li key={index}> <NavLink to={prop.link}>{prop.title}</NavLink> </li> )
                ))}
            </ol>
        </nav>
    );
};

export default Navigation;