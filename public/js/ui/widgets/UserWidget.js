/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */
class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    
    if (!element) {
      return new Error('Ошибка');
    } 

    this.element = element;
    
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update() {
    let current = User.current();
    if (current) {
      document.querySelector('.user-name').textContent = current.name;
    } else {
      return new Error('Ошибка');
    }
  }
}
