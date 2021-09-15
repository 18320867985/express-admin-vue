<template>
<el-dialog :title="title" :visible.sync="addDialogVisible" :width="width" class="dtl" @!close="close">
    <vee ref="addform" v-slot="{ invalid ,dirty,reset}" class="form-validate">
        <el-form label-width="120px" :style="{width:contentWidth}">
            <slot :addObj="addObj"></slot>
            <el-form-item>
                <!-- invalid&&dirty -->
                <el-button type="primary" :class="{'disabled':invalid&&dirty}" @click="addData(reset)" :loading="addLoading">{{btnText}}</el-button>
                <el-button @click="addDialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </vee>
</el-dialog>
</template>

<script>
export default {
    props: {
        postData: {
            type: Function,
            default: function () {}
        },
        addObj: {
            type: Object,
        },
        getList: {
            type: Function,
            default: function () {}
        },
        btnText: {
            type: String,
            default: "立即添加"
        },
        title: {
            type: String,
            default: "修改信息"
        },
        width: {
            type: String,
            default: "50%"
        },
        contentWidth: {
            type: String,
            default: "70%"
        },
        close: {
            type: Function,
            default: function () {}
        }

    },
    data() {
        return {
            addLoading: false,
            addDialogVisible: false,
        }

    },

    methods: {

        addData(reset) {
            this.$refs.addform.validate().then(async (success) => {
                if (!success) {
                    return;
                }

                if (this.addLoading) {
                    return;
                }
                this.addLoading = true;
                let res = await this.postData(this.addObj);
                this.addLoading = false;

                if (!res) {
                    return
                }
                if (res.code == 1) {
                    this.$message({
                        showClose: true,
                        message: "数据添加成功",
                        type: "success",
                    });
                    reset();
                    for (let prop of Object.keys(this.addObj)) {
                        this.addObj[prop] = null;
                        if(prop==="content"){
                           this.addObj[prop] = "";  
                        }
                    }
                     this.addObj.content="";
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
        },

        show() {
            this.addDialogVisible = true;
        },

        hide() {
            this.addDialogVisible = false;
        }
    },
}
</script>
