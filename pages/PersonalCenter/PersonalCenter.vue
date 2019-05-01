<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo" v-if="login">
				<view class="face">
					<image src="../../static/HM-PersonalCenter/face.jpeg"></image>
				</view>
				<view class="info">
					<view class="username">{{userinfo.username}}</view>
					<view class="integral">手机号码:{{userinfo.tel}}</view>
				</view>
			</view>
			<view class="userinfo" v-else>
				<view class="face">
					<image src="../../static/HM-PersonalCenter/face.jpeg"></image>
				</view>
				<view class="info">
					<navigator url="/pages/login/login">
						<view class="username" style="padding-top: 8px;padding-left: 8px" url>点击登录</view>
					</navigator>

				</view>
			</view>
			<view class="setting">
				<image src="../../static/HM-PersonalCenter/setting.png"></image>
			</view>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover" @tap="toOrderType(index)">
					<view class="icon">
						<view class="badge" v-if="row.badge>0">{{row.badge}}</view>
						<image :src="'../../static/HM-PersonalCenter/'+row.icon"></image>
					</view>
					{{row.name}}
				</view>
			</view>
		</view>
		<view class="list" v-for="(list,list_i) in severList" :key="list_i">
			<view class="li" v-for="(li,li_i) in list" @tap="toPage(list_i,li_i)" v-bind:class="{'noborder':li_i==list.length-1}"
			 hover-class="hover" :key="li.name">
				<view class="icon">
					<image :src="'../../static/HM-PersonalCenter/sever/'+li.icon"></image>
				</view>
				<view class="text">{{li.name}}</view>
				<image class="to" src="../../static/HM-PersonalCenter/to.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isH5Plus: true,
				login: false,
				userinfo: {},
				orderTypeLise: [
					//name-标题 icon-图标 badge-角标
					{
						name: '我的订单',
						icon: 'l1.png',
						badge: '',
						index: "0"
					},
					{
						name: '待付款',
						icon: 'l2.png',
						badge: '',
						index: "1"
					}
				],
				severList: [
					[{
							name: '详细信息',
							icon: 'point.png',
							url: null
						},
						{
							name: '全部订单',
							icon: 'mingxi.png',
							index: "0",
							url: "/pages/order/order_page"
						},
					],
					[{
							name: '修改密码',
							icon: 'security.png',
							url: "/pages/login/reg"
						},
						{
							name: '关于',
							icon: 'kefu.png',
							url: null
						}
					]
				],
			};
		},
		onLoad() {
			//加载
			this.init();
		},
		onShow() {
			if(!this.login){
				this.init();
			}
		},
		methods: {
			init() {
				//用户信息
				/* this.userinfo={
					face:'../../static/HM-PersonalCenter/face.jpeg',
					username:"VIP会员10240",
					tel:"15605155198"
				} */
				let userInfo = uni.getStorageSync("userInfo");
				if (userInfo) {
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.userinfo = userInfo
					console.log(this.userinfo)
					this.login = true;
					// 	//判断是否还有数据， 有改为 more， 没有改为noMore 
				}

			},
			//用户点击订单类型
			toOrderType(index) {
				uni.setStorageSync('order_index', this.orderTypeLise[index].index);
				console.log(uni.getStorageSync('order_index'));
				uni.switchTab({
					url: "/pages/order/order_page"
				})
			},
			//用户点击列表项
			toPage(list_i, li_i) {
				// uni.showToast({title: this.severList[list_i][li_i].name});
				if (this.severList[list_i][li_i].url != null) {
					if (this.severList[list_i][li_i].name == "全部订单") {
						uni.setStorageSync('order_index', this.severList[list_i][li_i].index);
					}
					uni.reLaunch({
						url: this.severList[list_i][li_i].url
					})
				}
				else{
					uni.showToast({title: "该功能暂未开放"});
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff
	}

	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}

		background-color:#ff6364;
		width:92%;
		height:30vw;
		padding:0 4%;
		display:flex;
		align-items:center;

		.userinfo {
			width: 90%;
			display: flex;

			.face {
				flex-shrink: 0;
				width: 15vw;
				height: 15vw;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%
				}
			}

			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 30upx;

				.username {
					width: 100%;
					color: #fff;
					font-size: 40upx
				}

				.integral {
					display: flex;
					align-items: center;
					padding: 0 20upx;
					height: 40upx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 20upx;
					font-size: 24upx
				}
			}
		}

		.setting {
			flex-shrink: 0;
			width: 6vw;
			height: 6vw;

			image {
				width: 100%;
				height: 100%
			}
		}
	}

	.hover {
		background-color: #eee
	}

	.orders {
		background-color: #ff6364;
		width: 92%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 40upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			width: 98%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;

			.label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				width: 100%;
				height: 16vw;
				color: #666666;
				font-size: 26upx;

				.icon {
					position: relative;
					width: 7vw;
					height: 7vw;
					margin: 0 1vw;

					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 20upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}

					image {
						width: 7vw;
						height: 7vw;
						z-index: 9;
					}
				}
			}
		}
	}

	.list {
		width: 100%;
		border-bottom: solid 26upx #f1f1f1;

		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx
			}
		}
	}
</style>
