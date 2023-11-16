import $ from 'jquery'

class CustomWidget {
  constructor() {
    const self = this

    this.fetchNumber = function (min, max) {
      $.ajax({
        url: 'http://localhost/widget/random',
        type: 'GET',
        data: { min, max },
        dataType: 'json',
        success(data) {
          if (data) {
            self.showAlert(data)
          } else {
            self.showAlert('Ошибка: неверный формат данных')
          }
        },
        error() {
          self.showAlert('Произошла ошибка при получении данных')
        },
      })
    }

    this.showAlert = function (data) {
      alert(`Полученное число: ${data}`)
    }

    this.callbacks = {
      render() {
        console.log('render')
        return true
      },
      init() {
        console.log('init')

        // Проверяем, находимся ли мы в карточке сделки
        if (self.system().area === 'lcard') {
          // Получаем ID текущей сделки
          const dealId = AMOCRM.data.current_card.id

          // Выполняем запрос на сервис "widget" с параметрами min === 0 и max === id сделки
          self.fetchNumber(0, dealId)
        }

        return true
      },
      bind_actions() {
        console.log('bind_actions')
        return true
      },
      settings() {
        return true
      },
      onSave() {
        console.log('onSave')
        return true
      },
      destroy() {
        console.log('destroy')
      },
      leads: {
        selected() {
          console.log('leads')
        },
      },
      tasks: {
        selected() {
          console.log('tasks')
        },
      },
      advancedSettings() {
        console.log('advancedSettings')
        return true
      },
      onSalesbotDesignerSave(handlerСode, params) {
        console.log('onSalesbotDesignerSave', handlerСode, params)
        return {}
      },
    }
  }
}

export default CustomWidget
