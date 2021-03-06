/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      return new Error('Ошибка')
    }
    this.element = element;
    this.registerEvents();
    this.update()
    
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {

    this.element.addEventListener('click', (event) => {
        if (event.target.closest('.account')) {
          this.onSelectAccount(event.target) 
        } else if (event.target.closest('.pull-right')) {
          App.getModal('createAccount').open();
        }
    })
    
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {

    if (!User.current()) {
      return
    }

      Account.list(User.current(), (err, response) => {
        if (response.success) {
          this.clear();
          response.data.forEach(item => this.renderItem(item))
        }
      })
      
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    this.element.querySelectorAll('.account').forEach(item => item.parentNode.removeChild(item))
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {

      if (element.closest('.accounts-panel').querySelector('.active')) {

        if (element.closest('.account') === element.closest('.accounts-panel').querySelector('.active')) {
          element.closest('.account').classList.remove('active')
        } else {
          element.closest('.accounts-panel').querySelector('.active').classList.remove('active')
          element.closest('.account').classList.add('active')
        }

      } else {
        element.closest('.account').classList.add('active')
      }
      
    App.showPage('transactions', { account_id: element.closest('.account').dataset.id })
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    return `
    <li class="account" data-id=${item.id}>
    <a href="#">
        <span>${item.name}</span>
        <span>${item.sum} ₽</span>
    </a>
</li>
    `
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    document.querySelector('.accounts-panel').innerHTML += this.getAccountHTML(item)
  }
}
