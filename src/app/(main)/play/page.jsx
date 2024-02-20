"use client";
import Keyboard from "@/components/Keyboard";
import Display from "@/components/display";
import { useEffect, useRef } from "react";
import { useGameContext } from "@/context/game-context";
import { checkGame } from "@/lib/checkDB";
import { getUserId } from "@/lib/users";


export default function PlayPage() {
    const {startNewGame} = useGameContext ();
    const smartUseEffect = useRef(false);
    useEffect(() => {
      startNewGame();
      if (smartUseEffect.current) {
        return
      }
      smartUseEffect.current = true;
    }, []);
  return (
    <div>
      <Display />
      <Keyboard />
    </div>
  );
}
