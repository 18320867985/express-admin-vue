<template>
<div class="user">
    <div class="userInfo-desc">

        <el-descriptions title="用户信息" :column="2" size="medium" border>

            <el-descriptions-item label="id" label-class-name="table-1-5" content-class-name="table-3-5"> {{userinfo._id}} </el-descriptions-item>
            <el-descriptions-item label="用户名" label-class-name="table-1-5" content-class-name="table-3-5"> {{userinfo.name}} </el-descriptions-item>
            <el-descriptions-item label="用户类型" label-class-name="table-1-5" content-class-name="table-3-5"> {{userinfo.roleId&&userinfo.roleId.name}} </el-descriptions-item>
            <el-descriptions-item label="手机" label-class-name="table-1-5" content-class-name="table-3-5">  <el-tag size="small">{{userinfo.phone}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="邮箱" label-class-name="table-1-5" content-class-name="table-3-5"> {{userinfo.email}}</el-descriptions-item>
            <el-descriptions-item label="创建时间" label-class-name="table-1-5" content-class-name="table-3-5"> {{userinfo.createDate|date}} </el-descriptions-item>
             <el-descriptions-item label="联系地址" label-class-name="table-1-5" content-class-name="table-3-5"></el-descriptions-item>

        </el-descriptions>

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
                getDataDtl: mianApi.user.getDataDtl,
            },
            userinfo: {}
        }
    },
    async created() {
        let userinfo = this.$store.getters.getUserinfo;
        let data = await this.api.getDataDtl([userinfo._id]);
        if (!data) {
            return;
        }
        this.userinfo = data.data && data.data[0];
    },
}
</script>

<style lang="scss" scoped>
.userInfo-desc {
    width: 90%;
    margin: 20px auto 0;

    .el-descriptions {
        background: #fff;
        padding: 20px;
    }
}
</style>
