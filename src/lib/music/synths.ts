import * as Tone from "tone";

// backgruond instruments

export const percussionSynth = new Tone.MembraneSynth({
  pitchDecay: 0.008,
  octaves: 2,
  envelope: {
    attack: 0.0006,
    decay: 0.5,
    sustain: 0,
  },
  volume: -7,
}).toDestination();

export const subBassSynth = new Tone.AMSynth({
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

export const bassSynth = new Tone.MonoSynth({
  detune: -20,
  oscillator: {
    type: "triangle1",
  },
  envelope: {
    attack: 0.01,
    decay: 0.2,
    sustain: 0.4,
    attackCurve: "ripple",
  },
  filter: {
    type: "highpass",
  },
  volume: -5,
}).toDestination();

export const chordSynth = new Tone.PolySynth({
  volume: -20,
  options: {
    detune: -20,
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

// lead

export const mainSynth = new Tone.PolySynth({
  volume: -10,
  maxPolyphony: 25,
  voice: Tone.FMSynth,
  options: {
    detune: -20,
    oscillator: {
      type: "fatsine3",
    },
    envelope: {
      attack: 0.005,
      decay: 0.022,
      sustain: 1,
      release: 4,
    },
    modulation: {
      type: "fattriangle18",
    },
  },
}).toDestination();

// harmony
export const harmonySynth = new Tone.PolySynth({
  volume: -5,
  maxPolyphony: 100,
  voice: Tone.MonoSynth,
  options: {
    detune: -20,
    oscillator: {
      type: "fatsine3",
    },
    envelope: {
      attack: 0.05,
      decay: 1.2,
      sustain: 1,
      release: 8,
    },
  },
});

// add reverb
const haromnyReverb = new Tone.Reverb({
  decay: 100,
  wet: 0.5,
});

harmonySynth.connect(haromnyReverb).toDestination();

export const arpSynth = new Tone.AMSynth({
  volume: -7,
  modulation: {
    type: "sine30",
  },
  modulationEnvelope: {
    attack: 0.01,
    decay: 0.2,
  },
  oscillator: {
    type: "fatsquare15",
  },
}).toDestination();
