/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.element = element
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current().id, (err, response) => {
      if (response.success) {
        for (let i of response.data) {
          document.querySelectorAll('.accounts-select').forEach(item => {
            item.innerHTML += `<option value="${i.id}">${i.name}</option>`
          })
        }
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, response) => {
      if (response.success) {
        this.element.reset();
        App.getModal(this.element.closest('.modal').dataset.modalId).close();
        App.update()
      }
    })
  }
}
