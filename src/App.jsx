import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import "./app.css"
import CardContent from "./CardContent"

gsap.registerPlugin(Flip)

const getGameResult = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('win');
}

export default () => {
  const shouldWin = getGameResult();
  const [finalResult, setFinalResult] = useState()
  const [ready, setReady] = useState(false);
  const [showcard, setShowCard] = useState(-1);
  const cardRef1 = useRef()
  const cardRef2 = useRef()
  const cardRef3 = useRef()
  const cards = useRef()
  const grid = useRef()
  const repeatLimit = 3;
  const repeatCount = useRef(0)


  useEffect(() => {
    cards.current = gsap.utils.toArray(".card");
    gsap.set(".quickflip", {
      transformStyle: "preserve-3d",
      transformPerspective: 1000
    });
    const tl = gsap.timeline({ repeat: 0, onComplete: shuffle });
    tl.to(cardRef1.current, { rotation: "+=360", duration: 0.5 });
    tl.to(cardRef2.current, { rotation: "+=360", duration: 0.5 });
    tl.to(cardRef3.current, { rotation: "+=360", duration: 0.5 });

  }, [])


  const shuffle = () => {
    if (repeatCount.current === repeatLimit) {
      setReady(true)
      return 0;
    }

    repeatCount.current += 1;
    // Get the state
    const state = Flip.getState(cards.current);

    // Do the actual shuffling
    for (let i = cards.current.length; i >= 0; i--) {
      grid.current.appendChild(grid.current.children[Math.random() * i | 0]);
    }

    // Animate the change
    Flip.from(state, {
      absolute: true,
      delay: .2,
      duration: .4,
      onComplete: shuffle
    });
  }

  const cardClick = (cardNum) => {
    if (!ready || ![1, 2, 3].includes(cardNum)) {
      return;
    }

    const mapcard = {
      1: cardRef1.current,
      2: cardRef2.current,
      3: cardRef3.current
    }

    gsap.to(mapcard[cardNum], { rotationY: "+=360", duration: 0.5, onComplete: () => completeGame(cardNum) });

  }

  const completeGame = (cardNum) => {
    setReady(false);
    setShowCard(cardNum)
    setFinalResult(shouldWin ? 'VITTORIA' : 'SCONFITTA')
  }

  const className = ready ? "card play" : "card"
  return (
    <>
      <div className="container" ref={grid}>
        <div className={className} ref={cardRef1}>
          <CardContent show={showcard === 1} onCardClick={cardClick} number={1} winning={shouldWin} />
        </div>
        <div className={className} ref={cardRef2}>
          <CardContent show={showcard === 2} onCardClick={cardClick} number={2} winning={shouldWin} />
        </div>
        <div className={className} ref={cardRef3}>
          <CardContent show={showcard === 3} onCardClick={cardClick} number={3} winning={shouldWin} />
        </div>
      </div>
      {ready && <div className="centerTitle">Seleziona una carta!</div>}
      {finalResult === 'VITTORIA' && <div className="centerTitle won">HAI VINTO!</div>}
      {finalResult === 'SCONFITTA' && <div className="centerTitle lost">HAI PERSO!</div>}
    </>
  )
}
