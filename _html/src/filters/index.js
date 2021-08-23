
//时间日期的过滤器
let date={
    name:"date",
    value (value, fmt)
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

    }

}


let filterlist=[
    date
];


export default{

    install(Vue){
        filterlist.forEach(item=>
            {
                Vue.filter(item.name,item.value);
            });

    }
}