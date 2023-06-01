<script lang="ts">
	import { board } from "../store";
	import Cells from "./Cells.svelte";
</script>

<div class="board">
	{#each $board as column, y}
		<div class="row">
			{#each column as row, x}
				<Cells {x} {y} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.board {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.row {
		display: flex;
		flex-direction: row;
	}
</style>
