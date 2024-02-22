"use client";
/* ----- Third Party Imports ----- */
import { useEffect, useRef } from "react";

/* ----- Project Imports ----- */
import { useGameContext } from "@/context/game-context";
import Keyboard from "@/components/Keyboard";
import Display from "@/components/Display";
import ModalUnstyled from "@/components/Modal";

export default function PlayPage() {
  const { startNewGame, currentGame } = useGameContext();
  const smartUseEffect = useRef(false);
  useEffect(() => {
    if (!smartUseEffect.current) {
      console.log("i should only run one time");
      startNewGame();
    }
    return () => (smartUseEffect.current = true);
  }, []);
  return (
    <div>
      <Display />
      <ModalUnstyled />
      <Keyboard />
    </div>
  );
}
