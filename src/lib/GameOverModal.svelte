<script lang="ts">
	import {
		createGrid5x6,
		gameInfo,
		guess,
		game_over,
		game_over_Won,
		colors,
		board,
		getFiveLetterWord,
		word_guess,
	} from "../store";

	import fiveLetterWords from "../lib/data/five-letter-words.json";

	async function returnWord(): Promise<any> {
		const returnValue = await getFiveLetterWord(fiveLetterWords);
		return returnValue;
	}

	const playAgain = () => {
		returnWord().then((word) => {
			const randomWord =
				word.body.fiveLetterWords[Math.floor(Math.random() * 9079)];

			word_guess.set(randomWord.toUpperCase());
		});

		gameInfo.set({ attempt: 0, char: 0 });
		guess.set("");
		game_over.set(false);
		game_over_Won.set(false);
		colors.set(createGrid5x6());
		board.set(createGrid5x6());
	};

	export let showModal: Boolean; // boolean

	let dialog: any; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => {
		showModal = false;
		playAgain();
	}}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>Play Again</button>
	</div>
</dialog>

<style>
	dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		width: 8rem;
		height: 2rem;
		position: relative;
		left: 50%;
		right: 50%;
		transform: translate(-50%, 25%);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button:hover {
		cursor: pointer;
	}
</style>
