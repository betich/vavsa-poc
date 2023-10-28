import * as Tone from "tone";
import { harmonySynth, mainSynth } from "./synths";
import { keys } from "./scales";

export function playKeys(playedKeys: Map<string, boolean>) {
  // record the sounds
  playedKeys.forEach((isPressed, key) => {
    if (isPressed) {
      const note = keys.get(key);
      if (note) {
        mainSynth.triggerAttack(note);

        const [third, fifth, seventh] = harmonize(note);

        // harmonySynth.triggerAttackRelease(third, "8n");
        // harmonySynth.triggerAttackRelease(fifth, "8n");
        // harmonySynth.triggerAttackRelease(seventh, "8n");
      }
    }
  });
}

export function stopKeys(pressedKey: string, playedKeys: Map<string, boolean>) {
  const now = Tone.now();

  // stop the sound
  const note = keys.get(pressedKey);
  if (note) {
    mainSynth.triggerRelease(note, now);
  }

  // if all keys are released, stop the synth
  if (!Array.from(playedKeys.values()).some((isPressed) => isPressed)) {
    mainSynth.releaseAll(now);
  }
}

function harmonize(note: string) {
  // fifth
  const fifth = Tone.Frequency(note).transpose(7).toNote();
  // third
  const third = Tone.Frequency(note).transpose(4).toNote();
  // seventh
  const seventh = Tone.Frequency(note).transpose(10).toNote();

  return [note, third, fifth, seventh];
}
