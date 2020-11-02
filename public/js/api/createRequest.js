/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options =
                           {url, headers, data, responseType, method, callback}) => {
    if (method === 'GET') {
        const xhr = new XMLHttpRequest();
        url = `${url} + ?mail=${data.mail} + &password= + ${data.password}`;
        try {
            xhr.open( method, url );
            xhr.withCredentials = true;
            xhr.send();
            callback(response)
        }
        catch ( e ) {
            // перехват сетевой ошибки
            callback( e );
        }
    } else {
        const xhr = new XMLHttpRequest(), formData = new FormData;
        formData.append( 'mail', `${data.mail}` );
        formData.append( 'password', `${data.password}` );
        try {
            xhr.open( 'POST', url );
            xhr.withCredentials = true;
            xhr.send(formData);
            callback(response)
        }
        catch ( e ) {
            // перехват сетевой ошибки
            callback( e );
        }
    }

};
