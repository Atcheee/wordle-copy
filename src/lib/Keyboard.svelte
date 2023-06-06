<script lang="ts">
	import Key from "./Key.svelte";
	// import textFile from "../lib/data/five-letter-words.json";
	import {
		board,
		gameInfo,
		word_guess,
		guess,
		colors,
		game_over,
		game_over_Won,
	} from "../store";

	const row1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const row2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const row3: string[] = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

	const handleEnterKey = () => {
		let { attempt, char } = $gameInfo;

		if (char !== 5) {
			return;
		}
		gameInfo.set({ attempt: attempt + 1, char: 0 });

		const prevAttempt = $gameInfo.attempt - 1;
		const newColors = $colors;

		const duplicateChars = new Set();

		for (let i = 0; i < 5; i++) {
			let char = $board[prevAttempt][i].toUpperCase();
			guess.update((prevChars) => prevChars + char);

			if ($word_guess[i].toUpperCase() === char) {
				newColors[prevAttempt][i] = "green";
			} else if ($word_guess.toUpperCase().includes(char)) {
				if (!duplicateChars.has(char)) {
					duplicateChars.add(char);
					newColors[prevAttempt][i] = "orange";
					continue;
				}
			} else {
				newColors[prevAttempt][i] = "red";
			}
			colors.set(newColors);
		}
		if ($guess.toUpperCase() == $word_guess.toUpperCase()) {
			game_over.set(true);
			game_over_Won.set(true);
		} else if (prevAttempt === 5) {
			game_over.set(true);
			game_over_Won.set(false);
		} else {
			guess.set("");
		}
	};

	const handleDeleteKey = () => {
		let { attempt, char } = $gameInfo;

		if (!(char > 0)) {
			return;
		}

		board.update((prevBoard) => {
			const newBoard = [...prevBoard];
			newBoard[attempt][--char] = "";
			return newBoard;
		});

		gameInfo.set({ attempt, char });
	};

	const keyPress = (key = "") => {
		let { attempt, char } = $gameInfo;

		if (key === "ENTER" && $game_over === false) {
			handleEnterKey();
		} else if (key === "DELETE" && $game_over === false) {
			handleDeleteKey();
		} else {
			if (char < 5) {
				board.update((prevBoard) => {
					const newBoard = [...prevBoard];
					newBoard[attempt][char++] = key;
					return newBoard;
				});

				gameInfo.set({ attempt, char });
			}
		}
	};

	// TODO: When the word is guessed, open the modal

	function onKeyDown(e: KeyboardEvent) {
		const isValidLetter = /^[a-z/A-Z]$/i.test(e.key);
		if (e.key === "Backspace") {
			keyPress("DELETE");
		} else if (e.key === "Enter") {
			keyPress("ENTER");
		} else if (!isValidLetter) {
			return;
		} else {
			keyPress(e.key.toUpperCase());
		}
	}
</script>

<div class="keyboard">
	<div class="row">
		{#each row1 as char}
			<Key {char} {keyPress} />
		{/each}
	</div>
	<div class="row">
		{#each row2 as char}
			<Key {char} {keyPress} />
		{/each}
	</div>
	<div class="row">
		{#each row3 as char}
			<Key {char} {keyPress} />
		{/each}
	</div>
</div>

<svelte:window on:keydown={(e) => onKeyDown(e)} />

<style>
	.keyboard {
		position: fixed;
		width: fit-content;
		bottom: 2rem;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
