import { writable } from "svelte/store";

export async function getFiveLetterWord(randomWordsJSON: Array<string>) {
  try {
    return {
      status: 200,
      body: {
        randomWordsJSON
      }
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        error
      }
    }
  }

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

export const word_guess = writable<String>("Clone");
export const guess = writable<String>("");
export const game_over = writable<Boolean>(false);
export const game_over_Won = writable<Boolean>(false);
export const colors = writable(createGrid5x6());
export const board = writable(createGrid5x6());
