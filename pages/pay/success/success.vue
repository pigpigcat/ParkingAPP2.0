<template>
	<view>
		<view class="icon">
			<image src="/static/img/success.png"></image>
		</view>
		<view class="tis">
			订单支付成功
		</view>
		<view class="uni-flex uni-column">
			<view class="flex-item flex-item-V ">
				<view class="solid-bottom text-xxl padding">
					<text class="text-price text-red">{{amount}}</text>
				</view>
			</view>
			<view class="flex-item flex-item-V" style="width: 400upx; height: 400upx;padding-left: 28upx;">
				<img style="height: 100%;" :src="src">
			</view>
			<view class="flex-item flex-item-V ">
				<view class="solid-bottom text-xxl padding">
					<text class="text-red">凭二维码进出停车场</text>
				</view>
			</view>
		</view>
		<view class="back">
			<view class="btn" @tap="toUser">个人中心</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				amount: 0,
				order_info: {},
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			};
		},

		components: {
			tkiQrcode
		},
		onLoad(e) {
			this.order_info = JSON.parse(e.order_info);
			this.load_qrcode(e.order_info);
			this.amount = parseFloat(this.order_info.price).toFixed(2);
		},
		methods: {
			toUser() {
				uni.switchTab({
					url: '/pages/PersonalCenter/PersonalCenter'
				});
			},
			load_qrcode(order_info) {

				uni.request({
					url: this.$api + '/order/queryOrder',
					data: order_info,
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						this.src = res.data.qrCode
					}
				});
			},
			load_qrcode(order_info){
				
				uni.request({
					url: this.$api + '/order/queryOrder',
					data: order_info,
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						this.src = res.data.qrCode
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	view {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.icon {
		width: 100%;
		margin-top: 10vw;

		image {
			width: 25vw;
			height: 25vw;
		}
	}

	.tis {
		width: 100%;
		margin-top: 20upx;
		font-size: 48upx;
	}

	.pay-amount {
		width: 100%;
		margin-top: 10upx;
		font-size: 32upx;
	}

	.back {
		position: absolute;
		width: 100%;
		bottom: 80upx;

		.btn {
			padding: 0 50upx;
			height: 70upx;
			border: solid 2upx #f06c7a;
			color: #f06c7a;
			align-items: center;
			border-radius: 10upx;
			font-size: 34upx;
		}
	}

	.qrimg {
		display: flex;
		justify-content: center;
	}
</style>
