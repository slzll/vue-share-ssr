<template>
	<div class="social-share"></div>
</template>

<script>
	import "./social-share/js/social-share";
	import "./social-share/css/share.scss"
	export default {
		name: "share",
		props: {
			config: {
				type: Object
			}
		},
		mounted() {
			window.socialShare(this.$el, this.config);
		}
	};
</script>