// 轮播图
const  orm= require("./_mongoose");

var childSchema = new orm.mongoose.Schema({
   ttl:{
       type:String,
       default:""
   },
   url:{
       type:String,
       default:""
   },
   src:{
       type:String,
       default:""
   },
   order:{
       type:Number,
       default:1
   }
});

var schema = new orm.mongoose.Schema({
    name:{type:String,
       index:true,
      },
      code:{
          type:String,
          unique:true, 
      },
    
    createdt:{
            type:Date,
            default:Date.now
    },
    modidt:{
        type:Date,
        default:Date.now
    },
    
    order:{
        type:Number,
        default:1
    },

    imgs:{
        type:[childSchema]
    }
   
});

var Rotation =orm.db.model("Rotation", schema);

module.exports = Rotation;