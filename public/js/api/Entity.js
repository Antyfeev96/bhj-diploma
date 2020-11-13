/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

    static url = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f) {
    return createRequest({
        url: this.url,
        method: 'GET',
        responseType: 'json',
        data,
        callback: f => f
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f) {
      let modifiedData = Object.assign({ _method: 'PUT' }, data );
      return createRequest({
          url: this.url,
          method: 'POST',
          responseType: 'json',
          data: modifiedData,
          callback: f => f
      });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f) {
      return createRequest({
          url: this.url,
          method: 'GET',
          responseType: 'json',
          data,
          callback: f => f
      });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f) {
      let modifiedData = Object.assign({ _method: 'DELETE' }, data );
      return createRequest({
          url: this.url,
          method: 'POST',
          responseType: 'json',
          data: modifiedData,
          callback: f => f
      });
}

}

