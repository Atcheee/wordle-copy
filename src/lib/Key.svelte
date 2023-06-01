<script lang="ts">
	export let char: string;
	export let keyPress;
	const specialKeyClass =
		char === "ENTER" || char === "DELETE" ? "key special" : "key";
</script>

<button class={specialKeyClass} on:click={() => keyPress(char.toUpperCase())}>
	{char.toUpperCase()}
</button>

<style>
	.key {
		background-color: var(--dark);
		border: none;
		border-radius: 0.25rem;
		color: #fff;
		font-size: 2rem;
		font-weight: bold;
		min-width: 3.5rem;
		max-width: 3.5rem;
		padding: 1rem 1rem;
		margin: 0.5rem 0.5rem;
		transition: background-color 0.3s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.key:hover {
		cursor: pointer;
		background-color: var(--light_blue);
	}
	.special {
		padding: 1rem 2rem;
		min-width: 10.75rem;
		max-width: 11.875rem;
	}
</style>
