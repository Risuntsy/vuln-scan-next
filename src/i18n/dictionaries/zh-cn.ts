export const dictionary = {
    login: {
        title: "漏洞扫描系统",
        description: "请输入您的账号和密码登录",
        username: "用户名",
        password: "密码",
        usernameInput: "请输入用户名",
        passwordInput: "请输入密码",
        loginButton: "登录",
        loginLoading: "登录中...",
        error: {
            emptyFields: "请输入用户名和密码",
            invalidCredentials: "用户名或密码错误"
        },
        tip: '提示: 使用用户名 "admin" 和密码 "password" 登录'
    }
};

export type Dictionary = typeof dictionary;
