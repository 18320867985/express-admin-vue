<template>
<div class="user">

    <!-- 表单 -->
    <el-form :inline="true" class="form-inline">
        <el-form-item label="">
            <el-input placeholder="==用户名==" v-model="queryObj.name"></el-input>
        </el-form-item>

        <el-form-item label="">
            <el-select v-model="queryObj.roleId" placeholder="==选择用户类型==">
                <el-option label="==选择用户类型==" style="color:#999;" :value="null"></el-option>
                <el-option v-for="item in userRoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
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
    <div class="form-btn-group">
        <el-button-group>
            <el-button type="primary" icon="el-icon-document" @click="dtlList" :disabled="multipleSelection.length===0" v-loading.body.lock="queryFullscreenLoading"> 查看</el-button>
            <el-button type="warning" icon="el-icon-edit" :disabled="multipleSelection.length===0">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteMany" :disabled="multipleSelection.length===0">删除</el-button>
        </el-button-group>
        <el-button-group style="margin-left:15px">
            <el-button type="primary" icon="el-icon-folder-add" @click="addDialogVisible=true"> 添加</el-button>
        </el-button-group>
    </div>

    <!-- 查询表格 -->
    <div class="user-table">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="_id" label="ID" width="200"> </el-table-column>

            <el-table-column prop="name" label="用户名" sortable> </el-table-column>

            <el-table-column label="联系人电话"></el-table-column>

            <el-table-column prop="roleId.name" label="用户类型" sortable> </el-table-column>

            <el-table-column label="创建时间" sortable>
                <template v-slot="scope">
                    <span>{{scope.row.createDate | date("yyyy-MM-dd HH:mm:ss")}}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>

    <!-- 分页 -->
    <div class="user-page" v-if="tableData.length > 0">
        <div class="block">
            <el-pagination background layout=" prev, pager, next, jumper,total, sizes" :total="pageCount" :page-size="pageSize" :current-page="pageIndex" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizeList">
            </el-pagination>
        </div>
    </div>

    <!--dtl-->
    <el-dialog title="查看详情" :visible.sync="dtlDialogVisible" width="800px" class="dtl">
        <template v-for="(item,  index) in dtlObjs">
            <el-descriptions class="margin-top" title="" :column="2" border :key="index" size="small">
                <el-descriptions-item label="ID" label-class-name="table-1-5" content-class-name="table-3-5">{{item._id}} </el-descriptions-item>
                <el-descriptions-item label="用户名" label-class-name="table-1-5" content-class-name="table-3-5"> {{item.name}} </el-descriptions-item>
                <el-descriptions-item label="用户类型" label-class-name="table-1-5" content-class-name="table-3-5"> {{item.roleId.name}}</el-descriptions-item>
                <el-descriptions-item label="手机" label-class-name="table-1-5" content-class-name="table-3-5">{{item.phone}}</el-descriptions-item>
                <el-descriptions-item label="创建时间" label-class-name="table-1-5" content-class-name="table-3-5"> {{item.createDate|date}}</el-descriptions-item>
                <el-descriptions-item label="邮箱" label-class-name="table-1-5" content-class-name="table-3-5"> {{item.email}}</el-descriptions-item>
            </el-descriptions>
        </template>
    </el-dialog>

    <!--add-->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="650px" class="dtl">
        <vee ref="addform" v-slot="{ invalid ,dirty,reset}" class="form-validate">
            <el-form label-width="120px" style="width:400px">

                <vee-item rules="required|userName|unique:/main/user/data-unique" v-slot="{ failedRules  }">
                    <el-form-item label="用户名">
                        <el-input placeholder="==用户名==" v-model="addObj.name"></el-input>
                        <span class="text-danger" v-if="failedRules.required">用户名不能为空！</span>
                        <span class="text-danger" v-if="failedRules.userName">用户名格式不对！</span>
                        <span class="text-danger" v-if="failedRules.unique">用户名已存在！</span>
                    </el-form-item>
                </vee-item>

                <vee-item rules="required|min:8" v-slot="{ failedRules }" vid="addObj.pwd">
                    <el-form-item label="密码">
                        <el-input placeholder="==密码==" type="password" v-model="addObj.pwd"></el-input>
                        <span class="text-danger" v-if="failedRules.required">密码不能为空！</span>
                        <span class="text-danger" v-if="failedRules.min">密码长度最少要8位！</span>
                    </el-form-item>
                </vee-item>

                <vee-item rules="required|confirmed:addObj.pwd" v-slot="{ failedRules }">

                    <el-form-item label="确认密码">
                        <el-input placeholder="==确认密码==" type="password" v-model="addObj.pwd2"></el-input>
                        <span class="text-danger" v-if="failedRules.required ">确认密码不能为空！</span>
                        <span class="text-danger" v-if="failedRules.confirmed ">确认密码不相同！</span>
                    </el-form-item>
                </vee-item>

                <vee-item rules="required|phone" v-slot="{ failedRules }">
                    <el-form-item label="手机号">
                        <el-input placeholder="==手机号==" v-model="addObj.phone" maxlength="11"></el-input>
                        <span class="text-danger" v-if="failedRules.required ">手机号不能为空！</span>
                        <span class="text-danger" v-if="failedRules.phone ">手机号格式不对！</span>
                    </el-form-item>
                </vee-item>

                <vee-item rules="required|email" v-slot="{ failedRules }">
                    <el-form-item label="邮箱">
                        <el-input placeholder="==邮箱==" v-model="addObj.email"></el-input>
                        <span class="text-danger" v-if="failedRules.required ">邮箱不能为空！</span>
                        <span class="text-danger" v-if="failedRules.email ">邮箱格式不对！</span>
                    </el-form-item>
                </vee-item>

                <vee-item rules="required" v-slot="{ failedRules }">
                    <el-form-item label="选择用户类型">
                        <el-select v-model="addObj.roleId" placeholder="==选择用户类型==" style="width:280px">
                            <el-option label="==选择用户类型==" style="color:#999;" :value="null"></el-option>
                            <el-option v-for="item in userRoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <span class="text-danger" v-if="failedRules.required ">选择用户类型不能为空！</span>
                    </el-form-item>
                </vee-item>

                <el-form-item>
                    <el-button type="primary" :disabled="invalid&&dirty" @click="addData(reset)">立即创建</el-button>
                    <el-button @click="addDialogVisible = false">取消</el-button>
                </el-form-item>

            </el-form>
        </vee>

    </el-dialog>

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
            api: {
                getData: mianApi.user.getData,
                getDataDtl: mianApi.user.getDataDtl,
                postData: mianApi.user.postData,
                // putData: mianApi.user.putData,
                deleteData: mianApi.user.deleteData,

                getUserRoleAll: mianApi.userRole.getAll
            },
            queryObj: {
                name: null,
                roleId: null,
                createDateStart: null,
                createDateEnd: null,
            },
            addObj: {
                name: null,
                pwd: null,
                pwd2: null,
                roleId: null,
                phone: null,
                email: null
            },
            dtlObjs: [],

            tableData: [],
            loading: false,
            queryFullscreenLoading: false,

            userRoleList: [],
            multipleSelection: [],
            dtlDialogVisible: false,
            addDialogVisible: false,
        };
    },
    async created() {
        this.getList();
        this.getUserRoleAll();
    },
    methods: {

        async getUserRoleAll() {
            let res = await this.api.getUserRoleAll();
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
            let res = await this.api.getData(this.pageIndex, this.pageSize, this.queryObj);
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

        async handleCurrentChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.getList();
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
            this.pageIndex = 1;
            this.getList();
        },

        handleSelectionChange(val) {
            this.multipleSelection = val.map(item => item._id);
        },

        deleteMany() {

            if (this.multipleSelection.length === 0) {
                this.$message({
                    message: '你还没有选择数据项',
                    type: 'warning'
                });
                return;
            }

            this.$confirm('是否确定批量删除该文件?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await this.api.deleteData(this.multipleSelection);
                if (!res) {
                    return;
                }
                if (res.code === 1) {
                    this.$message({
                        type: "success",
                        message: "数据删除成功！"
                    })
                    this.getList();
                } else {
                    this.$message({
                        type: "error",
                        message: "数据删除失败！"
                    })
                }
            }).catch(() => {

            });

        },

        async dtlList() {

            this.queryFullscreenLoading = true;
            let res = await this.api.getDataDtl(this.multipleSelection);
            this.queryFullscreenLoading = false;

            if (res.code === 1) {
                this.dtlObjs = res.data;
                this.dtlDialogVisible = true;
            }
        },

        addData(reset) {
            this.$refs.addform.validate().then(async (success) => {
                if (!success) {
                    return;
                }
                let res = await this.api.postData(this.addObj);
                if (!res) {
                    return
                }
                if (res && res.code == 1) {
                    this.$message({
                        showClose: true,
                        message: "数据添加成功",
                        type: "success",
                    });
                    reset();
                    for (let prop of Object.keys(this.addObj)) {
                        this.addObj[prop] = null;
                    }
                    this.addDialogVisible = false;
                    this.getList();
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: "error",
                    });
                }

            });
        }

    },
};
</script>
