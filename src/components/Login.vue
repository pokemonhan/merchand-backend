<template>
    <div class="login">
        <div class="login-box">
            <div class="title">江湖互娱</div>
            <form id="loginForm">
                <ul>
                    <li class="acc flex">
                        <span>账号:</span>
                        <Input
                            v-model="email"
                            @keyup="limitemail"
                            @update="checkUname"
                            limit="no-zh-cn"
                            holder="请输入账号"
                        />
                    </li>
                    <li class="err-item">
                        <span>{{unameMsg}}</span>
                    </li>
                    <li class="psw flex">
                        <span>密码:</span>
                        <Input
                            v-model="password"
                            @update="checkPwd"
                            @enter="login"
                            holder="请输入密码"
                            type="password"
                        />
                    </li>
                    <li class="err-item">
                        <span>{{pwdMsg}}</span>
                    </li>
                    <li>
                        <button type="button" @click="login">登入</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            unameReg: /^.{4,16}$/,
            pwdReg: /^[0-9A-Za-z]{6,16}$/,
            unameMsg: "",
            pwdMsg: ""
        };
    },
    methods: {
        limitemail() {
            this.email = this.email.replace(/[\u4E00-\u9FA5]*/g, "");
        },
        checkUname() {
            if (!this.email) {
                this.unameMsg = "账号不能为空";
            } else {
                this.unameMsg = this.unameReg.test(this.email)
                    ? ""
                    : "请输入4-16个字符组合账号";
            }
            return this.unameMsg ? false : true;
        },
        checkPwd() {
            if (!this.password) {
                this.pwdMsg = "密码不能为空";
            } else {
                this.pwdMsg = this.pwdReg.test(this.password)
                    ? ""
                    : "请输入6-16个字母及数字组合";
            }
            return this.pwdMsg ? false : true;
        },
        login() {
            let params = {
                email: this.email,
                password: this.password
            };
            // let {url, method} = this.$api.login
            let self = this;
            if (this.checkUname() && this.checkPwd()) {
                // this.$http.post('/headquarters-api/login',params).then(res=>{
                this.$http({
                    method: this.$api.login.method,
                    url: this.$api.login.url,
                    data: params
                }).then(res => {
                    if (res.code === "200") {
                        window.all.tool.setSession( "expires_at", res.data.expires_at );
                        window.all.tool.setSession( "Authorization", res.data.token_type + " " + res.data.access_token );
                        self.$toast.success("登陆成功");
                        self.$router.push("/");
                    } else {
                        self.$toast.warning(res.message);
                    }
                }).catch(err=>{
                    alter(err)
                })
            }
        }
    }
};
</script>

<style scoped>
.login {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(245, 245, 245);
    text-align: center;
}
.login-box {
    width: 460px;
    background-color: #ffffff;
    border-radius: 6px;
    padding-bottom: 50px;
    margin: 25vh auto 0 auto;
    box-shadow: 0 0 5px 2px #eee;
}
.title {
    line-height: 70px;
    font-size: 20px;
    color: rgb(80, 77, 77);
    font-weight: bold;
}
.login-box li {
    margin: 0 auto;
    width: 300px;
}
.login-box .err-item > span {
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 10px;
    text-align: left;
    color: #ed4014;
}
.login-box li:last-child {
    margin-top: 10px;
}
.login-box button {
    width: 140px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    border: none;
    background-color: #169bd5;
    color: rgb(236, 234, 234);
    margin-top: 10px;
}
.flex{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>


