<template>
	<div>
		<el-main>
			<el-table 
				stripe
				:data="users.data"
				v-loading="usersLoading">
				<el-table-column prop="id" label='用户ID' width="100"></el-table-column>
				<el-table-column prop="name" label='用户名' width="380"></el-table-column>
				<el-table-column prop="description" label='简介' width="180"></el-table-column>
				<el-table-column prop="birthday" label='生日' width="240">
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
						<el-button type="danger" size="mini" @click="deleteUser(scope.row)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination 
					align="center"
					backround
					:page-size="users.pageCount"
					layout="prev, pager, next"
					:total="users.total"
					:current-page="users.page"
					@current-change='usersTablePageChange'></el-pagination>
		</el-main>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				users: {
					data: [],
					total: 0,
					page: 1,
					pageCount: 10
				},
				usersLoading: false
			}
		},
		methods: {
			getWordData () {
				this.usersLoading = true
				const url = '/userslist?page=' + this.users.page + '&pageCount=' + this.users.pageCount
				this.ajax.get(url).then(d => {
					this.users = d.data
					this.usersLoading = false
				}).catch(err => {
					console.log(err)
					this.usersLoading = false
				})
			},
			usersTablePageChange (val) {
				this.words.page = val
				this.getWordData()
			},
			deleteUser ({id}) {
				this.$confirm('删除账号后将不可找回，是否确认删除？', '提示', {
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
					this.ajax.get('/deleteuser?id=' + id).then(d => {
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