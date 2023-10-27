import * as Tone from "tone";
import { Piano } from "@tonejs/piano/build/piano/Piano";
import { ambience } from "./background";
import { playLead } from "./lead";

let isStarted = false;
const keysPressed: Record<string, boolean> = {};

export let piano: Piano;

window?.addEventListener("keydown", async (event) => {
  if (!isStarted) {
    isStarted = true;
    await init();
    ambience();
  }

  if (!keysPressed[event.key]) {
    playLead(keysPressed);
    keysPressed[event.key] = true;
  }
});

window?.addEventListener("keyup", (event) => {
  delete keysPressed[event.key];
});

// utils

async function init() {
  const soundPromise = Tone.start().then(() => {
    console.log("audio is ready");
  });

  const newPiano = new Piano({
    velocities: 5,
  });

  const pianoPromise = newPiano.load().then(() => {
    console.log("piano loaded!");
  });
  newPiano.toDestination();

  await Promise.all([soundPromise, pianoPromise]);

  piano = newPiano;

  // randomly change tempo from 80 to 100 to 120 every 4 measures
  const tempoPattern = new Tone.Pattern({
    callback: function (time, value) {
      if (value) Tone.Transport.bpm.value = value;
    },
    values: [95, 100, 110, 120],
    pattern: "randomWalk",
    interval: "4m",
  }).start(0);

  Tone.Transport.start();
}
