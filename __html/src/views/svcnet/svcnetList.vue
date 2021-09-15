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
            <el-button type="primary" icon="el-icon-folder-add" @click="addBtn" v-if="getUserVid===2"> 添加</el-button>
        </el-button-group>
    </div>

    <!-- 查询表格 -->
    <div class="user-table">
        <el-table :data="tableData" border style="width: 100%" v-loading="tableLoading" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="_id" label="id" width="200"> </el-table-column>

            <el-table-column prop="name" label="名称" sortable> </el-table-column>

            <el-table-column prop="vname" label="标记名称" sortable> </el-table-column>

            <el-table-column prop="addr" label="地址" width="200px"> </el-table-column>

            <el-table-column prop="phone" label="手机号码"> </el-table-column>

            <el-table-column prop="order" label="排序"></el-table-column>

            <el-table-column label="图片列表(个数)">
                <template v-slot="scope">
                    <span v-if="scope.row.imgs.length>0"> {{scope.row.imgs.length+' 张图片'}}</span>
                    <span v-if="!scope.row.imgs.length"> 没有图片</span>
                </template>

            </el-table-column>

            <el-table-column label="创建时间" width="150px">
                <template v-slot="scope">
                    <span>{{scope.row.createDate | date("yyyy-MM-dd HH:mm:ss")}}</span>
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
    <vue-add ref="addBox" title="添加服务网点" :addObj="addObj" :getList="getList" :postData="api.postData" v-slot="scope">
        <vee-item rules="required|unique:/main/svcnet/data-unique" v-slot="{ failedRules  }">
            <el-form-item label="名称">
                <el-input placeholder="==名称==" v-model="scope.addObj.name"></el-input>
                <span class="text-danger" v-if="failedRules.required">名称不能为空！</span>
                <span class="text-danger" v-if="failedRules.unique">名称已存在！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required|unique:/main/svcnet/data-unique-vid" v-slot="{ failedRules  }">
            <el-form-item label="标记名称">
                <el-input placeholder="==标记名称==" v-model="scope.addObj.vname" maxlength="32">></el-input>
                <span class="text-danger" v-if="failedRules.required">标记名称不能为空！</span>
                <span class="text-danger" v-if="failedRules.unique">标记名称已存在！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required" v-slot="{ failedRules  }">
            <el-form-item label="地址">
                <el-input placeholder="==地址==" v-model="scope.addObj.addr" maxlength="64">></el-input>
                <span class="text-danger" v-if="failedRules.required">地址不能为空！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required|phone" v-slot="{ failedRules  }">
            <el-form-item label="手机号码">
                <el-input placeholder="==手机号码==" v-model="scope.addObj.phone" maxlength="11">></el-input>
                <span class="text-danger" v-if="failedRules.required">手机号码不能为空！</span>
                <span class="text-danger" v-if="failedRules.phone">手机号码格式不对！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="integer" v-slot="{ failedRules }">
            <el-form-item label="排序">
                <el-input placeholder="==排序==" v-model="scope.addObj.order" maxlength="8"></el-input>
                <span class="text-danger" v-if="failedRules.integer ">必须为整型数字！</span>
            </el-form-item>
        </vee-item>

        <vee-item>
            <el-form-item label="上传图片" class="file-upload">
                <file-upload ref="addFileUpload" url="/file" @change="addFileChange" :size="5" :fileType="'image/*'" :changeFileObj="addChangeFileObj"></file-upload>
                <template v-for="(item ,index) in scope.addObj.imgs">
                    <div :key="index" style="border: 1px solid #ddd;  margin-top:15px; padding: 5px;">
                        <el-form label-width="40px">
                            <img :src="$baseURL+item.src" alt="" v-if="scope.addObj.imgs.length>0" style="max-width:100%; "  @click="addChangeFileObjClick(item)"/>

                            <vee-item rules="required" v-slot="{ failedRules }">
                                <el-form-item label="标题">
                                    <el-input placeholder="==图片标题==" v-model="item.ttl"> </el-input>
                                    <span class="text-danger" v-if="failedRules.required">图片标题不能为空！</span>
                                </el-form-item>
                            </vee-item>
                            <vee-item rules="required" v-slot="{ failedRules }">
                                <el-form-item label="URL">
                                    <el-input placeholder="==跳转的url地址==" v-model="item.url"> </el-input>
                                    <span class="text-danger" v-if="failedRules.required">url地址不能为空！</span>
                                </el-form-item>
                            </vee-item>
                            <vee-item rules="integer" v-slot="{ failedRules }">
                                <el-form-item label="排序">
                                    <el-input placeholder="==图片排序==" v-model="item.order"> </el-input>
                                    <span class="text-danger" v-if="failedRules.integer ">必须为整型数字！</span>
                                </el-form-item>
                            </vee-item>
                            <el-form-item label="显示">
                                <el-switch v-model="item.enabled"></el-switch>
                            </el-form-item>

                            <el-link type="danger" class="del" @click="addDelImg(index)">删除</el-link>
                        </el-form>

                    </div>
                </template>

            </el-form-item>
        </vee-item>

    </vue-add>

    <!--edit-->
    <vue-edit ref="editBox" title="修改服务网点" :editObj="editObj" :getList="getList" :putData="api.putData" v-slot="scope">
        <vee-item :rules="'required|unique:/main/svcnet/data-unique,'+scope.editObj._id" v-slot="{ failedRules  }">
            <el-form-item label="名称">
                <el-input placeholder="==用户名==" v-model="scope.editObj.name"></el-input>
                <span class="text-danger" v-if="failedRules.required">名称不能为空！</span>
                <span class="text-danger" v-if="failedRules.unique">名称已存在！</span>
            </el-form-item>
        </vee-item>

        <vee-item :rules="'required|unique:/main/svcnet/data-unique-vid,'+scope.editObj._id" v-slot="{ failedRules  }"  v-if="getUserVid===2">
            <el-form-item label="标记名称">
                <el-input placeholder="==标记名称==" v-model="scope.editObj.vname" maxlength="32">></el-input>
                <span class="text-danger" v-if="failedRules.required">标记名称不能为空！</span>
                <span class="text-danger" v-if="failedRules.unique">标记名称已存在！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required" v-slot="{ failedRules  }">
            <el-form-item label="地址">
                <el-input placeholder="==地址==" v-model="scope.editObj.addr" maxlength="64">></el-input>
                <span class="text-danger" v-if="failedRules.required">地址不能为空！</span>
            </el-form-item>
        </vee-item>

        <vee-item rules="required|phone" v-slot="{ failedRules  }">
            <el-form-item label="手机号码">
                <el-input placeholder="==手机号码==" v-model="scope.editObj.phone" maxlength="11">></el-input>
                <span class="text-danger" v-if="failedRules.required">手机号码不能为空！</span>
                <span class="text-danger" v-if="failedRules.phone">手机号码格式不对！</span>
            </el-form-item>
        </vee-item>
        <vee-item rules="integer" v-slot="{ failedRules }">
            <el-form-item label="排序">
                <el-input placeholder="==排序==" v-model="scope.editObj.order" maxlength="8"></el-input>
                <span class="text-danger" v-if="failedRules.integer ">必须为整型数字！</span>
            </el-form-item>
        </vee-item>
        <vee-item>
            <el-form-item label="上传图片" class="file-upload">
     <file-upload ref="editFileUpload" url="/file" @change="editFileChange" :size="5" :fileType="'image/*'" :changeFileObj="editChangeFileObj"></file-upload>
                <template v-for="(item ,index) in scope.editObj.imgs">
                    <div :key="index" style="border: 1px solid #ddd;  margin-top:15px; padding: 5px;">
                        <el-form label-width="40px">
                            <img :src="$baseURL+item.src" alt="" v-if="scope.editObj.imgs.length>0" style="max-width:100%; " @click="editChangeFileObjClick(item)" />

                            <vee-item rules="required" v-slot="{ failedRules }">
                                <el-form-item label="标题">
                                    <el-input placeholder="==图片标题==" v-model="item.ttl"> </el-input>
                                    <span class="text-danger" v-if="failedRules.required">图片标题不能为空！</span>
                                </el-form-item>
                            </vee-item>
                            <vee-item rules="required" v-slot="{ failedRules }">
                                <el-form-item label="URL">
                                    <el-input placeholder="==跳转的url地址==" v-model="item.url"> </el-input>
                                    <span class="text-danger" v-if="failedRules.required">url地址不能为空！</span>
                                </el-form-item>
                            </vee-item>
                            <vee-item rules="integer" v-slot="{ failedRules }">
                                <el-form-item label="排序">
                                    <el-input placeholder="==图片排序==" v-model="item.order"> </el-input>
                                    <span class="text-danger" v-if="failedRules.integer ">必须为整型数字！</span>
                                </el-form-item>
                            </vee-item>
                            <el-form-item label="显示">
                                <el-switch v-model="item.enabled"></el-switch>
                            </el-form-item>

                            <el-link type="danger" class="del" @click="editDelImg(index)">删除</el-link>
                        </el-form>

                    </div>
                </template>

            </el-form-item>
        </vee-item>

    </vue-edit>

    <!--dtl-->
    <vue-dtl ref="dtlBox" title="查看详情" :dtlObjs="dtlObjs" v-slot="scope">
        <el-descriptions class="margin-top" title="" :column="2" border size="small">
            <el-descriptions-item label="ID" label-class-name="table-1-5" content-class-name="table-3-5">{{scope.dtlObj._id}} </el-descriptions-item>
            <el-descriptions-item label="轮播图片标题" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.name}} </el-descriptions-item>
            <el-descriptions-item label="标记名称" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.vname}}</el-descriptions-item>
            <el-descriptions-item label="地址" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.addr}}</el-descriptions-item>
            <el-descriptions-item label="手机号码" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.phone}}</el-descriptions-item>
            <el-descriptions-item label="排序" label-class-name="table-1-5" content-class-name="table-3-5">{{scope.dtlObj.order}}</el-descriptions-item>
            <el-descriptions-item label="创建时间" label-class-name="table-1-5" content-class-name="table-3-5"> {{scope.dtlObj.createDate|date}}</el-descriptions-item>
            <el-descriptions-item label="修改时间" label-class-name="table-1-5" content-class-name="table-3-5">{{scope.dtlObj.editDate|date}}</el-descriptions-item>

            <el-descriptions-item label="图片列表" label-class-name="table-1-5" content-class-name="table-3-5">

                <template v-for="(img,index ) in scope.dtlObj.imgs">
                    <div class="imgs-cont" :key="index">
                        <div class="imgs-cont-l">
                            <img :src="$baseURL+ img.src" alt="图片" style="max-width:100%;">
                        </div>
                        <div class="imgs-cont-r">
                            <el-descriptions title="" :column="1">
                                <el-descriptions-item label="图片标题">{{img.ttl}}</el-descriptions-item>
                                <el-descriptions-item label="跳转地址">{{img.url}}</el-descriptions-item>
                                <el-descriptions-item label="图片排序">{{img.order}}</el-descriptions-item>
                                <el-descriptions-item label="是否显示">{{img.enabled?'是':'否'}}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </div>
                </template>

                <template v-if="scope.dtlObj.imgs.length===0">没有图片</template>

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
import FileUpload from '../../components/share/fileUpload.vue'

import {
    pageOption,
    toDateStartOrEnd,
    CRUD_Option,
    copyObj
} from "../../mixins";
export default {
    mixins: [pageOption, toDateStartOrEnd, CRUD_Option,copyObj],
    data() {
        return {

            // axios 接口
            api: {
                getData: mianApi.svcnet.getData,
                getDataDtl: mianApi.svcnet.getDataDtl,
                postData: mianApi.svcnet.postData,
                putData: mianApi.svcnet.putData,
                deleteData: mianApi.svcnet.deleteData,
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
                addr: null,
                phone: null,
                order: 0,
                imgs: []
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

            // add上传编辑图片
            addChangeFileObj: null,

            // edit上传编辑图片
            editChangeFileObj: null,

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
            if(!this.addObj.imgs){
                this.addObj.imgs = [];
            }
           
        },

        editBtn(item) {
            console.log(item)
            this.editDialogVisible = true;
            this.editObj = this.copyDeep(item,{});
            this.$refs.editBox.show()
        },

        addFileChange(data, editImgObj) {
            // 编辑图片
            if (editImgObj) {
                editImgObj.src = data.data;
                this.addChangeFileObj = null;
                return;
            }

            // 添加图片
            let obj = {
                url: null,
                src: data.data,
                ttl: null,
                order: null,
                enabled: true
            };
            let imgs = this.addObj.imgs || [];
            imgs.unshift(obj);

        },

        addDelImg(index) {
            this.addObj.imgs.splice(index, 1);
        },

        editFileChange(data, editImgObj) {
            // 编辑图片
            if (editImgObj) {
                editImgObj.src = data.data;
                this.editChangeFileObj = null;
                return;
            }

            // 添加图片
            let obj = {
                url: null,
                src: data.data,
                ttl: null,
                order: null,
                enabled: true
            };
            let imgs = this.editObj.imgs || [];
            imgs.unshift(obj);

        },

        editDelImg(index) {
            this.editObj.imgs.splice(index, 1);
        },
        addChangeFileObjClick(item) {
            this.addChangeFileObj = item;
            this.$refs.addFileUpload.fileBtnClick();
        },

        editChangeFileObjClick(item) {
            this.editChangeFileObj = item;
            this.$refs.editFileUpload.fileBtnClick();
        }

    },

    components: {
        VueDtl,
        VueAdd,
        VueEdit,
        VuePagination,
        FileUpload
    }
};
</script>
