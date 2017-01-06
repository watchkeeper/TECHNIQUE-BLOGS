<style scoped>
	strong{
		color:red;
	}
</style>
<template>
	<div>
		<strong>THIS IS HEADER</strong>
		<head-component></head-component>
		<hr>
		<list-component></list-component>
		<hr>
		<strong>THIS IS FOOTER</strong>
		<foot-component></foot-component>
	</div>
</template>
<script>
	import Head from '../components/Head'
	import Foot from '../components/Foot'
	import List from '../components/List'
	export default{
		data(){
			return {

			}
		},
		components:{
			headComponent:Head,
			footComponent:Foot,
			listComponent:List
		}
	}
</script>