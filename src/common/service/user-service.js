/**
 * Created by guotaidou on 2018/5/14.
 */
import  MUtil from '../util/mm';
import Config from '../Config.js';

const _mm=new MUtil();

class User{
    //用户登录
    login(loginInfo){
        return _mm.request({
            type:'post',
            url:`${Config.CORE_URL_PREFIX}idm/userAuth`,
            dataType:'json',
            data:loginInfo
        })
    }
    //检查登录接口数据是不是合法
    checkLoginInfo(loginInfo){
        function trim(str){
            str = str.replace(/^(\s|\u00A0)+/,'');
            for(var i=str.length-1; i>=0; i--){
                if(/\S/.test(str.charAt(i))){
                    str = str.substring(0, i+1);
                    break;
                }
            }
            return str;
        }
        let username=trim(loginInfo.cn);
        let password=trim(loginInfo.pwd);
        //判断用户名为空
        if(typeof username!=='string'||username.length===0){
            return {
                status:false,
                msg:'用户名不能为空'
            }
        }
        //判断密码为空
        if(typeof password!=='string'||password.length===0){
            return {
                status:false,
                msg:'密码不能为空'
            }
        }
        return{
            status:true,
            msg:'验证通过'
        }
    }
}
export default User;