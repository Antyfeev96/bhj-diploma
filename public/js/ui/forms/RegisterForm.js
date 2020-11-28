/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(options, (err, response) => {
      console.log(JSON.parse(response));
      if (JSON.parse(response).success) {
        App.setState( 'user-logged' )
        App.getModal('register').close()
      }
    })
  }
}
