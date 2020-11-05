const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

const baseURL = 'https://some-domain.com/api/';

function request(method, url, data) {
    return new Promise(function(resolve, reject) {
        let header = {
            'content-type': 'application/json',
        };
        // 值得注意的是content-type': 'application/json,死活不行，
        // 必须content-type': 'application/x-www-form-urlencoded。
        // 大家使用的时候，注意这点，反正我被坑了很久。坐等你入坑
        wx.request({
            url: baseURL + url,
            method: method,
            data: method === POST ? JSON.stringify(data) : data,
            header: header,
            success(res) {
                //请求成功
                if (res.data.errCode == 0) {
                    resolve(res);
                } else {
                    //其他异常
                    reject('运行时错误,请稍后再试');
                }
            },
            fail(err) {
                //请求失败
                reject(err)
            }
        })
    })
}

const API = {
    getOpenid: (data) => request(GET, `jsapi/mini?jsCode=${data}`),
};
module.exports = {
    API: API
}