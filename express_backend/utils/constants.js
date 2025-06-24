module.exports = {
    SECRET_KEY:'LOGOS',
    ADMIN_PERMISSION : ['Admin'],
    MOD_PERMISSION : ['Admin','Mod'],
    USER_PERMISSION : ['Admin','Mod','Employee'],
    N8N_ENDPOINT: 'https://bchecktrial.app.n8n.cloud/webhook/upload',
    ERROR_EMAIL:"Email is not valid",
    ERROR_PASSWORD: 'The password must contain at least %d characters, including at least %d lowercase letters, %d uppercase letters, %d digits, and %d special characters.',
    ERROR_SIGNIN: 'Email or password is not valid',
}