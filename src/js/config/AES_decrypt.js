import JsEncrypt from 'jsencrypt'  // ras 工具
import CryptoJS from 'crypto-js' // aes 工具


function aesDecrypt (data, iKey, iValue) {
    var decrypted = '';
    decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(iKey), {
        iv: CryptoJS.enc.Utf8.parse(iValue),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * 公钥
 */
var privateKey = "-----BEGIN PRIVATE KEY-----MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAPTYUA2oNnnEwCM+firQEh3qtvhzy2sPcCCPBuk1ALN98ThFtwbsAIXn4iflC8cL74OxsW5LhVLqRaNJwrj19nUWRNg2V0UG0qiSMDoFQzcf14Tl3YEMVhHmhT60KEc/mcOkGp7BGFneNRkUrnAedUPaI18hHfwlOXCTBOXjsLEHAgMBAAECgYAOsZCUUTz7r8gMFWsC7Lu5meVjIafag/GpsouqoSiqnOtGAkEKpE0fvBvBYyiCyH+WOqq4QMX+hNqrAvkxmmkw3Zj6pqGIGBm8qP0sC7kV9l3+1GyNweBaPqnZs02Kb3WCZnw8h1NaJRR9uqXFITzLkNgxEOuq9oiQqmI9UmP7sQJBAP1qL2O32RS/i08lCHR1r/XQTF/0pkSPX+a6SEf25iewzKm5do8hOtSG7+zjOlOQwsGwCPuNovz5g8BPMv2juQ8CQQD3V78skMtTp+0c6WjVh5ORIkkYAyOnSfl3nigkQKCfGyiTwX1cm3GLTHkDHZBVJjFyz8U/ngZZbG8ScHZCMtiJAkEAroiApQxNXaXiu5rE7PjVPNa+k2P7U8LviQiJmc7pizKQcuDCUCfRzeg1vJBvbniIOkAUn7RYKiVrYXrqopgtbwJAd+zzpIgQDd+99+a0DdROmHAnQJ1FDDex3W2xyOIM/xgL9Jg8UEqOIxxREFGlSaPbFe/nk5DrQzBwKmCc9jvxAQJALe9ZaKqPeZywh2aUa8huotTe5lj/iDeGdHOgxx4xkDK9ddzuSks1dbJQ/gHl8lA7MjOI6TvtgeLB9FOOvsi5EQ==-----END PRIVATE KEY-----";

function AES_decrypt(data) {
    console.log('后端数据: ', data);
    if(!data.data) return data
    let cryptData = data.data
    let cryptDataArr = cryptData.split("hDdoAPaXI3S")

    // 如果不符合 直接返回
    if (cryptDataArr.length !== 3) return data
    let cryptDataStr = cryptDataArr[0];
    
    let jsencrypt = new JsEncrypt();
    jsencrypt.setPrivateKey(privateKey);
    let iValue = jsencrypt.decrypt(cryptDataArr[1]);
    let iKey = jsencrypt.decrypt(cryptDataArr[2]);
    let aesDecryptData = aesDecrypt(cryptDataStr, iKey, iValue);
    let dataArr = JSON.parse(aesDecryptData);
    return dataArr
}
export default AES_decrypt