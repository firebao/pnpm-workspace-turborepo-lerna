<template>
	<div class="nunsdufs-sdiidnusr" :class="[funavtvir(1)]">
		<div class="nsidnsf-mineir barcolor1" v-if="1==1">

		</div>
		<div class="nsidnsf-mineir barcolor2" v-if="itme.type==2">

		</div>
		<div class="nsidnsf-mineir barcolor3" v-if="itme.type==3">

		</div>
		<div>
			<div class="nshihsdf-dinet" :class="[funavtvirin(1)]">20分</div>
			<div class="nsnei-fsing">
				{{itme.factorName}}
			</div>
		</div>

	</div>
</template>

<script>
	// import "@/assets/css/subscriptionTool.scss";
	export default {
		name: 'cardList',
		props: ['itme'],
		methods: {
			funavtvir(type) {
				let active = ''
				if (type == 1) {
					active = 'active-nrurt1'
				}else if (type == 2) {
					active = 'active-nrurt2'
				}else if (type == 3) {
					active = 'active-nrurt3'
				}
				return active
			},
			funavtvirin(type) {
				let active = ''
				if (type == 1) {
					active = 'active-color1'
				}else if (type == 2) {
					active = 'active-color2'
				}else if (type == 3) {
					active = 'active-color3'
				}
				return active
			}
			
		}
	}
</script>

<style>
	.nsidnsf-mineir {
		width: 0;
		height: 0;
		border: 0 solid transparent;
		border-right: 16px solid transparent;
		border-left: 0px solid transparent;
		margin: 4px 0 0 4px;
	}

	.barcolor1 {
		border-top: 16px solid $primary-color;
	}

	.barcolor2 {
		border-top: 16px solid #F97E37;
	}

	.barcolor3 {
		border-top: 16px solid #A54DD8;
	}

	.active-nrurt1 {
		border: 1px solid $primary-color;
	}

	.active-nrurt2 {
		border: 1px solid #F97E37;
	}

	.active-nrurt3 {
		border: 1px solid #A54DD8;
	}
	.active-color1 {
		color: $primary-color;
	}

	.active-color2 {
		color: #F97E37;
	}

	.active-color3 {
		color:  #A54DD8;
	}
	.nunsdufs-sdiidnusr {
		height: 72px;
		background: #FFFFFF;
		border-radius: 4px;

	}

	.nsnei-fsing {
		width: 100%;
		height: 40px;
		text-align: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 600;
		font-size: 14px;
		color: #000000;
		line-height: 40px;
		letter-spacing: 1px;

		font-style: normal;
	}

	.nshihsdf-dinet {
		height: 20px;
		font-family: PingFangSC, PingFang SC;
		font-weight: 600;
		font-size: 20px;
		line-height: 20px;
		letter-spacing: 1px;
		text-align: center;
		font-style: normal;
	}
</style>
