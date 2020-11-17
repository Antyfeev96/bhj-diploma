/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function createRequest(options) {

    const xhr = new XMLHttpRequest();
    xhr.open( options.method, options.url );
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            options.callback(xhr.response.success, xhr.response)
        }
    })
    
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
            options.callback(e, xhr.response);
        }

        // Оставил в таком виде, т.к. будет странно, если я оставлю в try/catch только xhr.send(),
        // Во-первых, отправки разные и мне не избежать повтора if/else. Сначала if/else будет вне блока
        // try/catch, чтобы задать option.url или formData, а потом будет if/else в блоке try/catch 
        // с точно таким же условием, потому что в одном условии отправляется xhr.send(), а в другом 
        // xhr.send(formData). Конечно можно создать формдату и просто потом по условию не использовать её,
        // но я не знаю, нормальная ли такая практика или нет, но даже в таком случае присваивание options.url останется
        // в блоке try/catch

};
