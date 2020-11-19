/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(elem) {
    elem === '' ? new Error('Ошибка') : this.element = elem , this.registerEvents();
    this.form = document.querySelector('.form')
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.form.addEventListener('onsubmit',(e) => {
      e.preventDefault();
      this.submit()
    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {

    let obj = {}
    this.element.getElementsByTagName('input').forEach(item => {
      obj[item.name] = item.value
    })
    return JSON.parse(obj);
    // Только после того, как сделал этот метод увидел, что в подсказке написано решение,
    // если это решение окажется неправильным, поставлю то решение
  }

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(this.getData)
  }
}
