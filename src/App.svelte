<script lang="ts">
	import { fade } from "svelte/transition";
	import Board from "./lib/Board.svelte";
	import GameOver from "./lib/GameOver.svelte";
	import Keyboard from "./lib/Keyboard.svelte";

	import { game_over } from "./store";
</script>

<main>
	<nav>Wordle Clone</nav>

	{#if $game_over}
		<GameOver />
	{/if}
	<div in:fade={{ duration: 800 }}>
		<Board />
		<Keyboard />
	</div>
</main>

<style>
	nav {
		color: #fff;
		font-weight: bold;
		padding: 1rem;
		font-size: 2rem;
		text-align: center;
		margin-bottom: 2rem;
	}
	main {
		background-color: var(--bg);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
