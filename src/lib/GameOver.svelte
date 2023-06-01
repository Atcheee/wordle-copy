<script lang="ts">
	import Modal from "./GameOverModal.svelte";

	import { word_guess, game_over_Won } from "../store";

	let showModal: Boolean = true;
</script>

{#if $game_over_Won}
	<Modal bind:showModal>
		<h2 slot="header">
			Good Job!
			<small>The correct word was: "{$word_guess}"</small>
		</h2>
	</Modal>
{:else}
	<Modal bind:showModal>
		<h2 slot="header">
			Unlucky!
			<br />
			<small>
				The correct word was: "{$word_guess}", you can play again and see if you
				can guess the correct word next time!</small
			>
		</h2>
	</Modal>
{/if}
