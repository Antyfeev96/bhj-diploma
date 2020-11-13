/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function createRequest(options) {
    
        try {

            if (options.method === 'GET') {

                options.url = `${options.url} + ?mail=${options.data.email} + &password= + ${options.data.password}`;
                xhr.send();

            } else {

                formData = new FormData;
                formData.append( 'mail', `${options.data.mail}` );
                formData.append( 'password', `${options.data.password}` );
                xhr.send(formData);
        
            }
        }
        catch ( e ) {
            // перехват сетевой ошибки
            options.callback(e, response);
        }
     

    const xhr = new XMLHttpRequest();
    xhr.open( options.method, options.url );
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            options.callback(err, response)
        }
    })

};
