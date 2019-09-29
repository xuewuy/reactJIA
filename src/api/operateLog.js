
/**
 * 添加用户操作日志
 * @param {*} post 
 * @param {*} obj 
 */
export function createLogger(post, obj) {
    return post('/v1/log/createLogger', obj)
}