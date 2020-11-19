/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(elem) {
    elem === '' ? new Error('Ошибка') : this.element = elem, this.registerEvents(); 
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    // this.element.getElementsByTagName('data-dismiss').forEach(item => {
    //   item.addEventListener('click', () => {
    //     this.onClose(e);
    //   })
    // })

    document.getElementById('modal-new-account').addEventListener('click', (e) => {
      e.target.onclick = this.onClose(e)
    })
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    e.preventDefault()
    this.element.querySelectorAll('[data-dismiss]').forEach(item => this.close())
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.element.querySelectorAll('[data-dismiss]').forEach(item => {
      item.removeEventListener('click');
    })
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.removeProperty('display')
  }
}
