(function (win) {
    var loginOrigin = 'http://user.rrtimes.com'
    var loginCors = loginOrigin + '/cors.html'
    var loginClientDomain = '*'
    var ifrlogincors = document.getElementById('ifrlogincors')
    if (!ifrlogincors) {
        var loginScript = Array.from(document.getElementsByTagName('SCRIPT')).filter(function (s) { return s && s.src && s.src.indexOf('/cors.js') != -1 })[0]
        loginClientDomain = loginScript && loginScript.getAttribute('data-domain') || loginClientDomain
        loginCors = loginScript && loginScript.getAttribute('src') || loginCors
        loginCors = loginCors.replace('/cors.js','/cors.html')
        loginOrigin = loginCors.replace('/cors.html','')
        ifrlogincors = document.createElement('iframe')
        ifrlogincors.id = 'ifrlogincors'
        ifrlogincors.style.display = 'none'
        ifrlogincors.src = loginCors
        ifrlogincors.onload = function () {
            ifrlogincors.setAttribute('data-isready', '1')
        }
        if (location.hostname == loginClientDomain || loginClientDomain == '*') {
            document.body.appendChild(ifrlogincors)
        }
    }

    win.rrUser = {
        setToken: function (token) {
            sessionStorage['_accessToken'] = token
        },
        getToken: function (cb) {
            cb(sessionStorage['_accessToken'])
        },
        clearToken: function () {
            sessionStorage['_accessToken'] = ''
        }
    }
    if (location.hostname == loginClientDomain || loginClientDomain == '*') {
        win.addEventListener('message', function (event) {
            if (event.origin != loginOrigin) { return }
            var obj = null
            try {
                obj = JSON.parse(event.data)
            } catch (e) { }
            if (obj && obj.type == "GETTOKEN") {
                if (gettokenCallBack && obj.key && gettokenCallBack[obj.key] && typeof gettokenCallBack[obj.key] == 'function') {
                    gettokenCallBack[obj.key](obj.token)
                    delete gettokenCallBack[obj.key]
                }
            }else if (obj && obj.type == "OPENTAB") {
                if (win.rrUser && typeof win.rrUser.onOpenTab == "function") { 
					win.rrUser.onOpenTab(obj.args)
                }
            }
        }, false);
        var gettokenCallBack = {}
        var ifronread = function (callback) {
            if (ifrlogincors.getAttribute('data-isready') != '1') {
                window.setTimeout(function () { ifronread(callback) }, 50)
            } else {
                callback()
            }
        }
        win.rrUser = {
            setToken: function (token) {
                ifrlogincors.contentWindow.postMessage(JSON.stringify({ type: "SETTOKEN", token: token }), loginOrigin)
            },
            getToken: function (cb) {
                var key = 'key' + Math.random().toString()
                gettokenCallBack[key] = cb
                ifronread(function () {
                    ifrlogincors.contentWindow.postMessage(JSON.stringify({ type: "GETTOKEN", key: key }), loginOrigin)
                })
            },
            clearToken: function () {
                ifrlogincors.contentWindow.postMessage(JSON.stringify({ type: "REMTOKEN" }), loginOrigin)
            },
			onOpenTab:function(args){}
        }
    }
})(window)
