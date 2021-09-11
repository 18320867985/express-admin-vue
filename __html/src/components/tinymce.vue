<template>
<div class="tinymce-box">
    <editor v-model="tinymceValue" :init="init" :disabled="disabled" @click="onClick">
    </editor>
    <div id="line_box"></div>
</div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'

// 引入富文本编辑器主题的js和css
import 'tinymce/skins/content/default/content.css'
import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/icons/default/icons' // 解决了icons.js 报错Unexpected token '<'

// 编辑器插件plugins
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'

import axios from '../api/ins';
import config from "../api/_config";

export default {
    components: {
        Editor
    },
    name: 'Tinymce',
    props: {
        value: {
            type: String,
            default: ''
        },
        // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
        // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
        baseUrl: {
            type: String,
            default: window.location.origin ? window.location.origin : ''
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false
        },
        plugins: {
            type: [String, Array],
            default: 'link lists image code table wordcount media preview fullscreen help '
        },
        toolbar: {
            type: [Array],
            default: function () {
                return ['bold italic underline strikethrough | fontsizeselect | formatselect fullscreen preview | forecolor backcolor',
                    ' alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | undo redo | link unlink code lists table image  '
                ]
            }
        },
        width: {
            type: Number,
            default: 600
        },
        height: {
            type: Number,
            default: 300
        },
        fileUrl: {
            type: String,
            default: "/file"
        },

    },
    data() {
        return {

            init: {
                language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
                language: 'zh_CN',
                skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
                // skin_url: '/public/tinymce/skins/ui/oxide-dark',
                convert_urls: false,
                height: this.height,
                width: this.width,

                // content_css（为编辑区指定css文件）,加上就不显示字数统计了
                //content_css: `${this.baseUrl}tinymce/skins/content/default/content.css`,
                // （指定需加载的插件）
                plugins: this.plugins,
                toolbar: this.toolbar, // （自定义工具栏）
                statusbar: true, // 底部的状态栏
                menubar: 'file edit insert view format table tools help ', // （1级菜单）最上方的菜单
                branding: false, //水印“Powered by TinyMCE”

                // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
                images_upload_handler: (blobInfo, success, failure) => {

                    let formdata = new FormData();
                    formdata.append("file", blobInfo.blob());
                    axios.post(this.fileUrl, formdata).then(function (res) {
                        success(config.baseURL + res.data.data);
                    }).catch(err => {
                        failure(err);
                    });
                }
            },
            tinymceValue: this.value
        }
    },
    mounted() {
        tinymce.init({})
    },

    methods: {
        onClick(e) {
            this.$emit('onClick', e, tinymce)
        },

        clear() {
            this.tinymceValue = ''
        },

    },
    watch: {
        value(newValue) {
            this.tinymceValue = newValue
        },
        tinymceValue(newValue) {
            this.$emit('input', newValue)
        }
    }
}
</script>

<style lang="scss">
.tox.tox-silver-sink.tox-tinymce-aux {
    width: 100%;
    z-index: 4000;
}

.tox-fullscreen .tox.tox-tinymce-aux {
    width: 100%;
    z-index: 4002 !important;
}
</style>>
