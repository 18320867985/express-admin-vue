import {ValidationProvider, ValidationObserver} from 'vee-validate';
import {extend} from 'vee-validate';
import axios from "../api/ins";

// 内置规则
import {required, email, confirmed, min} from 'vee-validate/dist/rules';

extend('email', {
  ...email,
  message: "邮箱格式不正确！"
});

extend('required', {
  ...required,
  message: '此字段不能为空!'
});

extend('confirmed', {
  ...confirmed,
  message: "密码不相同！"
});

extend('min', {
  ...min,
  message: "最小的长度！"
});

// 自定义规则
extend('userName', value =>
{
  let bl = new RegExp("^[a-zA-Z_][a-zA-Z|_|\\d]{3,50}", "i").test(value);
  return bl;
});

extend('phone', value =>
{
  let bl = new RegExp("^1\\d{10}", "i").test(value);
  return bl;
});

// remote 异步验证 例如： rule="required:true,min:4,unique:admin/user/data/unique"
extend('unique', (value, [ url ]) =>
{
  return new Promise((resolve) =>
  {
    axios.get(`${url}/${value}`).then(res =>
    {
      let data = res.data;
      resolve(data);
    }).catch(err =>
    {
      console.log(err);
      return false;
    });

  });
});


export default {ValidationProvider, ValidationObserver};