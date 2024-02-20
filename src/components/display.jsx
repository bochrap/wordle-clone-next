"use client";
import { useGameContext } from "@/context/game-context";


export default function Display() {

    let { display1 } = useGameContext();
    let { display2 } = useGameContext();
    let { display3 } = useGameContext();
    let { display4 } = useGameContext();
    let { display5 } = useGameContext();


    return(
        <div id="line">
        <p className="display-box">{display1}</p>
        <p className="display-box">{display2}</p>
        <p className="display-box">{display3}</p>
        <p className="display-box">{display4}</p>
        <p className="display-box">{display5}</p>
      </div>
    )
}