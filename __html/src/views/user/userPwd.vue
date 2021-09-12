<template>
<div class="user">

    <div class="userPwd">
        <vee ref="userPwd" v-slot="{ invalid ,dirty,reset}" class="form-validate">
            <el-form label-width="120px" size="medium">

                <el-form-item label="当前用户：" class="username" size="medium">
                  <span class="text-primary" style="font-size:16px">{{getUserinfo.name}}</span>  
                </el-form-item>

                <vee-item rules="required|min:8" v-slot="{ failedRules }">
                    <el-form-item label="原密码">
                        <el-input v-model="user.oldPwd" placeholder="==原密码==" type="password"></el-input>
                        <span class="text-danger" v-if="failedRules.required">原密码不能为空！</span>
                        <span class="text-danger" v-if="failedRules.min">密码长度最少要8位！</span>
                    </el-form-item>
                </vee-item>

                <vee-item rules="required|min:8" v-slot="{ failedRules }" vid="user.newPwd">
                    <el-form-item label="新密码">
                        <el-input placeholder="==新密码==" type="password" v-model="user.newPwd"></el-input>
                        <span class="text-danger" v-if="failedRules.required">密码不能为空！</span>
                        <span class="text-danger" v-if="failedRules.min">密码长度最少要8位！</span>
                    </el-form-item>
                </vee-item>

                <vee-item rules="required|confirmed:user.newPwd" v-slot="{ failedRules }">
                    <el-form-item label="确认新密码">
                        <el-input placeholder="==确认新密码==" type="password" v-model="user.newPwd2"></el-input>
                        <span class="text-danger" v-if="failedRules.required ">确认密码不能为空！</span>
                        <span class="text-danger" v-if="failedRules.confirmed ">确认密码不相同！</span>
                    </el-form-item>
                </vee-item>

                <el-form-item>
                    <!-- invalid&&dirty -->
                    <el-button type="primary" :class="{'disabled':invalid&&dirty}" @click="editPwd(reset)" :loading="loading">修改</el-button>
                </el-form-item>

            </el-form>
        </vee>
    </div>

</div>
</template>

<script>
import mianApi from "../../api/mian";

export default {

    data() {
        return {

            // axios 接口
            api: {
                putEditPwd: mianApi.user.putEditPwd,
            },
            user: {
                _id:null,
                oldPwd: null,
                newPwd: null,
                newPwd2: null,
            },
            loading:false,
            isSubmit:false,

        };
    },

    computed: {
        getUserVid() {
            return this.$store.getters.getUserVid;
        },
        getUserinfo() {
            return this.$store.getters.getUserinfo;
        }
    },
    methods: {
        editPwd(reset) {
            this.$refs.userPwd.validate().then(async (success) => {
                if (!success) {
                    return;
                }
                this.user._id=this.getUserinfo._id;
                if(this.loading){return;}
                this.loading = true;
                let res = await this.api.putEditPwd(this.user);
                this.loading = false;

                if (!res) {
                    return;
                }
                if (res.code == 1) {
                     reset();
                     for (let prop of Object.keys(this.user)) {
                        this.user[prop] = null;
                    }
                    this.$message({
                        showClose: true,
                        message: "数据添加成功",
                        type: "success",
                    });
                    
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

<style lang="scss">
.userPwd {

    margin: 80px auto 0;
    width: 500px;

    h4 {
        margin-left: 100px;
        font-size: 16px;
        color: #777;

    }

    .username {
        color: #333;
    }
}
</style>
