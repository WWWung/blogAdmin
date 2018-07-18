<template>
	<div>
		<el-main>
			<h2>博客列表</h2>
			<el-table 
				:data="blogs.data" 
				style="width: 1400px;"
				v-loading="blogLoading"
				@current-change='checkBloglistRow'
				highlight-current-row
				ref='blogtable'>
				<el-table-column 
					type='index'
					fixed></el-table-column>
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
							v-model="scope.row.time"
							placeholder="选择日期"
							align="center"></el-date-picker>
					</template>
				</el-table-column>
				<el-table-column 
					label='操作' 
					width="180"
					fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" @click="changeBlogInfo(scope.row)">
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
					:page-size="blogs.pageCount"
					layout="prev, pager, next"
					:total="blogs.total"
					:current-page="blogs.page"
					@current-change='blogTablePageChange'></el-pagination>
			<h2>博客评论</h2>
			<el-table 
				stripe
				:data="comments.data"
				v-loading="commentLoading">
				<el-table-column prop="id" label='评论ID' width="100"></el-table-column>
				<el-table-column prop="content" label='内容' width="380"></el-table-column>
				<el-table-column prop="name" label='作者' width="180"></el-table-column>
				<el-table-column prop="time" label='日期' width="240">
					<template slot-scope="scope">
						<el-date-picker 
							type="date" 
							v-model="scope.row.time"
							placeholder="选择日期"
							align="center"></el-date-picker>
					</template>
				</el-table-column>
				<el-table-column 
					label='操作' 
					width="180">
					<template slot-scope="scope">
						<el-button type="danger" size="mini">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination 
					align="center"
					backround
					:page-size="comments.pageCount"
					layout="prev, pager, next"
					:total="comments.total"
					:current-page="comments.page"
					@current-change='commentTablePageChange'></el-pagination>
		</el-main>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				blogLoading: false,
				commentLoading: false,
				blogs: {
					data: [],
					total: 0,
					page: 1,
					pageCount: 10
				},
				comments: {
					data: [],
					total: 0,
					page: 1,
					pageCount: 10
				},
				currentBlogId: null
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
			getBlogData () {
				this.blogLoading = true
				const url = '/bloglist?page=' + this.blogs.page + '&pageCount=' + this.blogs.pageCount
				this.ajax.get(url).then(d => {
					this.blogLoading = false
					this.blogs = d.data
				}).catch(err => {
					this.blogLoading = false
				})
			},
			blogTablePageChange (val) {
				this.blogs.page = val
				this.getBlogData()
			},
			checkBloglistRow (row) {
				this.$refs.blogtable.setCurrentRow(row);
				if (row) {
					this.changeCurrentBlogId(row);
				}
			},
			changeCurrentBlogId ({id}) {
				this.currentBlogId = id
				this.getBlogComment()
			},
			getBlogComment () {
				this.commentLoading = true
				const url = '/comments?page=' + this.comments.page + '&pageCount=' + this.comments.pageCount + '&id=' + this.currentBlogId
				this.ajax.get(url).then(d => {
					this.comments = d.data
					this.commentLoading = false
				}).catch(err => {
					console.log(err)
					this.commentLoading = false
				})
			},
			commentTablePageChange (val) {
				this.comments.page = val
				this.getBlogComment()
			},
			changeBlogInfo (blog) {
				const url = '/editblog?id=' + blog.id
				this.ajax.post(url, JSON.stringify(blog)).then(d => {
					console.log(d)
				}).catch(err => {
					console.log(err)
				})
			}
		},
		created () {
			this.getBlogData()
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