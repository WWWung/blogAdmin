<template>
  <div id="app">
    <div>
			<el-header>头部区域</el-header>
			<el-container>
				<el-aside>
					<el-menu :router="true">
						<el-menu-item index='blog'>博客列表</el-menu-item>
						<el-menu-item index='user'>用户列表</el-menu-item>
						<el-menu-item index='words'>留言列表</el-menu-item>
					</el-menu>
				</el-aside>
				<router-view></router-view>
			</el-container>
		</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
/*.el-header, .el-container, .el-aside, .el-main {
	border: 1px dotted #ddd;
}*/
.el-header, .el-container {
	border-bottom: 1px dotted #ddd;
}
.el-menu {
	border: none;
	/*border-right: 1px dotted #ddd;*/
}
.el-main {
	border-left: 1px dotted #ddd;
}
.el-aside {
	height: 100%;
}
</style>
