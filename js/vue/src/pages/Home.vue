<style></style>
<template>
	<div>
		<head-compoent></head-compoent>
		<foot-compoent></foot-compoent>
	</div>
</template>
<script>
	import Head from '../components/Head'
	import Foot from '../components/Foot'
	export default{
		data(){
			return {

			}
		},
		components:{
			"headCompoent":Head,
			footCompoent:Foot
		}
	}
</script>