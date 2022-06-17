export const Userverification = {
    data() {
        var checkname = (rule, value, callback) => {
            const regname = /^[a-zA-Z0-9_-]{4,10}$/
            if (regname.test(value)) {
                return callback()
            }
            return callback(new Error('用户名格式不正确'))
        }
        var checkphone = (rule, value, callback) => {
            const regphone = /^1[34578]\d{9}$/
            if (regphone.test(value)) {
                return callback()
            }
            return callback(new Error('手机号格式不正确'))
        }
        var checkemail = (rule, value, callback) => {
            const regemail = /^([a-zA-Z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            if (regemail.test(value)) {
                return callback()
            }
            return callback(new Error('邮箱格式不正确'))
        }

        return {
            addrules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: checkname, message: '长度在4-10个字符', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkphone, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkemail, trigger: 'blur' }
                ]
            }
        }
    }
}