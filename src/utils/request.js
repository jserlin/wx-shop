import Fly from 'flyio/dist/npm/wx'
import { baseUrl } from  './config'
const Request = new Fly

Request.config.baseURL = baseUrl
Request.config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//添加请求拦截器
Request.interceptors.request.use((config)=>{
    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return config;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
Request.interceptors.response.use(
  (response) => {
      //只将请求结果的data字段返回
      return response.data
  },
  (err) => {
      //发生网络错误后会走到这里
      //return Promise.resolve("ssss")
  }
)

export default Request
