import { writable } from "svelte/store";
import textFile from '../src/lib/data/five-letter-words.json';

// TODO: Fix fs and get random word from .txt file

export const random_five_letter_word = () => {
  console.log(textFile[Math.floor(Math.random() * textFile.length)]);
}

export const createGrid5x6 = () => {
  const grid = [];
  for (let i = 0; i < 6; i++) {
    grid.push([]);
    for (let j = 0; j < 5; j++) {
      grid[i][j] = ""
    }
  }
  return grid;
}

export const gameInfo = writable({
  char: 0,
  attempt: 0,
});

export const word_guess = writable<String>("Hello");
export const guess = writable<String>("");
export const game_over = writable<Boolean>(false);
export const game_over_Won = writable<Boolean>(false);
export const colors = writable(createGrid5x6());
export const board = writable(createGrid5x6());