<template>
<div class="user">

    <!-- 表单 -->
    <el-form :inline="true" class="form-inline">
        <el-form-item label="">
            <el-input placeholder="==数据表名称==" v-model="queryObj.docName"></el-input>
        </el-form-item>

        <el-form-item label="">
            <el-date-picker type="date" placeholder="创建时间起" v-model="queryObj.createDateStart">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="">
            <el-date-picker type="date" placeholder="创建时间止" v-model="queryObj.createDateEnd">
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

    <!--批量操作-->
    <div class="form-btn-group">
        <el-button-group>
            <el-button type="primary" icon="el-icon-document" @click="dtlMany(multipleSelection)" :disabled="multipleSelection.length===0" v-loading.fullscreen.lock="dtlLoading"> 批量查看</el-button>
        </el-button-group>
    </div>

    <!-- 查询表格 -->
    <div class="user-table">
        <el-table :data="tableData" border style="width: 100%" v-loading="tableLoading" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="_id" label="id" width="200"> </el-table-column>
            <el-table-column prop="docName" label="数据表"></el-table-column>
            <el-table-column prop="fnName" label="操作类型" sortable> </el-table-column>
            <el-table-column prop="desc" label="操作状态" sortable>
                <template v-slot="scope">
                    <el-link :type="getType(scope.row.fnName)" :underline="false">{{scope.row.desc}}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="操作用户" sortable>
                <template v-slot="scope">
                    <span>{{scope.row.user_id&&scope.row.user_id.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作时间">
                <template v-slot="scope">
                    <span>{{scope.row.createDate | date("yyyy-MM-dd HH:mm:ss")}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="150px">
                <template v-slot="scope">
                    <el-link :underline="true" type="primary" @click="dtlOne(scope.row._id)">查看</el-link>
                </template>
            </el-table-column>

        </el-table>
    </div>

    <!-- 分页 -->
    <vue-pagination :getList="getList" :pageObj="pageObj" :tableData="tableData"></vue-pagination>

    <!--dtl-->
    <vue-dtl ref="dtlBox" title="查看详情" :dtlObjs="dtlObjs" v-slot="scope">
        <el-descriptions class="margin-top" title="" :column="2" border size="small">
            <el-descriptions-item label="id" label-class-name="table-1-5" content-class-name="table-3-5">{{scope.dtlObj._id}} </el-descriptions-item>
            <el-descriptions-item label="数据表" label-class-name="table-1-5" content-class-name="table-3-5">{{scope.dtlObj.docName}} </el-descriptions-item>
            <el-descriptions-item label="操作类型" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.fnName}}</el-descriptions-item>
            <el-descriptions-item label="状态" label-class-name="table-1-5" content-class-name="table-3-5">
                <el-link :type="getType(scope.dtlObj.fnName)" :underline="false">{{scope.dtlObj.desc}}</el-link>
            </el-descriptions-item>
            <el-descriptions-item label="用户" label-class-name="table-1-5" content-class-name="table-3-5">{{scope.dtlObj.user_id&&scope.dtlObj.user_id.name}}</el-descriptions-item>
            <el-descriptions-item label="操作时间" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.createDate|date}}</el-descriptions-item>
        </el-descriptions>
    </vue-dtl>

</div>
</template>

<script>
import mianApi from "../../api/mian";
import VueDtl from "../../components/share/dtl.vue";
import VuePagination from "../../components/share/pagination.vue";

import {
    pageOption,
    toDateStartOrEnd,
    CRUD_Option
} from "../../mixins";
export default {
    mixins: [pageOption, toDateStartOrEnd, CRUD_Option],
    data() {
        return {

            // axios 接口
            api: {
                getData: mianApi.log.getData,
                getDataDtl: mianApi.log.getDataDtl,
                postData: mianApi.log.postData,
                putData: mianApi.log.putData,
                deleteData: mianApi.log.deleteData,

            },

            // 增删查改的对象
            queryObj: {
                docName: null,
                createDateStart: null,
                createDateEnd: null,
            },

            dtlObjs: [],

            // 表格列表数据
            tableData: [],

            // 批量选择
            multipleSelection: [],

            // loading 加载动画
            tableLoading: false,
            dtlLoading: false,
            deleteLoading: false,

            // 其它 列表的

        };
    },
    async created() {
        this.getList();
    },
    computed: {
        getUserVid() {
            return this.$store.getters.getUserVid;
        }
    },
    methods: {

        async getList() {

            this.tableLoading = true;
            let res = await this.api.getData(this.pageObj.pageIndex, this.pageObj.pageSize, this.queryObj);
            this.tableLoading = false;
            if (!res) {
                return;
            }
            if (res.code === 1) {
                this.pageObj.pageCount = res.pageCount;
                this.pageObj.pageIndex = res.pageIndex;
                this.pageObj.pageSize = res.pageSize;
                this.tableData = res.data;
            }
        },

        async search() {
            this.pageIndex = 1;
            if (this.queryObj.createDateStart) {
                this.queryObj.createDateStart = this.toDateStart(this.queryObj.createDateStart);
            }
            if (this.queryObj.createDateEnd) {
                this.queryObj.createDateEnd = this.toDateEnd(this.queryObj.createDateEnd);
            }

            this.getList();
        },

        async reset() {
            for (let prop of Object.keys(this.queryObj)) {
                this.queryObj[prop] = null;
            }
            this.pageObj.pageIndex = 1;
            this.getList();
        },

        handleSelectionChange(val) {
            this.multipleSelection = val.map(item => item._id);
        },

        getType(desc) {
            let type = '';
            switch (desc) {
                case 'postData':
                    type = "primary ";
                    break;
                case 'putData':
                    type = "warning  ";
                    break;
                case 'deleteData':
                    type = "danger  ";
                    break;
                case 'loginData':
                    type = "success  ";
                    break;
                default:
                    type = 'info ';
                    break;
            }

            return type;
        },

    },

    components: {
        VueDtl,
        VuePagination
    }
};
</script>
