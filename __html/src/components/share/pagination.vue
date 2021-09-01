<template>
       <div class="user-page" v-if="tableData.length > 0">
        <div class="block">
            <el-pagination background layout=" prev, pager, next, jumper,total, sizes" :total="pageObj.pageCount" :page-size="pageObj.pageSize" :current-page="pageObj.pageIndex" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageObj.pageSizeList">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        pageObj:{
            type:Object
        },
        tableData:{
            type:Array

        },
        getList:{
            type:Function,
            default:function(){}
        }
    },
    methods: {
          async handleSizeChange(pageSize) {
            this.pageObj.pageSize = pageSize;
            this.pageObj.pageIndex = 1;
            this.getList();
        },

        async handleCurrentChange(pageIndex) {
            this.pageObj.pageIndex = pageIndex;
            this.getList();
        },
    },
    
}
</script>