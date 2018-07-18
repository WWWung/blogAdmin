<template>
	<div>
		<el-main>
			<h2>博客列表</h2>
			<el-table 
				stripe
				:data="data" 
				style="width: 1400px;"
				v-loading="blogLoading">
				<el-table-column 
					prop="id" 
					label='博客ID' 
					width="100"
					fixed
					></el-table-column>
				<el-table-column  center=true prop="title" label='标题' width="300"></el-table-column>
				<el-table-column prop="clickNumber" label='点击数' width="100"></el-table-column>
				<el-table-column prop="up" label='置顶' width="180">
					<template slot-scope="scope">
						<el-radio-group size="mini" v-model="scope.row.up">
							<el-radio-button :label='0'>是</el-radio-button>
							<el-radio-button :label='1'>否</el-radio-button>
						</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column prop="support" label='推荐' width="180">
					<template slot-scope="scope">
						<el-radio-group size="mini" v-model="scope.row.support">
							<el-radio-button :label='0'>是</el-radio-button>
							<el-radio-button :label='1'>否</el-radio-button>
						</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column prop="type" label='权限' width="240">
					<template slot-scope="scope">
						<el-radio-group size="mini" v-model="scope.row.type">
							<el-radio-button :label='0'>公开</el-radio-button>
							<el-radio-button :label='1'>私有</el-radio-button>
							<el-radio-button :label='2'>好友</el-radio-button>
						</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column prop="mold" label='类型' width="240">
					<template slot-scope="scope">
						<el-radio-group size="mini" v-model="scope.row.mold">
							<el-radio-button :label='0'>技术</el-radio-button>
							<el-radio-button :label='1'>阅读</el-radio-button>
							<el-radio-button :label='2'>随笔</el-radio-button>
						</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column prop="date" label='日期' width="240">
					<template slot-scope="scope">
						<el-date-picker 
							type="date" 
							v-model="scope.row.date"
							placeholder="选择日期"
							align="center"></el-date-picker>
					</template>
				</el-table-column>
				<el-table-column 
					label='操作' 
					width="180"
					fixed="right">
					<template slot-scope="scope">
						<el-button size="mini">
							保存
						</el-button>
						<el-button type="danger" size="mini">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination 
					align="center"
					backround
					:page-size="1"
					layout="prev, pager, next"
					:total="10"></el-pagination>
			<h2>博客评论</h2>
			<el-table 
				stripe
				:data="commentData">
				<el-table-column prop="id" label='评论ID' width="100"></el-table-column>
				<el-table-column prop="content" label='内容' width="180"></el-table-column>
				<el-table-column prop="user" label='作者' width="180"></el-table-column>
				<el-table-column prop="date" label='日期' width="240">
					<template slot-scope="scope">
						<el-date-picker 
							type="date" 
							v-model="scope.row.date"
							placeholder="选择日期"
							align="center"></el-date-picker>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				data: [],
				commentData: [],
				blogLoading: false
			}
		},
		methods: {
			handleTime (time) {
				const date = new Date(time)
				return date.getFullYear() + '年' + this.add0(date.getMonth() + 1) + '月' + this.add0(date.getDate()) + '日'
			},
			add0 (num) {
				return num < 10 ? '0' + num : num + ''
			},
			getData () {
				this.blogLoading = true
				const url = '/bloglist'
				this.ajax.get(url).then(d => {
					console.log(d)
					this.blogLoading = false
					this.data = d.data.data
				}).catch(err => {
					console.log(err)
					this.blogLoading = false
				})
			}
		},
		created () {
//			this.getData()
			this.ajax.get('/test').then(d => {
				console.log(d)
			}).catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style>
	.el-table {
		border-bottom: 1px solid #000;
		/*height: 400px;*/
		/*overflow-y: scroll;*/
		text-align: center;
	}
</style>