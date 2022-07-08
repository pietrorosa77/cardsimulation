import React from "react";
import back from './back'
import won from './won'
import lost from './lost'

export default ({ onCardClick, show, number, winning }) => {
    const cardClick = () => {
        onCardClick(number)
    }
    return (
        <div className="cardContent" onClick={cardClick}>
            {show && winning && <img className="cardResult crimg" src={won} />}
            {show && !winning && <img className="cardResult crimg" src={lost} />}
            {!show && <img className="cardBack crimg" src={back} />}
        </div>
    )
}

