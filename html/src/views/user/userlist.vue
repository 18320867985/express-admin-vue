<template>
	<div class="user">
		<!-- 表单 -->
		<el-form :inline="true" class="form-inline">
			<el-form-item label="">
				<el-input placeholder="用户名"></el-input>
			</el-form-item>

			<el-form-item label="">
				<el-input placeholder="用户名类型"></el-input>
			</el-form-item>
			
			<el-form-item label="">
				<el-date-picker type="date" placeholder="创建时间起">
				</el-date-picker>

			</el-form-item>
			<el-form-item label="">
				<el-date-picker type="date" placeholder="创建时间止">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" icon="el-icon-search">搜索</el-button>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" icon="el-icon-refresh-right">重置</el-button>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" icon="el-icon-download">导出</el-button>
			</el-form-item>

		</el-form>

		<!-- 表格 -->
		<div class="user-table">
			<el-table :data="tableData" border style="width: 100%">

				<el-table-column prop="id" label="序号" width="80">
				</el-table-column>

				<el-table-column label="操作" width="180">

				</el-table-column>

				<el-table-column prop="address" label="区域ID" width="200">
				</el-table-column>

				<el-table-column label="供应商名称">
				</el-table-column>

				<el-table-column label="联系人姓名">
				</el-table-column>

				<el-table-column label="联系人电话">
				</el-table-column>

				<el-table-column label="所属战区">
				</el-table-column>

				<el-table-column label="报价组织">
				</el-table-column>

				<el-table-column label="提货服务范围">
				</el-table-column>

				<el-table-column label="创建时间">
				</el-table-column>

			</el-table>
		</div>

		<!-- 分页 -->
		<div class="user-page">
			  <div class="block">
				<el-pagination background layout=" prev, pager, next, jumper,total, sizes" :total="1000">
				</el-pagination>

			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		methods: {
		
		},

		components: {
		
		
		}
	}
</script>

<style scoped="scoped">

</style>
