import React from "react";

export default ({ onCardClick, show, number, winning }) => {
    const cardClick = () => {
        onCardClick(number)
    }
    return (
        <div className="cardContent" onClick={cardClick}>
            {show && winning && <img className="cardResult crimg" src="https://playweb.biz/GuerrillaLeTerrazze/Content/LT_carte_gioco_fronte_vincita.png" />}
            {show && !winning && <img className="cardResult crimg" src="https://playweb.biz/GuerrillaLeTerrazze/Content/LT_carte_gioco_fronte_NOvincita.png" />}
            {!show && <img className="cardBack crimg" src="https://playweb.biz/GuerrillaLeTerrazze/Content/LT_carte_gioco_retro.png" />}
        </div>
    )
}

