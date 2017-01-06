/*这里实际上就是变态了一下,把index.html
*里面的移来这里,这个当做实例化的root
*原理实际上都差不多啊
*/
<style></style>
<template>
	<div>
		<router-view></router-view>
	</div>
</template>
<script>
	import store from '../store'
	export default{
		store
	}
</script>