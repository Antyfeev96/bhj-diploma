/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f) {
    return createRequest({
        url: '',
        method: 'GET',
        responseType: 'json',
        data,
        callback: (err, response) => {
            console.log(err);
            console.log(response)
        }
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
          url: '',
          method: 'POST',
          responseType: 'json',
          modifiedData,
          callback: (err, response) => {
              console.log(err);
              console.log(response)
          }
      });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f) {
      return createRequest({
          url: '',
          method: 'GET',
          responseType: 'json',
          data,
          callback: (err, response) => {
              console.log(err);
              console.log(response)
          }
      });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f) {
      let modifiedData = Object.assign({ _method: 'DELETE' }, data );
      return createRequest({
          url: '',
          method: 'POST',
          responseType: 'json',
          modifiedData,
          callback: (err, response) => {
              console.log(err);
              console.log(response)
          }
      });
}

}

