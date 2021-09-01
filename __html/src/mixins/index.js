export const pageOption={
   
    data(){
        return {
           pageObj:{
            pageIndex:1,
            pageSize:10,
            pageCount:0,
            pageSizeList:[1,2,5,10,20,30,40,50,100,200,500]
           }
        }
    }

}

export const toDateStartOrEnd = {

    methods: {

        toDateStart (value)
        {
            value = this.toDate(value, "yyyy-MM-dd");
            if (!value) {return "";}
            return value + " 00:00:00";
        },

        toDateEnd (value)
        {
            value = this.toDate(value, "yyyy-MM-dd");
            if (!value) {return "";}
            return value + " 23:59:59";
        },

        toDate (value, fmt)
        {
            if (!value) {return "";}
            fmt = typeof fmt !== "string" ? "yyyy-MM-dd HH:mm:ss" : fmt;
            var txts = value.toString().replace("/Date(", "").replace(")/", "");
            var times = Number(txts);
            times = isNaN(times) ? new Date(value).getTime() : times;
            var dt = new Date(Number(times.toString()));
            var o = {
                "M+": dt.getMonth() + 1,
                "d+": dt.getDate(),
                "H+": dt.getHours(),
                "m+": dt.getMinutes(),
                "s+": dt.getSeconds(),
                "q+": Math.floor((dt.getMonth() + 3) / 3),
                "S": dt.getMilliseconds()
            };
            if (/(y+)/.test(fmt))
            {
                fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
            {
                if (new RegExp("(" + k + ")").test(fmt))
                {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (("00" + o[ k ]).substr(("" + o[ k ]).length)));
                }
            }
            return fmt;
        },


    }
}

export const CRUD_Option = {

    methods: {

        async deleteData(ids) {
            this.deleteLoading = true;
            let res = await this.api.deleteData(ids);
            this.deleteLoading = false;
            if (!res) {
                return;
            }
            if (res.code === 1) {
                this.$message({
                    type: "success",
                    message: "数据删除成功！"
                })
                this.getList();
            } else {
                this.$message({
                    type: "error",
                    message: "数据删除失败！"
                })
            }
        },

        deleteOne(ids) {
            this.$confirm(`<strongt style='color:red'>是否要删除该文件?</strong>`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true
            }).then(async () => {
                this.deleteData(ids);
            }).catch(() => {
            });
        },

        deleteMany(ids) {

            this.$confirm(`<strongt style='color:red'>是否要批量删除该文件? 请谨慎操作！</strong>`, '提示', {
                confirmButtonText: '批量删除',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true
            }).then(async () => {
                this.deleteData(ids);
            }).catch(() => {
            });

        },

        async dtlData(ids) {

            this.dtlLoading= true;
            let res = await this.api.getDataDtl(ids);
            this.dtlLoading= false;
            if (!res) {
                return;
            }
            if (res.code === 1) {
                this.dtlObjs = res.data;
                this.$refs.dtlBox.show();
            }
        },

        async dtlOne(id) {
            this.dtlData([id]);
           
        },
        
        async dtlMany(ids) {
            this.dtlData(ids);
           
        },


    }
}