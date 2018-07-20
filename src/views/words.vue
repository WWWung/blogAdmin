<template>
	<div>
		<el-main>
			<el-table 
				stripe
				:data="words.data"
				v-loading="wordsLoading">
				<el-table-column prop="id" label='留言ID' width="100"></el-table-column>
				<el-table-column prop="content" label='内容' width="380"></el-table-column>
				<el-table-column prop="username" label='作者' width="180"></el-table-column>
				<el-table-column prop="time" label='日期' width="240">
					<template slot-scope="scope">
						<el-date-picker 
							type="datetime" 
							v-model="scope.row.time"
							placeholder="选择日期"
							align="center"></el-date-picker>
					</template>
				</el-table-column>
				<el-table-column 
					label='操作' 
					width="180">
					<template slot-scope="scope">
						<el-button type="danger" size="mini" @click="deleteWords(scope.row)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination 
					align="center"
					backround
					:page-size="words.pageCount"
					layout="prev, pager, next"
					:total="words.total"
					:current-page="words.page"
					@current-change='wordsTablePageChange'></el-pagination>
		</el-main>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				words: {
					data: [],
					total: 0,
					page: 1,
					pageCount: 10
				},
				wordsLoading: false
			}
		},
		methods: {
			getWordData () {
				this.wordsLoading = true
				const url = '/wordslist?page=' + this.words.page + '&pageCount=' + this.words.pageCount
				this.ajax.get(url).then(d => {
					this.words = d.data
					this.wordsLoading = false
				}).catch(err => {
					console.log(err)
					this.wordsLoading = false
				})
			},
			wordsTablePageChange (val) {
				this.words.page = val
				this.getWordData()
			},
			deleteWords ({id}) {
				this.$confirm('删除留言后将不可找回，是否确认删除？', '提示', {
					confirmButtonText: '确定',
					concelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = this.$loading({
						lock: true,
						text: '正在删除...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, .7)'
					})
					this.ajax.get('/deletewords?id=' + id).then(d => {
						loading.close()
						this.$message({
							type: 'success',
							message: '删除成功'
						})
						this.getWordData()
					}).catch(err => {
						loading.close()
						this.$message.error('删除失败')
						console.log(err)
					})
				}).catch(() => {
					this.$message('取消删除')
				})
			}
		},
		created () {
			this.getWordData()
		}
	}
</script>

<style>
	.el-table {
		text-align: center;
	}
</style>