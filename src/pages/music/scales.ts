export const keys = new Map();

export function setPentatonicScale() {
  keys.set("a", "C4");
  keys.set("s", "D4");
  keys.set("d", "E4");
  keys.set("f", "G4");
  keys.set("g", "A4");
  keys.set("h", "C5");
  keys.set("j", "D5");
  keys.set("k", "E5");
}

export function setMajorScale() {
  keys.set("a", "C4");
  keys.set("s", "D4");
  keys.set("d", "E4");
  keys.set("f", "F4");
  keys.set("g", "G4");
  keys.set("h", "A4");
  keys.set("j", "B4");
  keys.set("k", "C5");
}

export function setMinorScale() {
  keys.set("a", "C4");
  keys.set("s", "D4");
  keys.set("d", "Eb4");
  keys.set("f", "F4");
  keys.set("g", "G4");
  keys.set("h", "Ab4");
  keys.set("j", "Bb4");
  keys.set("k", "C5");
}

export function setBluesScale() {
  keys.set("a", "C4");
  keys.set("s", "Eb4");
  keys.set("d", "F4");
  keys.set("f", "Gb4");
  keys.set("g", "G4");
  keys.set("h", "Bb4");
  keys.set("j", "C5");
  keys.set("k", "Eb5");
}

export function setMixolydianScale() {
  keys.set("a", "C4");
  keys.set("s", "D4");
  keys.set("d", "E4");
  keys.set("f", "F4");
  keys.set("g", "G4");
  keys.set("h", "A4");
  keys.set("j", "Bb4");
  keys.set("k", "C5");
}

export function setMelodicMinorScale() {
  keys.set("a", "C4");
  keys.set("s", "D4");
  keys.set("d", "Eb4");
  keys.set("f", "F4");
  keys.set("g", "G4");
  keys.set("h", "A4");
  keys.set("j", "B4");
  keys.set("k", "C5");
}

export function setPentatonicMinorScale() {
  keys.set("a", "C4");
  keys.set("s", "Eb4");
  keys.set("d", "F4");
  keys.set("f", "G4");
  keys.set("g", "Bb4");
  keys.set("h", "C5");
  keys.set("j", "Eb5");
  keys.set("k", "F5");
}
