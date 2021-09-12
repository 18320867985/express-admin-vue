<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data: function() {
			return {
			}
		},
		created() {
			this.$store.dispatch("initData");
		},
	}
</script>