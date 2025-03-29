export const dictionary = {
    login: {
        title: "Vulnerability Scanning System",
        description: "Enter your credentials to login",
        username: "Username",
        password: "Password",
        usernameInput: "Enter your username",
        passwordInput: "Enter your password",
        loginButton: "Login",
        loginLoading: "Logging in...",
        error: {
            emptyFields: "Please enter username and password",
            invalidCredentials: "Invalid username or password"
        },
        tip: 'Tip: Use username "admin" and password "password" to login'
    }
};

export type Dictionary = typeof dictionary;
