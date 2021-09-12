<template>
<div class="user">
    <vee ref="userPwd" v-slot="{ invalid ,dirty}" class="form-validate">

        <div class="userPwd">

            <el-form label-width="120px"  size="medium">
                 <el-form-item label="当前用户：" class="username" size="medium">
                    {{getUserinfo.name}}
                </el-form-item>
                <el-form-item label="原密码">
                    <el-input v-model="user.oldPwd" placeholder="==原密码=="  type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="user.newPwd" placeholder="==新密码==" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                    <el-input v-model="user.newPwd2"  placeholder="==确认新密码==" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- invalid&&dirty -->
                    <el-button type="primary" :class="{'disabled':invalid&&dirty}" >修改</el-button>
                </el-form-item>

            </el-form>
        </div>

    </vee>
</div>
</template>

<script>
import mianApi from "../../api/mian";

export default {

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
            user: {
                oldPwd: null,
                newPwd: null,
                newPwd2: null,
            }

        };
    },
    async created() {

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

    },

    components: {

    }
};
</script>

<style lang="scss">
.userPwd {

    margin: 80px auto 0;
    width: 500px;

    h4{
        margin-left: 100px;
        font-size: 16px;
        color: #777;

    }

    .username{
        color:#333;
    }
}
</style>
