import fetch from './ajax'

export const DEBUG = true // 是否开发模式
window.host = window.location.host;
// 判断测试还是正式环境
if (host == 'bbs-api.360che.com' || host == '2b.360che.com' || host == 'bbs.360che.com') {
    host = 'https://' + host;
} else {
    // host = 'https://2b.360che.com'
    host = 'http://' + host;
}
// const URLS = host
const URLS = host
class XHR {
    getUserId(url) {
            return fetch({
                url: url,
                type: 'GET'
            })
        }
        // 商家入驻
    getRequest(json) {
        return fetch({
            url: `${URLS}/interface/viewthreadnewapi.php`,
            body: json,
            type: 'GET'
        })
    }
    recommendAction(json) {
        return fetch({
            url: `${URLS}/interface/app/index.php`,
            body: json,
            type: 'GET'
        })
    }
    getDetail(json) {
        return fetch({
            url: `${URLS}/interface/viewthreadnewapi.php`,
            body: json,
            type: 'GET'
        })
    }
    deleteComment(json) {
        return fetch({
            url: `${URLS}/interface/app/index.php`,
            body: json,
            type: 'GET'
        })
    }
    updatePull(json) {
            return fetch({
                url: `${URLS}/interface/viewthreadnewapi.php`,
                body: json,
                type: 'GET'
            })
        }
        // 新增商品关联
    getProduct(json) {
        return fetch({
            url: 'https://s.360che.com/shopapi/Product.ashx?action=getproduct',
            body: json,
            type: 'GET'
        })
    }
}
export default new XHR()