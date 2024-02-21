"use client";
import { useGameContext } from "@/context/game-context";

export default function Display() {
  let { display1 } = useGameContext();
  let { display2 } = useGameContext();
  let { display3 } = useGameContext();
  let { display4 } = useGameContext();
  let { display5 } = useGameContext();

  let { display1state } = useGameContext();
  let { display2state } = useGameContext();
  let { display3state } = useGameContext();
  let { display4state } = useGameContext();
  let { display5state } = useGameContext();

  const { row1, row2 } = useGameContext();

  return (
    <div id="line">
      {/* <p className={`display-box ${display1state}`}>{display1}</p>
      <p className={`display-box ${display2state}`}>{display2}</p>
      <p className={`display-box ${display3state}`}>{display3}</p>
      <p className={`display-box ${display4state}`}>{display4}</p>
      <p className={`display-box ${display5state}`}>{display5}</p> */}
      {row1.map((object, index) => { return (
          <div key={`row1 + ${object.value} + ${object.class} + ${index}`}>
            <p className={`display-box ${object.class}`}>{object.value}</p>
          </div>
        )
        })}
      {row2.map((object, index) => { return (
          <div key={`row2 + ${object.value} + ${object.class} + ${index}`}>
            <p className={`display-box ${object.class}`}>{object.value}</p>
          </div>
        )
        })}
    </div>
  );
}
