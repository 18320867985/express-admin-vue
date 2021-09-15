<template>
<el-dialog :title="title" :visible.sync="editDialogVisible" :width="width" class="dtl" @close="closeFn">
    <vee ref="editform" v-slot="{ invalid ,dirty,reset}" class="form-validate">
        <el-form label-width="120px" :style="{width:contentWidth}">
            <slot :editObj="editObj"></slot>
            <el-form-item>
                <el-button type="primary" :class="{'disabled':invalid&&dirty}" @click="editData(reset)" :loading="eidtLoading">{{btnText}}</el-button>
                <el-button @click="editDialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </vee>

</el-dialog>
</template>

<script>
export default {
    props: {
        putData: {
            type: Function,
            default: function () {}
        },
        editObj: {
            type: Object,
        },
        getList: {
            type: Function,
            default: function () {}
        },
        btnText: {
            type: String,
            default: "保存修改"
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
            type: Function
        }

    },
    data() {
        return {
            eidtLoading: false,
            editDialogVisible: false,

        }

    },
    methods: {
        editData(reset) {

            this.$refs.editform.validate().then(async (success) => {
                if (!success) {
                    return;
                }
                
                if (this.eidtLoading) {
                    return;
                }
                this.eidtLoading = true;
                let res = await this.putData(this.editObj);
                this.eidtLoading = false;
                if (!res) {
                    return
                }
                if (res && res.code == 1) {
                    this.$message({
                        showClose: true,
                        message: "数据修改成功",
                        type: "success",
                    });
                    reset();
                    for (let prop of Object.keys(this.editObj)) {
                        this.editObj[prop] = null;
                         if(prop==="content"){
                          // this.editObj[prop] = "";  
                        }
                    }
                    this.editDialogVisible = false;
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
        closeFn() {
            if (typeof this.close === "function") {
                this.close();
            }
            for (let prop of Object.keys(this.editObj)) {
                this.editObj[prop] = null;
            }
        },
        show() {
            this.editDialogVisible = true;
        },
        hide() {
            this.editDialogVisible = false;
        }
    },
}
</script>
