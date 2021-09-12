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

    <!--批量操作-->
    <div class="form-btn-group">
        <el-button-group>
            <el-button type="primary" icon="el-icon-document" @click="dtlMany(multipleSelection)" :disabled="multipleSelection.length===0" v-loading.fullscreen.lock="dtlLoading"> 批量查看</el-button>
            <el-button type="danger" icon="el-icon-delete" v-if="getUserVid===2" @click="deleteMany(multipleSelection)" :disabled="multipleSelection.length===0" v-loading.fullscreen.lock="deleteLoading">批量删除</el-button>
        </el-button-group>
        <el-button-group style="margin-left:15px">
            <el-button type="primary" icon="el-icon-folder-add" @click="addBtn"  v-if="getUserVid===2"> 添加</el-button>
        </el-button-group>
    </div>

    <!-- 查询表格 -->
    <div class="user-table">
        <el-table :data="tableData" border style="width: 100%" v-loading="tableLoading" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="_id" label="id" width="200"> </el-table-column>

            <el-table-column prop="name" label="用户名" sortable> </el-table-column>

            <el-table-column label="联系人电话" prop="phone"></el-table-column>

            <el-table-column label="邮箱" prop="email"></el-table-column>

            <el-table-column prop="roleId.name" label="用户类型" sortable> </el-table-column>

            <el-table-column label="创建时间" sortable>
                <template v-slot="scope">
                    <span>{{scope.row.createDate | date("yyyy-MM-dd HH:mm:ss")}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="150px">
                <template v-slot="scope">
                    <el-link :underline="true" type="primary" @click="dtlOne(scope.row._id)">查看</el-link>
                    <el-link :underline="true" type="warning" v-if="getUserVid>=1" style="margin-left:8px" @click="editBtn(scope.row)">修改</el-link>
                    <el-link :underline="true" type="danger" v-if="getUserVid===2" slot="reference" style="margin-left:8px" @click="deleteOne([scope.row._id])">删除</el-link>
                </template>
            </el-table-column>

        </el-table>
    </div>

    <!-- 分页 -->
    <vue-pagination :getList="getList" :pageObj="pageObj" :tableData="tableData"></vue-pagination>

    <!--add-->
    <vue-add ref="addBox" title="添加用户" :addObj="addObj" :getList="getList" :postData="api.postData" v-slot="scope">
        <vee-item rules="required|userName|unique:/main/user/data-unique" v-slot="{ failedRules  }">
            <el-form-item label="用户名">
                <el-input placeholder="==用户名==" v-model="scope.addObj.name"></el-input>
                <span class="text-danger" v-if="failedRules.required">用户名不能为空！</span>
                <span class="text-danger" v-if="failedRules.userName">用户名格式不对！</span>
                <span class="text-danger" v-if="failedRules.unique">用户名已存在！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required|min:8" v-slot="{ failedRules }" vid="addObj.pwd">
            <el-form-item label="密码">
                <el-input placeholder="==密码==" type="password" v-model="scope.addObj.pwd"></el-input>
                <span class="text-danger" v-if="failedRules.required">密码不能为空！</span>
                <span class="text-danger" v-if="failedRules.min">密码长度最少要8位！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required|confirmed:addObj.pwd" v-slot="{ failedRules }">
            <el-form-item label="确认密码">
                <el-input placeholder="==确认密码==" type="password" v-model="scope.addObj.pwd2"></el-input>
                <span class="text-danger" v-if="failedRules.required ">确认密码不能为空！</span>
                <span class="text-danger" v-if="failedRules.confirmed ">确认密码不相同！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required|phone" v-slot="{ failedRules }">
            <el-form-item label="手机号">
                <el-input placeholder="==手机号==" v-model="scope.addObj.phone" maxlength="11"></el-input>
                <span class="text-danger" v-if="failedRules.required ">手机号不能为空！</span>
                <span class="text-danger" v-if="failedRules.phone ">手机号格式不对！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required|email" v-slot="{ failedRules }">
            <el-form-item label="邮箱">
                <el-input placeholder="==邮箱==" v-model="scope.addObj.email"></el-input>
                <span class="text-danger" v-if="failedRules.required ">邮箱不能为空！</span>
                <span class="text-danger" v-if="failedRules.email ">邮箱格式不对！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required" v-slot="{ failedRules }">
            <el-form-item label="选择用户类型">
                <el-select v-model="scope.addObj.roleId" placeholder="==选择用户类型==">
                    <el-option label="==选择用户类型==" style="color:#999;" :value="null"></el-option>
                    <el-option v-for="item in userRoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <span class="text-danger" v-if="failedRules.required ">选择用户类型不能为空！</span>
            </el-form-item>
        </vee-item>
    </vue-add>

    <!--edit-->
    <vue-edit ref="editBox" title="修改用户" :editObj="editObj" :getList="getList" :putData="api.putData" v-slot="scope">
        <el-form-item label="用户名">
            <span>{{scope.editObj.name}}</span>
        </el-form-item>

        <vee-item rules="required|phone" v-slot="{ failedRules }">
            <el-form-item label="手机号">
                <el-input placeholder="==手机号==" v-model="scope.editObj.phone" maxlength="11"></el-input>
                <span class="text-danger" v-if="failedRules.required ">手机号不能为空！</span>
                <span class="text-danger" v-if="failedRules.phone ">手机号格式不对！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required|email" v-slot="{ failedRules }">
            <el-form-item label="邮箱">
                <el-input placeholder="==邮箱==" v-model="scope.editObj.email"></el-input>
                <span class="text-danger" v-if="failedRules.required ">邮箱不能为空！</span>
                <span class="text-danger" v-if="failedRules.email ">邮箱格式不对！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required" v-slot="{ failedRules }">
            <el-form-item label="选择用户类型">
                <el-select v-model="scope.editObj.roleId" placeholder="==选择用户类型==">
                    <el-option label="==选择用户类型==" style="color:#999;" :value="null"></el-option>
                    <el-option v-for="item in userRoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <span class="text-danger" v-if="failedRules.required ">选择用户类型不能为空！</span>
            </el-form-item>
        </vee-item>

    </vue-edit>

    <!--dtl-->
    <vue-dtl ref="dtlBox" title="查看详情" :dtlObjs="dtlObjs" v-slot="scope">
        <el-descriptions class="margin-top" title="" :column="2" border size="small">
            <el-descriptions-item label="ID" label-class-name="table-1-5" content-class-name="table-3-5">{{scope.dtlObj._id}} </el-descriptions-item>
            <el-descriptions-item label="用户名" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.name}} </el-descriptions-item>
            <el-descriptions-item label="用户类型" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.roleId.name}}</el-descriptions-item>
            <el-descriptions-item label="手机" label-class-name="table-1-5" content-class-name="table-3-5">{{scope.dtlObj.phone}}</el-descriptions-item>
            <el-descriptions-item label="创建时间" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.createDate|date}}</el-descriptions-item>
            <el-descriptions-item label="邮箱" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.email}}</el-descriptions-item>
        </el-descriptions>
    </vue-dtl>

</div>
</template>

<script>
import mianApi from "../../api/mian";
import VueEdit from "../../components/share/edit.vue";
import VueAdd from "../../components/share/add.vue";
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
                getData: mianApi.user.getData,
                getDataDtl: mianApi.user.getDataDtl,
                postData: mianApi.user.postData,
                putData: mianApi.user.putData,
                deleteData: mianApi.user.deleteData,
                getUserRoleAll: mianApi.userRole.getAll
            },

            // 增删查改的对象
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
            editObj: {},
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
            userRoleList: [],

        };
    },
    async created() {
        this.getList();
        this.getUserRoleAll();
    },
    computed: {
        getUserVid() {
            return this.$store.getters.getUserVid;
        }
    },
    methods: {

        async getUserRoleAll() {
            let res = await this.api.getUserRoleAll();
            if (!res) {
                return;
            }
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

        addBtn() {
            this.$refs.addBox.show();
            this.getUserRoleAll();
        },

        editBtn(item) {
            this.editDialogVisible = true;
            this.editObj = Object.assign({}, item, {
                roleId: item.roleId._id
            });
            this.getUserRoleAll();
            this.$refs.editBox.show()
        },

    },

    components: {
        VueDtl,
        VueAdd,
        VueEdit,
        VuePagination
    }
};
</script>
