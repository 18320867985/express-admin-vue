<template>
     <el-dialog :title="title" :visible.sync="dtlDialogVisible" :width="width" class="dtl" style=" min-width:1440px">
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
        },
        width:{
            type:String,
            default:"50%"
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
