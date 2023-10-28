import * as Tone from "tone";
// import { Piano } from "@tonejs/piano/build/piano/Piano";
import { ambience } from "./background";
import { playKeys, stopKeys } from "./play";
import {
  setBluesScale,
  setMajorScale,
  setMelodicMinorScale,
  setMinorScale,
  setMixolydianScale,
  setPentatonicMinorScale,
  setPentatonicScale,
} from "./scales";

let isStarted = false;

const allowedKeys = ["a", "s", "d", "f", "g", "h", "j", "k"];
const keysPressed = new Map<string, boolean>();

// export let piano: Piano;

window?.addEventListener("keydown", async (event) => {
  if (!isStarted) {
    isStarted = true;
    await init();
  }

  if (!keysPressed.get(event.key) && allowedKeys.includes(event.key)) {
    keysPressed.set(event.key, true);
    playKeys(keysPressed);
  }
});

window?.addEventListener("keyup", (event) => {
  if (allowedKeys.includes(event.key)) {
    keysPressed.set(event.key, false);
    stopKeys(event.key, keysPressed);
  }
});

// utils

async function init() {
  const soundPromise = Tone.start().then(() => {
    console.log("audio is ready");
  });

  await soundPromise;

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

  ambience();
  setMajorScale();
}
