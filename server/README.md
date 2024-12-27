# Звіт про тестове покриття коду

Я підготував звіт до 6 лаби (1-5 зроблена, з 5 лаб Ви поставили 30 балів). В даному звіті буде коротка інформація про тестове покриття, на разі я вперше користувався тестингом, тому десь можуть бути some bugs. Модулі пов'язані з котами та все що з ними є - не покривав, адже це вони не є головною функцією тудуліста.

## Загальна статистика покриття

- Загальний відсоток мутаційного покриття: 40.24%
- Покриття тестами покритого коду: 97.14%
- Мутанти: 169
  - Вбито: 64
  - Таймаути: 4
  - Вижило: 2
  - Без покриття: 99

### Unit тести

Результати в txt файлі :[results.txt](/todo-list/server/folder%20with%20tests/results.txt)
Розташування: `server/__tests__/controllers/`

- [loginController.test.js](/todo-list/server/__tests__/controllers/loginController.test.js)
  - Покриття 100%
  - Тестує всі основні сценарії:
    ```javascript
    "POST /login": {
      "should return 400 if username is missing",
      "should return 400 if password is missing",
      "should return 404 if user does not exist",
      "should return 401 if password is incorrect",
      "should return JWT token for valid credentials",
      "should return 500 if database error occurs"
    }
    ```

### Інтеграційні тести

Результати в txt файлі :[results.txt](/todo-list/server/folder%20with%20tests/results.txt)
Розташування: `server/__tests__/integration/`

- [auth.test.js](/todo-list/server/__tests__/integration/auth.test.js)
  - Налаштування тестового середовища:
    - тестова бд
    - Express
    - User, Task, Cat
  - Покриті інтеграційні сценарії:
    ```javascript
    "Auth Flow": {
      "should register and login user" ,
      "should not allow duplicate usernames"
    }
    ```

### E2E тести

Розташування: `e2e/cypress/e2e/`

- [auth.cy.js](/todo-list/e2e/cypress/e2e/auth.cy.js)
  - Покриває повний потвк авторизації:
    ```javascript
    "Authentication Flow": {
      "should register a new user",
      "should handle duplicate registration",
      "should login successfully",
      "should handle invalid login",
      "should handle logout"
    }
    ```
- [tasks.cy.js](/todo-list/e2e/cypress/e2e/tasks.cy.js)
  - Покриває управління задачами:
    ```javascript
    "Tasks Management": {
      "should create a new task",
      "should toggle task completion",
      "should edit a task",
      "should delete a task"
    }
    ```

## Мутації

- Загальний відсоток мутаційного покриття: 40.24%
- Покриття тестами покритого коду: 97.14%
- Мутанти:
  - Вбито: 64
  - Таймаути: 4
  - Вижило: 2
  - Без покриття: 99

### Покриття по модулях

```javascript
{
  "loginController.js": "100.00%",
  "registerController.js": "74.07%",
  "taskController.js": "32.50%",
  "Покритя з котами немає": "0.00%",
}
```

### Репорт по мутаціям

Загальний показник мутаційного покриття становить 40.24%, що є досить низьким показником, це через модуль з котами, проте якісніть покриття коду, що покритий тестами - 97.14%.

### Аналіз по компонентах:

- **loginController.js** -100% - всі мутації виявлені
- **registerController.js** - 74.07% - більшість критичних шляхів протестовано
- **taskController.js** -32.50% - треба прописати додаткові тести, бо процент низький

### Види мутацій, які "вижили":

- Зміна рядкових літералів в шляхах API
- Модифікації умов в блоках if
- Зміни в обробці помилок

### Області для покращення:

- Модуль з котами)
- Недостатнє тестування обробки помилок
- Все що в "виживших мутаціях"

Тестування нормально охопило авторизацію. Однак основна бізнес-логіка(управління задачами) потребує розширення тестового покриття. Тобто в ідеалі - доробити тестове покриття для тасків, щоб відсоток покриття був вищий та взагалі роботоспособність апки була кращою.
Інтеграційні тести добре працюють з бд та HTTP-сервером, але їх скоуп можна розширити для перевірки більшої кількості взаємодій між компонентами.
Для E2E тестування варто додати тести для перевірки поведінки системи при різних мережевих станах, тестування обробки форм та валідації на фронтенді, а також перевірки нормальноі роботи JWT.
Я вважаю для забезпечення повної надійності потрібно розширити покриття тестами в частині бізнес-логіки та складних користувацьких сценаріїв.
