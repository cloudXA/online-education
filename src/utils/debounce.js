/**
 * 
 */
function debounce(func, wait, immediate) {
    let timeout;
    return (params) => {
        if(timeout) clearTimeout(timeout);
        if(immediate) {
            let callNow = !timeout;

            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if(callNow) {
                func.call(null, params);
            }
            
        }
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.call(null, params);
        }, wait)
    }
}

module.exports = debounce;