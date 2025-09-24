<template>
	<div class="containeropo">
		<!-- <img class="image" src="@/assets/images/tu.png" alt="lineIcon"> -->
		<span class="text">{{text}}</span>
	</div>
</template>

<script>
	
	// import "@/assets/css/subscriptionTool.scss";
	export default {
	  name: 'titleChildBar',
	  props:['text']
	  }
	
</script>
<style scoped lang="scss">
	.containeropo {
		height: 30px;
		display: flex;
		/* 使用Flexbox布局 */
		align-items: center;
	
		/* 垂直居中对齐 */
		.image {
			height: 30px;
			/* 或者你需要的任何尺寸 */
			margin-right: -20px;
			/* 右边距，可根据需要调整 */
		}
	
		.text {
			flex-grow: 1;
			font-weight: 600;
			font-size: 16px;
			color: #000000;
	
			/* 允许文本占据剩余空间 */
		}
	}
</style>

