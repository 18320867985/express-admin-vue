import { ValidationProvider,ValidationObserver  } from 'vee-validate';
import { extend } from 'vee-validate';

// 内置规则
import { required, email } from 'vee-validate/dist/rules';

// No message specified.
extend('email', {
    ...email,
    message:"邮箱格式不正确！"
});

// Override the default message.
extend('required', {
  ...required,
  message: '此字段不能为空!'
});

// 自定义规则
extend('positive', value => {
    return value >= 100;
  });

export   default {ValidationProvider,ValidationObserver};