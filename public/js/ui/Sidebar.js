/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    document.querySelector('.sidebar-toggle').addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse')
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {

    document.querySelector('.menu-item_register').addEventListener('click', (e) => {
      e.preventDefault()
      App.getModal('register').open();
    })

    

    document.querySelector('.menu-item_login').addEventListener('click', (e) => {
      e.preventDefault()
      App.getModal('login').open()
    })

    document.querySelector('.menu-item_logout').addEventListener('click', () => {
      
      User.logout((err,response) => {
        console.log(JSON.parse(response));
        if (JSON.parse(response).success) {
          console.log('Костыль')
        }
      })
      console.log('Еще костыль')
      App.setState('init') // почему этот вариант работает, хотя он синхронный, а нижний нет, хотя он асинхронный?
      // даже localStorage чистится нормально. И еще вопрос, в отличие от LoginForm, где передается options, здесь
      // ничего не передается, поэтому непонятно, что ставить в аргумент data, возможно как раз из-за отсутствия аргумента
      // метод не работает.

      // User.logout((err, response) => {
      //   console.log(JSON.parse(response).success);
      //   if (JSON.parse(response).success) { 
      //     App.setState('init')
      //   }
      // })

    })

  }
  
}
