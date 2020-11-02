/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {

    url = '/account'

    /**
     * Запрашивает с сервера список данных.
     * Это могут быть счета или доходы/расходы
     * (в зависимости от того, что наследуется от Entity)
     * */
    static list( data, callback = f => f ) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url)
        xhr.send()
        createRequest();
    }

    /**
     * Создаёт счёт или доход/расход с помощью запроса
     * на сервер. (в зависимости от того,
     * что наследуется от Entity)
     * */
    static create( data, callback = f => f ) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url)
        xhr.send()
        createRequest();
    }

    /**
     * Получает информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static get( id = '', data, callback = f => f ) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url)
        xhr.send()
        createRequest();
    }

    /**
     * Удаляет информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static remove( id = '', data, callback = f => f ) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.url)
        xhr.send()
        createRequest();
    }


}
