<template>
     <el-dialog :title="title" :visible.sync="dtlDialogVisible" width="800px" class="dtl">
        <template v-for="(item) in dtlObjs">
          <slot :dtlObj="item"></slot>
        </template>
    </el-dialog>
</template>

<script>
export default {
    props:{
        dtlObjs:{
            type:Array
        },

        title:{
            type:String,
            default:"查看详情"
        }

    },
    data(){
        return{
            dtlDialogVisible:false
        }
    },
 
    methods: {
        show(){
            this.dtlDialogVisible=true;
        },

        hide(){
             this.dtlDialogVisible=false;
        }
    },
}
</script>
