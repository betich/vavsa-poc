import * as Tone from "tone";
import { Piano } from "@tonejs/piano/build/piano/Piano";

let isStarted = false;
const keysPressed: Record<string, boolean> = {};

let piano: Piano;

window?.addEventListener("keydown", async (event) => {
  if (!isStarted) {
    isStarted = true;
    await init();
    ambience();
  }

  if (!keysPressed[event.key]) {
    playMusic(keysPressed);
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
}

function playMusic(keysPressed: Record<string, boolean>) {
  //create a synth and connect it to the main output (your speakers)
  const now = Tone.now();
  const note = "C4";
  const duration = 0.5;

  lead(note, now, duration);
  harmonize(note, now, duration);
}

function lead(note: string, now: number, duration: number) {
  const synth = new Tone.AMSynth({
    modulation: {
      type: "sine1",
    },
  }).toDestination();

  // trigger the attack immediately
  synth.triggerAttack(note, now);
  // wait x second before triggering the release
  synth.triggerRelease(now + duration);

  const part = new Tone.Part(
    function (time, value) {
      //the value is an object which contains both the note and the velocity
      synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    },
    [
      { time: 0, note: "C3", velocity: 0.9 },
      { time: "0:2", note: "C4", velocity: 0.5 },
    ]
  ).start(0);
}

function harmonize(note: string, now: number, duration: number) {
  const [noteName, octave] = note.split("");
}

function ambience() {
  // percussion
  const synthA = new Tone.MembraneSynth({
    pitchDecay: 0.008,
    octaves: 2,
    envelope: {
      attack: 0.0006,
      decay: 0.5,
      sustain: 0,
    },
    volume: -7,
  }).toDestination();
  const loopA = new Tone.Loop((time) => {
    synthA.triggerAttackRelease("C2", "8n", time);
    synthA.triggerAttackRelease("C1", "8n", time + 1);
    synthA.triggerAttackRelease("G3", "8n", time + 2);
    synthA.triggerAttackRelease("C2", "8n", time + 3);
  }, "8n").start(0);

  // bass
  const synthB = new Tone.FMSynth({
    envelope: {
      attack: 0.01,
      decay: 0.2,
    },
    modulation: {
      type: "amsawtooth",
    },
    modulationEnvelope: {
      attack: 0.2,
      decay: 0.01,
    },
    volume: -10,
  }).toDestination();
  const loopB = new Tone.Loop((time) => {
    synthB.triggerAttackRelease("C2", "2n");
    synthB.triggerAttackRelease("F2", "2n", time + 1);
  }, "1n").start(0);

  // harmony
  const synthC = new Tone.PolySynth({
    voice: Tone.Synth,
    options: {
      oscillator: {
        type: "triangle",
      },
      envelope: {
        attack: 0.01,
        decay: 0.25,
      },
    },
    volume: -15,
  }).toDestination();

  const loopC = new Tone.Loop((time) => {
    // CMaj7add9
    synthC.triggerAttackRelease(
      ["B3", "C4", "D4", "E4", "G4"],
      "2n",
      Tone.Time(time).quantize("2n")
    );

    // FMaj7add9
    synthC.triggerAttackRelease(
      ["A3", "C4", "D4", "E4", "G4"],
      "2n",
      Tone.Time(time + 1).quantize("2n")
    );
  }, "1n").start(0);

  Tone.Transport.start();
  Tone.Transport.bpm.value = 80;
}
