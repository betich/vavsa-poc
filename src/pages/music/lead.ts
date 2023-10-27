import * as Tone from "tone";

export function playLead(keysPressed: Record<string, boolean>) {
  //create a synth and connect it to the main output (your speakers)
  const now = Tone.now();
  const note = "C4";
  const duration = "8n";

  lead(note, now, duration);
  harmonize(note, now, duration);
}

function lead(note: string, now: number, duration: Tone.Unit.Time) {
  // arpeggio
  const arpSynth = new Tone.AMSynth({
    volume: -7,
    modulation: {
      type: "sine30",
    },
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.5,
    },
    oscillator: {
      type: "fatsquare15",
    },
  }).toDestination();
  const arpPart = new Tone.Pattern({
    callback: function (time, note) {
      if (note) arpSynth.triggerAttackRelease(note, "16n", time);
    },
    interval: "8n",
    values: ["C4", "E4", "G4", "B3"],
    pattern: "up",
    humanize: true,
  });
  arpPart.start(0);

  // randomly detune the bass synth every 4 measures
  const detunePattern = new Tone.Pattern({
    callback: function (time, value) {
      if (value) arpSynth.detune.value = value;
    },
    values: [0, 24, -24, 34, -34, 12, -12, 0],
    pattern: "randomWalk",
    interval: "4m",
  }).start(0);

  // const mainSynth = new Tone.AMSynth({
  //   volume: -7,
  //   modulation: {
  //     type: "sine30",
  //   },
  //   modulationEnvelope: {
  //     attack: 0.01,
  //     decay: 0.5,
  //   },
  //   oscillator: {
  //     type: "fatsquare15",
  //   },
  // }).toDestination();
  // mainSynth.triggerAttackRelease(note, duration, now);
}

function harmonize(note: string, now: number, duration: Tone.Unit.Time) {
  const [noteName, octave] = note.split("");
}
