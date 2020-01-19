import Vue from 'vue';
import { Button, Input,Form,FormItem ,Header,Aside,Main,Container } from 'element-ui';
import { Message} from 'element-ui';
//import{Menu,SubMenu,MenuItem,MenuItemGroup} from 'element-ui';

//表单常用
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.prototype.$message=Message

//导航栏布局
// Vue.use(Menu);
// Vue.use(SubMenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);

// 布局
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Container);
