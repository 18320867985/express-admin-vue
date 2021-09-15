<template>
<div class="user">
    <!-- 表单 -->
    <el-form :inline="true" class="form-inline">
        <el-form-item label="">
            <el-input placeholder="==名称==" v-model="queryObj.name"></el-input>
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

            <el-table-column prop="name" label="名称" sortable> </el-table-column>

            <el-table-column prop="vname" label="标记名称" sortable>
            </el-table-column>

            <el-table-column prop="desc" label="描述" width="200px">
            </el-table-column>

            <!-- <el-table-column prop="content" label="内容">
                <template v-slot="scope">
                    <div v-html="scope.row.content"></div>
                </template>
            </el-table-column> -->

            <el-table-column prop="order" label="排序"></el-table-column>

            <el-table-column label="创建时间" sortable width="150px">
                <template v-slot="scope">
                    <span>{{
              scope.row.createDate | date("yyyy-MM-dd HH:mm:ss")
            }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="修改时间">
                <template v-slot="scope">
                    <span>{{scope.row.editDate | date("yyyy-MM-dd HH:mm:ss")}}</span>
                </template>
            </el-table-column> -->

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
    <vue-add ref="addBox" title="添加联系" :addObj="addObj" :getList="getList" :postData="api.postData" v-slot="scope">
        <vee-item :rules="'required|unique:/main/' + itemName + '/data-unique'" v-slot="{ failedRules }">
            <el-form-item label="名称">
                <el-input placeholder="==名称==" v-model="scope.addObj.name"></el-input>
                <span class="text-danger" v-if="failedRules.required">名称不能为空！</span>
                <span class="text-danger" v-if="failedRules.unique">名称已存在！</span>
            </el-form-item>
        </vee-item>

        <vee-item :rules="'required|unique:/main/' + itemName + '/data-unique-vid'" v-slot="{ failedRules }">
            <el-form-item label="标记名称">
                <el-input placeholder="==标记名称==" v-model="scope.addObj.vname" maxlength="32">></el-input>
                <span class="text-danger" v-if="failedRules.required">标记名称不能为空！</span>
                <span class="text-danger" v-if="failedRules.unique">标记名称已存在！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required" v-slot="{ failedRules }">
            <el-form-item label="描述">
                <el-input placeholder="==描述==" v-model="scope.addObj.desc" maxlength="32">></el-input>
                <span class="text-danger" v-if="failedRules.required">描述不能为空！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="integer" v-slot="{ failedRules }">
            <el-form-item label="排序">
                <el-input placeholder="==排序==" v-model="scope.addObj.order" maxlength="8"></el-input>
                <span class="text-danger" v-if="failedRules.integer">必须为整型数字！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required" v-slot="{ failedRules }">
            <el-form-item label="内容">
                <vue-tinymce  v-model="scope.addObj.content"  :height="320" :width="610"></vue-tinymce>
                <span class="text-danger" v-if="failedRules.required">内容不能为空！</span>
            </el-form-item>
        </vee-item>
    </vue-add>

    <!--edit-->
    <vue-edit ref="editBox" title="修改联系" :editObj="editObj" :getList="getList" :putData="api.putData" v-slot="scope" >
        <vee-item :rules="'required|unique:/main/' +itemName +'/data-unique,' +scope.editObj._id" v-slot="{ failedRules }">
            <el-form-item label="名称">
                <el-input placeholder="==名称==" v-model="scope.editObj.name"></el-input>
                <span class="text-danger" v-if="failedRules.required">名称不能为空！</span>
                <span class="text-danger" v-if="failedRules.unique">名称已存在！</span>
            </el-form-item>
        </vee-item>

        <vee-item :rules="'required|unique:/main/' + itemName +'/data-unique-vid,' +scope.editObj._id " v-slot="{ failedRules }"  v-if="getUserVid===2">

            <el-form-item label="标记名称">
                <el-input placeholder="==标记名称==" v-model="scope.editObj.vname" maxlength="32">></el-input>
                <span class="text-danger" v-if="failedRules.required">标记名称不能为空！</span>
                <span class="text-danger" v-if="failedRules.unique">标记名称已存在！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required" v-slot="{ failedRules }">
            <el-form-item label="描述">
                <el-input placeholder="==描述==" v-model="scope.editObj.desc" maxlength="32">></el-input>
                <span class="text-danger" v-if="failedRules.required">描述不能为空！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="integer" v-slot="{ failedRules }">
            <el-form-item label="排序">
                <el-input placeholder="==排序==" v-model="scope.editObj.order" maxlength="8"></el-input>
                <span class="text-danger" v-if="failedRules.integer">必须为整型数字！</span>
            </el-form-item>
        </vee-item>
        
        <vee-item rules="required" v-slot="{ failedRules }">
            <el-form-item label="内容">
                <vue-tinymce  v-model="scope.editObj.content"  :height="320" :width="610"></vue-tinymce>
                <div class="text-danger" v-if="failedRules.required" style="position:static">内容不能为空！</div>
            </el-form-item>
        </vee-item>
    </vue-edit>

    <!--dtl-->
    <vue-dtl ref="dtlBox" title="查看详情" :dtlObjs="dtlObjs" v-slot="scope">
        <el-descriptions class="margin-top" title="" :column="2" border size="small">
            <el-descriptions-item label="ID" label-class-name="table-1-5" content-class-name="table-3-5">{{ scope.dtlObj._id }}
            </el-descriptions-item>
            <el-descriptions-item label="名称" label-class-name="table-1-5" content-class-name="table-3-5">
                {{ scope.dtlObj.name }}
            </el-descriptions-item>
            <el-descriptions-item label="标记名称" label-class-name="table-1-5" content-class-name="table-3-5">
                {{ scope.dtlObj.vname }}</el-descriptions-item>
            <el-descriptions-item label="描述" label-class-name="table-1-5" content-class-name="table-3-5">
                {{ scope.dtlObj.desc }}</el-descriptions-item>
            <el-descriptions-item label="排序" label-class-name="table-1-5" content-class-name="table-3-5">{{ scope.dtlObj.order }}</el-descriptions-item>
            <el-descriptions-item label="创建时间" label-class-name="table-1-5" content-class-name="table-3-5">
                {{ scope.dtlObj.createDate | date }}</el-descriptions-item>
            <el-descriptions-item label="内容" label-class-name="table-1-5" content-class-name="table-3-5">
                <div v-html=" scope.dtlObj.content"></div>
            </el-descriptions-item>
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
import VueTinymce from "../../components/tinymce.vue";

import {
    pageOption,
    toDateStartOrEnd,
    CRUD_Option
} from "../../mixins";

export default {
    mixins: [pageOption, toDateStartOrEnd, CRUD_Option],
    data() {
        return {
            itemName: "article",
            // axios 接口
            api: {
                getData: mianApi.article.getData,
                getDataDtl: mianApi.article.getDataDtl,
                postData: mianApi.article.postData,
                putData: mianApi.article.putData,
                deleteData: mianApi.article.deleteData,
            },

            // 增删查改的对象
            queryObj: {
                name: null,
                createDateStart: null,
                createDateEnd: null,
            },
            addObj: {
                name: null,
                vname: null,
                desc: null,
                content: "",
                order: 0,
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
            seriesTypeList: [],

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
            let res = await this.api.getData(
                this.pageObj.pageIndex,
                this.pageObj.pageSize,
                this.queryObj
            );
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
                this.queryObj.createDateStart = this.toDateStart(
                    this.queryObj.createDateStart
                );
            }
            if (this.queryObj.createDateEnd) {
                this.queryObj.createDateEnd = this.toDateEnd(
                    this.queryObj.createDateEnd
                );
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
            this.multipleSelection = val.map((item) => item._id);
        },

        addBtn() {
            this.$refs.addBox.show();
            this.addObj.imgs = [];
        },

        editBtn(item) {
            this.editDialogVisible = true;
            this.editObj = Object.assign({}, item);
            this.$refs.editBox.show();
        },

      
    },

    components: {
        VueDtl,
        VueAdd,
        VueEdit,
        VuePagination,
        VueTinymce
    },
};
</script>
