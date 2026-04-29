const _config = {
    baseURL: 'http://healthycare.space:1443',
    ynuSessionID: null,
};

function clearSessionCookie() {
    _config.ynuSessionID = '';
    localStorage.removeItem('ynuSessionID');
}

function getSessionCookie() {
    let ynuSessionID = localStorage.getItem('ynuSessionID');
    if (isEmpty(ynuSessionID)) {
        ynuSessionID = _config.ynuSessionID;
    }
    let cookie = '';
    if (isNotEmpty(ynuSessionID)) {
        cookie = ynuSessionID;
    }
    return cookie;
}

function normalizeURL(url) {
    if (isEmpty(url)) {
        return '';
    }
    if (url.startsWith('https://') || url.startsWith('http://')) {
        return url;
    }
    if (_config.baseURL.endsWith('/')) {
        _config.baseURL = _config.baseURL.substring(0, _config.baseURL.length - 1);
    }
    if (url.startsWith('/')) {
        return _config.baseURL + url;
    }
    return `${_config.baseURL}/${url}`;
}

function jsonRPC(args) {
    const { url, params, success, fail, noCookie } = args;
    const normUrl = normalizeURL(url);
    const data = {
        jsonrpc: '2.0',
        method: 'call',
        params: params,
        id: null,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    if (isFalse(noCookie)) {
        const ynuSessionID = getSessionCookie();
        if (isNotEmpty(ynuSessionID)) {
            headers['Cookie'] = ynuSessionID;
        }
    }

    fetch(normUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    })
    .then(response => {
        const setCookie = response.headers.get('Set-Cookie');
        let sessionId = null;
        if (isNotEmpty(setCookie)) {
            sessionId = setCookie;
        }

        if (isNotEmpty(sessionId)) {
            localStorage.setItem('ynuSessionID', sessionId);
            _config.ynuSessionID = sessionId;
        }

        return response.json().then(data => {
            return {
                statusCode: response.status,
                data: data,
                header: {
                    'Set-Cookie': setCookie
                }
            };
        });
    })
    .then(res => {
        if (success && typeof success === 'function') {
            success(res);
        }
    })
    .catch(error => {
        console.error(`jsonRPC, fail error[${JSON.stringify(error)}]`);
        if (fail && typeof fail === 'function') {
            fail({
                errMsg: error.message || 'Network error',
                statusCode: 0,
                data: null
            });
        }
    });
}

function request(args) {
    const { url, method = 'GET', data, success, fail, header = {} } = args;
    const normUrl = normalizeURL(url);

    const headers = {
        'Content-Type': 'application/json',
        ...header
    };

    const options = {
        method: method,
        headers: headers,
    };

    if (method !== 'GET' && data) {
        options.body = JSON.stringify(data);
    }

    fetch(normUrl, options)
        .then(response => {
            return response.json().then(data => {
                return {
                    statusCode: response.status,
                    data: data,
                    header: {}
                };
            });
        })
        .then(res => {
            if (success && typeof success === 'function') {
                success(res);
            }
        })
        .catch(error => {
            console.error(`request, fail error[${JSON.stringify(error)}]`);
            if (fail && typeof fail === 'function') {
                fail({
                    errMsg: error.message || 'Network error',
                    statusCode: 0,
                    data: null
                });
            }
        });
}