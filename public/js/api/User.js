/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  constructor(url) {
    this.url = url
    this.url = '/user'
  }
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = user;
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
    return localStorage.user;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = (err, response) => {
    try {
      if (response.id === data.id) {
        this.setCurrent(response.user)
      }
    } catch {
      this.unsetCurrent()
      return {
        "response.success": false,
        "error": "Необходима авторизация"
      }
    }
  } ) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.url} + /current`)
    xhr.send();
    createRequest()
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = (err, response) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST',`${this.url} + /login`);
      xhr.send();
      return {
        "success": true,
          "user": {
            "name": response.name,
            "email": response.email,
            "id": response.id
      }
      }
    } catch {
      return {
        "success": false,
          "error": `Пользователь c email ${response.email}  и паролем ${response.password} не найден`
      }
    }
  } ) {
    User.setCurrent(response.user);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = (err, response) => {
    try {

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.url} + /register`);
      xhr.send();
      createRequest();

      return {
        "success": true,
          "user": {
        "name": response.name,
            "email": response.email,
            "updated_at": response.updated_at,
            "created_at": response.created_at,
            "id": response.id
      }
      }
    } catch {
      return {
        "success": false,
        "error": {
          "email": [
            "Поле E-Mail адрес должно быть действительным электронным адресом."
          ],
          "password": [
            "Количество символов в поле Пароль должно быть не менее 3."
          ]
        }
      }
    }
  } ) {
    User.setCurrent(response.user);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = (err, response) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.url} + /logout`);
      xhr.send();
      createRequest();
      User.unsetCurrent()
    return {
        'success': true
    }
  } ) {

  }
}
