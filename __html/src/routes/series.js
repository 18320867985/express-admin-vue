
//  Series
import  Series from "../views/series/seriesList.vue";
import  SeriesType from "../views/series/seriesType.vue"

export default [
    {
		path: "",
		component: Series,
		meta:{ ttl:"系列列表"},

	},
	{
		path: "seriesType",
		component: SeriesType,
		meta:{ ttl:"系列类型"},

	},


];
