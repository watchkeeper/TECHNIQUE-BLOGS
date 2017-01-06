<style></style>
<template>
	<div>
		<h1>{{head_title}}</h1>
		<input v-model="user_input" placeholder="your title">
		<button 
			type="button" 
			@click="change_header"
		>
		change header
		</button>
	</div>
</template>
<script >
	import {mapGetters,mapActions,mapState} from 'vuex'
	import * as actions from '../store/action-types'
	export default{
		ready(){
			// this.test()
		},
		data(){
			return {
				head_title:"dd",
				user_input:""
			}
		},
		//其中一般是state和getters
		computed:{
			// head_title(){
			// 	// return this.$store.state.head_title
			// 	return this.$store.getters.add_username
			// }
			//假如用mapGetters来处理
			...mapGetters({
				head_title:'add_username'
			})
		},
		//其中一般是actions或者少数的mutations
		methods:{
			//任何的数据,不能乱了秩序,都必须走action,通过store来交互,否则谈个屁的管理
			change_header(){
				// console.info(this.$store.state.head_title)
				this.$store.dispatch(actions.show_head_title,{
					head_title:this.user_input
				})
			}
			//假如使用mapActions,但是怎么带payload啊fuck?
			// ...mapActions({
			// 	change_header:'show_head_title'
			// })
		}
	}
</script>