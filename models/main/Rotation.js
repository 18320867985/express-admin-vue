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
       default:0
   }
});

var schema = new orm.mongoose.Schema({
    name:{type:String,
       index:true,
      },
      vname:{
        type:String,
        unique:true, 
    },
    
    createDate:{
            type:Date,
            default:Date.now
    },
    editDate:{
        type:Date,
        default:Date.now
    },
    
    order:{
        type:Number,
        default:0
    },

    imgs:{
        type:[childSchema]
    }
   
});

var Rotation =orm.db.model("Rotation", schema);

module.exports = Rotation;