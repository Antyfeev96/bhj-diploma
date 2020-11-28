/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    Account.create(options, (err, response) => {
      console.log(JSON.parse(response));
      if (JSON.parse(response)) {
        App.getForm(options).close()
      }
      App.getForm(options).reset();
      App.update();
    })
  }
}
