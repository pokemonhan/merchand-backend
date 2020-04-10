
import JsEncrypt from 'jsencrypt'  // ras 工具
import CryptoJS from 'crypto-js'   // aes 工具

let public_key = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgy6JOupuDqE9itVQvGSBDJotBEJFASuklIwvcMNtXUH99PdihJ+TJN2AjNphzCdgL9KlguDG+u4C719DZOC3YrGn7Ps9vWOFtQYLzh69cGd+nlqOR4LKVSAYRn2NtrV9elAzBjie/Y7ITMsU9+ZTsccRqb+qd+OlBsYdg9dhvVQIDAQAB-----END PUBLIC KEY-----";

//随机串
function randomString (len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

/**
 * AES加密数组 传入参数为需要传递的数组JSON
 */
function AES_encrypt (data) {
    // console.log('aes 里面的data: ', data);

    // //偏移量 由前端每次请求随机生成 16位
    let IV = randomString(16);
    // //AES加密KEY 由前端自己每次请求随机生成
    let KEY = randomString(16);
    let pkcs8_public = public_key

    let key_utf8 = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
    let iv_utf8 = CryptoJS.enc.Utf8.parse(IV);//向量iv
    let srcs = ''
    switch (typeof (data)) {
        case 'string':
            srcs = CryptoJS.enc.Utf8.parse(data)
            break;
        case 'object':
            srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
            break;
        default:
            srcs = CryptoJS.enc.Utf8.parse(data.toString())
    }
    //AES 加密
    let encrypted = CryptoJS.AES.encrypt(srcs, key_utf8, { iv: iv_utf8, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
    //RSA 加密 组包
    return pack(encrypted, IV, KEY, pkcs8_public)
}

//组包
function pack (encrypted, iv, key, pub_key) {
    let jsencrypt = new JsEncrypt();
    jsencrypt.setKey(pub_key);
    let rsa_iv = jsencrypt.encrypt(iv);
    let rsa_key = jsencrypt.encrypt(key);
    let splitFlag = 'aesrsastart';
    let res_data = encrypted + splitFlag + rsa_iv + splitFlag + rsa_key
    return res_data
}
// aes 解码
function aesDecrypt (data, iKey, iValue) {
    let decrypted = '';
    decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(iKey), {
        iv: CryptoJS.enc.Utf8.parse(iValue),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export default AES_encrypt