/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    newUser = JSON.stringify(`{'id':'${user.id}','name':'${user.name}'}`);
    localStorage.user = newUser;
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    JSON.parse(localStorage.getItem('user'))
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f  ) {
    return createRequest({
      url: '/user/current',
      method: 'GET',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user)
        } else {
          this.unsetCurrent()
        }
      callback(err, response)
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f  ) {
    return createRequest({
      url: '/user/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user)
        }
        callback(err,response)
      }
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f  ) {
    return createRequest({
      url: '/user/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user)
        }
        callback(err,response)
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f  ) {
    return createRequest({
      url: '/user/logout',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.unsetCurrent()
        }
        callback(err,response)
      }
    })
  }
}
