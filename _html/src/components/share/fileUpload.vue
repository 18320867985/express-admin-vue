<template>
<div>
    <el-button icon="el-icon-upload " @click="fileBtnClick" v-if="!fileUploading">上传图片</el-button>
    <input type="file" style="display:none" ref="fileInput" @change="fileUpload"  :accept="fileType"  />
    <el-progress :text-inside="true" status="success" :stroke-width="16" :percentage="percentage" v-if="fileUploading" style=" transform:translateY(50%)"></el-progress>
</div>
</template>

<script>
import axios from '../../api/ins';
export default {
    props: {
        url:{
            type:String,
            default:"/file"
        },
        size:{
            default:10, // 默认 10M
            type:Number
        },
        fileType:{
            type:String,
            default:"image/*"
        }
      
    },
    data() {
        return {
            fileUploading: false,
            percentage: 0,
        }
    },
    methods: {
        fileBtnClick() {
            this.$refs.fileInput.click();
        },
        fileUpload() {
            let formData = new FormData();
            let data = this.$refs.fileInput.files[0];
            console.log("data.size ",data.size )
            if (data.size >(this.size*1024*1024)) {
                alert("文件大于" + this.size + "M");
                return;
            }
            formData.append("file", data);
            this.fileUploading = true;
            this.percentage = 0;
            axios({
                url: this.url,
                method: 'post',
                onUploadProgress: (progressEvent) => {
                    //原生获取上传进度的事件
                    this.percentage = Math.round(progressEvent.loaded / progressEvent.total) * 100;
                },
                data: formData
            }).then(res => {
                this.fileUploading = false;
                this.$emit("change", res.data)
            }).catch(error => {
                this.fileUploading = false;
                this.percentage = 0;
                console.log(error)
            })
        }
    },
}
</script>
