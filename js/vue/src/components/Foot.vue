<style></style>
<template>
	<div>
		<strong>{{foot_title}}</strong>
		<button type="button" @click="change_footer">
		change footer
		</button>
	</div>
</template>
<script >
	import {mapState,mapActions} from 'vuex'
	import * as actions from '../store/action-types'
	export default{
		data(){
			return {
				foot_title:""
			}
		},
		computed:{
			...mapState({
				foot_title:'foot_title'
			})
		},
		methods:{
			...mapActions({
				change_footer:actions.show_foot_title
			})
		}
	}
</script>