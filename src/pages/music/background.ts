import * as Tone from "tone";

export function ambience() {
  // percussion
  const percussionSynth = new Tone.MembraneSynth({
    pitchDecay: 0.008,
    octaves: 2,
    envelope: {
      attack: 0.0006,
      decay: 0.5,
      sustain: 0,
    },
    volume: -7,
  }).toDestination();

  const percussionPart = new Tone.Part(
    function (time, value) {
      percussionSynth.triggerAttackRelease(value.note, value.duration, time);
    },
    [
      { time: 0, note: "C2", duration: "8n" },
      { time: "0:1:2", note: "G2", duration: "8n" },
      { time: "0:2", note: "F2", duration: "8n" },
      { time: "0:3:2", note: "C2", duration: "8n" },
      { time: "0:4", note: "G1", duration: "8n" },
      { time: "0:4:2", note: "G2", duration: "8n" },
    ]
  ).start(0);

  // loop
  percussionPart.loop = true;

  // sub bass
  const subBassSynth = new Tone.AMSynth({
    envelope: {
      attack: 0.001,
      decay: 0.2,
    },
    modulation: {
      type: "square10",
    },
    modulationEnvelope: {
      attack: 0.2,
      decay: 0.01,
    },
    volume: -10,
  }).toDestination();

  const subBassPart = new Tone.Part(
    function (time, value) {
      subBassSynth.triggerAttackRelease(value.note, value.duration, time);
    },
    [{ time: 0, note: "C1", duration: "1n" }]
  ).start(0);

  // loop
  subBassPart.loop = true;

  // bass
  const bassSynth = new Tone.FMSynth({
    modulation: {
      type: "triangle12",
    },
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.4,
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.4,
    },
    volume: -15,
  }).toDestination();

  const bassPattern = new Tone.Pattern(
    function (time, note) {
      bassSynth.triggerAttackRelease(note, "8n", time);
    },
    ["C2", "E2", "G2", "C3", "E3", "G3", "C4", "E4", "G4"],
    "randomWalk"
  ).start(0);

  // randomly detune the bass synth every 4 measures
  const detunePattern = new Tone.Pattern({
    callback: function (time, value) {
      if (value) bassSynth.detune.value = value;
    },
    values: [0, 24, -24, 34, -34, 12, -12, 0],
    pattern: "randomWalk",
    interval: "4m",
  }).start(0);

  // chords
  const chordSynth = new Tone.PolySynth({
    volume: -15,
    options: {
      oscillator: {
        type: "fatsine3",
        count: 3,
        spread: 30,
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.5,
        release: 0.4,
        attackCurve: "exponential",
      },
    },
  }).toDestination();

  const chordPart = new Tone.Part(
    function (time, value) {
      chordSynth.triggerAttackRelease(value.notes, value.duration, time);
    },
    [
      { time: 0, notes: ["C3", "E3", "G3"], duration: "1n" },
      { time: "0:2", notes: ["C3", "F3", "G3"], duration: "1n" },
    ]
  ).start(0);

  // loop
  chordPart.loop = true;
}
