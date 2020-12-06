/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      return new Error('Ошибка')
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
      this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {

    this.element.querySelector('.remove-account').addEventListener('click', () => {
      this.removeAccount()
    })

    // this.element.querySelector('.transaction__remove').addEventListener('click', () => {
    //   this.removeTransaction(this.element.querySelector('.transaction__remove').dataset.id)
    // })

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {

    if (!this.lastOptions) {
      return new Error('Ошибка')
    }

    if (confirm('Вы точно хотите удалить счёт?')) {
      Account.remove(options.account_id, (err, response) => {
        if (response.success) {
          App.update()
        }
      })
    }

  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (!this.lastOptions) {
      return false
    }
    if (confirm('Вы точно хотите удалить счёт?')) {
    Transaction.remove(id, (err, response) => {
      if (response.success) {
        App.update()
      }
    })
  }
}

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    
    this.lastOptions = options;
    
    if (!options) {
      return new Error ('Ошибка')
    }

    Account.get(options.account_id, (err, response) => {
      if (response.success) {
        this.renderTitle(response.data.name)
      }
    })

    Transaction.list(options, (err,response) => {
      if (response.success) {
        console.log(User.current());
        console.log(response);
        console.log(options);
        this.renderTransactions(response.data);
      }
    })

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    this.element.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {

    let day = date.slice(8,10)

    let year = ' ' + date.slice(0,4) + ' г. '

    let month;

    let oldMonth = date.slice(5,7)

    if (oldMonth === '01') {
      month = ' января'
    } else if (oldMonth === '02') {
      month = ' февраля'
    } else if (oldMonth === '03') {
       month = ' марта'
    } else if (oldMonth === '04') {
       month = ' апреля'
    } else if (oldMonth === '05') {
       month = ' мая'
    } else if (oldMonth === '06') {
       month = ' июня'
    } else if (oldMonth === '07') {
       month = ' июля'
    } else if (oldMonth === '08') {
       month = ' августа'
    } else if (oldMonth === '09') {
       month = ' сентября'
    } else if (oldMonth === '10') {
       month = ' октября'
    } else if (oldMonth === '11') {
       month = ' ноября'
    } else if (oldMonth === '12') {
       month = ' декабря'
    }

    let hours = date.slice(11,13) + ':'
    
    let minutes = date.slice(14,16)

    return day + month + year + 'в ' + hours + minutes
    
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    console.log(item);
    return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${item.date}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    console.log(data);
    data.forEach(item => this.element.querySelector('.content').innerHTML += this.getTransactionHTML(item))
  }
}
