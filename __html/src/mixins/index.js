export const pageOption = {

    data ()
    {
        return {
            pageObj: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pageSizeList: [ 1, 2, 5, 10, 20, 30, 40, 50, 100, 200, 500 ]
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

        async deleteData (ids)
        {
            this.deleteLoading = true;
            let res = await this.api.deleteData(ids);
            this.deleteLoading = false;
            if (!res)
            {
                return;
            }
            if (res.code === 1)
            {
                this.$message({
                    type: "success",
                    message: "?????????????????????"
                })
                this.getList();
            } else
            {
                this.$message({
                    type: "error",
                    message: res.msg
                })
            }
        },

        deleteOne (ids)
        {
            this.$confirm(`<strongt style='color:red'>?????????????????????????</strong>`, '??????', {
                confirmButtonText: '??????',
                cancelButtonText: '??????',
                type: 'warning',
                dangerouslyUseHTMLString: true
            }).then(async () =>
            {
                this.deleteData(ids);
            }).catch(() =>
            {
            });
        },

        deleteMany (ids)
        {
            this.$confirm(`<strongt style='color:red'>??????????????????????????????? ??????????????????</strong>`, '??????', {
                confirmButtonText: '????????????',
                cancelButtonText: '??????',
                type: 'warning',
                dangerouslyUseHTMLString: true
            }).then(async () =>
            {
                this.deleteData(ids);
            }).catch(() =>
            {
            });

        },

        async dtlData (ids)
        {
            this.dtlLoading = true;
            let res = await this.api.getDataDtl(ids);
            this.dtlLoading = false;
            if (!res)
            {
                return;
            }
            if (res.code === 1)
            {
                this.dtlObjs = res.data;
                this.$refs.dtlBox.show();
            }
        },

        async dtlOne (id)
        {
            this.dtlData([ id ]);
        },

        async dtlMany (ids)
        {
            this.dtlData(ids);
        },


    }
}

export const transformHtml = {

    methods: {

        // ??????????????????html
        deHtml (txt)
        {
            txt = txt.replace(/&lt;/img, "<").replace(/&gt;/img, ">").replace(/&nbsp;/img, " ");
            return txt;
        },

        // ???html????????????
        enHtml (txt)
        {
            txt = txt.replace(/</img, "&lt;").replace(/>/img, "&gt;").replace(/\s+/img, "&nbsp;");
            return txt;
        }
    }
}

export const copyObj = {

    methods: {

        // ????????? parentObj,childObj
        copy (parentObj, childObj)
        {
            childObj = childObj || {};
            for (var prop in parentObj)
            {
                childObj[ prop ] = parentObj[ prop ];
            }
            return childObj;
        },

        // ????????? parentObj,childObj
        copyDeep (parentObj, childObj)
        {
            childObj = childObj || {};
            for (var prop in parentObj)
            {
                if (typeof parentObj[ prop ] === "object" && parentObj[ prop ] !== null)
                {
                    childObj[ prop ] = parentObj[ prop ].constructor === Array ? [] : {};
                    this.copyDeep(parentObj[ prop ], childObj[ prop ]);
                } else
                {
                    childObj[ prop ] = parentObj[ prop ];
                }
            }
            return childObj;
        }

    }

}
