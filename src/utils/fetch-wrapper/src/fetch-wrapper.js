export default function fetchWrapper(options={}, attempt=0, retryIntervals=retryIntervals) {
  const onFetchSuccess  = options.onSuccess;
  const onFetchFail     = onFail.bind(null, options, attempt, options.retryIntervals || retryIntervals);
  const onError         = handleError.bind(null, options, attempt)

  options.request()
    .then(parseResponse.bind(null, options), onFetchFail) // catch errors from fetch request
    .then(onFetchSuccess, onError) // catch errors from status codes or parsing data in onFetchComplete
    .catch(onError) // catch errors from onSuccess or parsing data
}

const retryIntervals = [1000]; // default value of the time intervals at which to retry the request

export const onFail = (options, attempt, error) => {
  if (retryIntervals[attempt]) {
    setTimeout(
      () => fetchWrapper(options, ++attempt),
      retryIntervals[attempt]
    )
  } else {
    const status = error.response ? error.response.status : 'error'; // Treat network errors without responses as 500s (internal server error).
    const message = error.message;
    return options.onError({status, message});
  }
}

export const parseResponse = (options, res) => {
  const { responseType: type } = options;
  if (type && type == 'text') {
    return res.text();
  } else if (type && type == 'json') {
    //支持json中的方法调用。如：$T.DTO。by lsg
    var r = null;

    if( !res.ok ){
      return {
        result:false,
        error:{
          code:res.status,
          message:res.statusText
        }
      }
    }

    // r = res.json();
    r = res.text().then(r => {
      let result = new Function("return " + r)()
      if(!result.result && result.error){
        if( result.error.code == "40100"
        || result.error.code == "40101"
        || result.error.code == "40102"
      ){
          PubSub.publish('redirect',{path:'apps/login/login',version:result.error.data})
        }
      }
      return result
    });
    return r;
    //return res.json();
  }else if(type == 'file'){
    res.blob().then(blob => { 
      let url = window.URL.createObjectURL(blob)   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上) 
      let name = res.headers.get('Content-Disposition')||'name='
      if(name.indexOf("''")!=-1){
        name = name.split("''")[1]
      }else{
        name = name.split('name=')[1].split(';')[0] 
        name = name.replace(/\"/g,'')
      }
      name =  decodeURI(name)
      if(options && options.isOpen === true){
        let win = window.open('about:blank')
        win.document.write(`<html><style>*{width:100%;height:100%;padding:0;margin:0;border:0;}</style>
        <title>${name}</title>
        <body><iframe src='${url}'></iframe></body></html>`)
        //window.open(url)
      }else{
        let a = document.createElement('a')
        a.target='_blank'
        a.href = url
        a.download = name
        a.click() 
      }
      window.setTimeout(function(){
        window.URL.revokeObjectURL(url) 
      },1000)
    })
  } else {
    throw new Error('Invalid Response Type');
  }
}

const handleError = (options, attempt, error) => {
  const errorMessage = error.toString();
  if (errorMessage === 'SyntaxError: Unexpected end of input') {
    options.onSuccess({status: 'error', message: 'No response body'})  // error in res.json/res.text
  } else if (errorMessage === 'Error: Invalid Response Type') {
    options.onSuccess({status: 'error', message: 'Invalid Response Type'})  // error in options for fetch wrapper
  } else {
    return options.onError({status: 'error', message: errorMessage})
  }
}