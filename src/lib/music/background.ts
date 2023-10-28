import * as Tone from "tone";
import { bassSynth, chordSynth, percussionSynth, subBassSynth } from "./synths";

export function ambience() {
  // percussion
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
  const subBassPart = new Tone.Part(
    function (time, value) {
      subBassSynth.triggerAttackRelease(value.note, value.duration, time);
    },
    [{ time: 0, note: "C1", duration: "1n" }]
  ).start(0);

  // loop
  subBassPart.loop = true;

  // bass
  const bassPattern = new Tone.Pattern(
    function (time, note) {
      bassSynth.triggerAttackRelease(note, "8n", time);
    },
    ["C3", "D3", "D#3", "E3", "F#3", "G#3", "A#3", "C3", "D3", "D#3", "E3"],
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
  const chordPart = new Tone.Part(
    function (time, value) {
      chordSynth.triggerAttackRelease(value.notes, value.duration, time);
    },
    [
      { time: 0, notes: ["C3", "E3", "G3"], duration: "1n" },
      { time: "1", notes: ["C3", "F3", "G3"], duration: "1n" },
      { time: "2", notes: ["F3", "A3", "C3"], duration: "1n" },
      { time: "3", notes: ["F3", "Bb3", "C3"], duration: "1n" },
    ]
  ).start(0);

  // loop
  chordPart.loop = true;
}
