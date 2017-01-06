<style scoped></style>
<template>
	<div>
		<h1>this is list</h1>
		<div v-for="x in list">
			<strong>{{x.title?x.title:''}}</strong>
			<strong>{{x.keyword?x.keyword:''}}</strong>
			<strong>{{x.content?x.content:''}}</strong>
		</div>
	</div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
	import * as actions from '../store/action-types'
	export default{
		data(){
			return {
				list:[]
			}
		},
		ready(){
			this.get_list()
		},
		computed:{
			...mapState({
				
			})
		},
		methods:{
			...mapActions({
				
			}),
			//action异步也可以执行再次,某个actionOK后才执行
			get_list(){
				this.$store.dispatch({
					type:actions.get_list,
				})
				.then(()=>{
					console.warn(this.$store.state.list.list)
					this.list = this.list.concat(this.$store.state.list.list)
					console.log(this.list)
				})
			}
		}
	}
</script>