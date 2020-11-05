/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.open( options.method, options.url );
    xhr.withCredentials = true;

    if (options.method === 'GET') {
        options.url = `${options.url} + ?mail=${request.body.email} + &password= + ${request.body.password}`;
        try {
            xhr.addEventListener('readystatechange', () => {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    callback(error,response)
                }
            })
            xhr.send();
        }
        catch ( e ) {
            // перехват сетевой ошибки
            callback(e,response);
        }
    } else {
        formData = new FormData;
        formData.append( 'mail', `${request.body.mail}` );
        formData.append( 'password', `${request.body.password}` );
        try {
            xhr.addEventListener('readystatechange', () => {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    callback(error,response)
                }
            })
            xhr.send(formData);
        }
        catch ( e ) {
            // перехват сетевой ошибки
            callback(e,response);
        }
    }

};
