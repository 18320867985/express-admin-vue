<template>
<div class="user">
    <!-- 表单 -->
    <el-form :inline="true" class="form-inline">
        <el-form-item label="">
            <el-input placeholder="==用户名==" v-model="pageObj.name"></el-input>
        </el-form-item>

        <el-form-item label="">
            <el-select v-model="pageObj.roleId" placeholder="==选择用户名类型==">
                <el-option label="==选择用户名类型==" :value="null"></el-option>
                <el-option v-for="item in userRoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="">
            <el-date-picker type="date" placeholder="创建时间起" v-model="pageObj.createDateStart">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="">
            <el-date-picker type="date" placeholder="创建时间止" v-model="pageObj.createDateEnd">
            </el-date-picker>
        </el-form-item>

        <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-form-item>

        <el-form-item label="">
            <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
        </el-form-item>

        <el-form-item label="">
            <el-button type="primary" icon="el-icon-download">导出</el-button>
        </el-form-item>
    </el-form>

    <!-- 表格 -->
    <div class="user-table">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="_id" label="ID" width="200"> </el-table-column>

            <el-table-column prop="name" label="用户名"> </el-table-column>

            <el-table-column label="联系人电话"> </el-table-column>

            <el-table-column prop="roleId.name" label="用户类型"> </el-table-column>

            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createDate | date("yyyy-MM-dd HH:mm:ss")}} </span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="180"> </el-table-column>
        </el-table>
    </div>

    <!-- 分页 -->
    <div class="user-page" v-if="tableData.length > 0">
        <div class="block">
            <el-pagination background layout=" prev, pager, next, jumper,total, sizes" :total="pageCount" :page-size="pageSize" :current-page="pageIndex" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizeList">
            </el-pagination>
        </div>
    </div>
</div>
</template>

<script>
import mianApi from "../../api/mian";
import {
    pageOption,
    toDateStartOrEnd
} from "../../mixins";

export default {
    mixins: [pageOption, toDateStartOrEnd],
    data() {
        return {
            pageObj: {
                name: null,
                roleId: null,
                createDateStart: null,
                createDateEnd: null,
            },
            tableData: [],
            loading: false,
            userRoleList: [],
        };
    },
    async created() {
        this.getList();
        this.getUserRoleAll();
    },
    methods: {

        async getUserRoleAll() {
            let res = await mianApi.userRole.getAll();
            if (res.code === 1) {
                this.userRoleList = res.data.map((item) => {
                    return {
                        label: item.name,
                        value: item._id
                    };
                });
            }
        },

        async getList() {

            this.loading = true;
            let res = await mianApi.user.getData(
                this.pageIndex,
                this.pageSize,
                this.pageObj
            );
            this.loading = false;

            if (!res) {
                console.log("数据加载失败");
                return;
            }

            if (res.code === 1) {
                this.pageCount = res.pageCount;
                this.pageIndex = res.pageIndex;
                this.pageSize = res.pageSize;
                this.tableData = res.data;
            }
        },

        async handleSizeChange(pageSize) {

            this.pageSize = pageSize;
            this.pageIndex = 1;
            this.getList();
        },

        async handleCurrentChange(pageNum) {

            this.pageIndex = pageNum;
            this.getList();
        },

        async search() {

            this.pageIndex = 1;
            if (this.pageObj.createDateStart) {
                this.pageObj.createDateStart = this.toDateStart(
                    this.pageObj.createDateStart
                );
            }
            if (this.pageObj.createDateEnd) {
                this.pageObj.createDateEnd = this.toDateEnd(this.pageObj.createDateEnd);
            }

            this.getList();
        },

        async reset() {

            for (let prop of Object.keys(this.pageObj))
            {
                this.pageObj[prop] = null;
            }

            this.pageIndex = 1;
            this.getList();
        },
    },
};
</script>

<style scoped="scoped">
</style>
