"use client";
import Keyboard from "@/components/Keyboard";
import Display from "@/components/display";
import { useEffect } from "react";
import { useGameContext } from "@/context/game-context";


export default function PlayPage() {
    const {startNewGame} = useGameContext ();
    useEffect(() => {
      startNewGame();
    }, []);
  return (
    <div>
      <Display />
      <Keyboard />
    </div>
  );
}
