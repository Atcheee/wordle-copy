<script lang="ts">
	import { board, colors } from "../store";

	export let x: number;
	export let y: number;

	$: letter = $board[y][x];
	$: color = $colors[y][x];
</script>

<div class={`cell ${color}`}>{letter}</div>

<style>
	.cell {
		background-color: var(--bg);
		border: 1px solid #fff;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: bold;
		height: 4rem;
		width: 4rem;
		margin: 0.5rem;
		transition: background-color 0.7s ease-in-out;
	}
	.green {
		background-color: var(--green);
	}
	.orange {
		background-color: var(--orange);
	}
	.red {
		background-color: var(--red);
	}
</style>
