# AJAX Example

Данный пример служит для того, чтоб разобраться как работает AJAX

## Что такое AJAX

AJAX, Ajax (Asynchronous Javascript and XML — «асинхронный JavaScript и XML») — подход к построению интерактивных пользовательских интерфейсов веб-приложений, заключающийся в «фоновом» обмене данными браузера с веб-сервером. В результате, при обновлении данных веб-страница не перезагружается полностью, и веб-приложения становятся быстрее и удобнее.


Для работы с этим проектом необходимы следующие вещи:
1.Node JS
2.Любой текстовый редактор

### Структура проекта

1. index.html - HTML код нашей страницы
1. script.js - Пользовательский JS код который будет выполняться в клиенте пользователя. Тут находится AJAX код
1. data.json - Файл в котором будет хранится данные
1. index.js - Node JS сервер

### index.js Разбор

В данном участке кода, мы создаем переменную-сервер которая будет слушать 3000 порт. Так же мы объявили две ссылки для HTTP GET метода. Первая '/weatherApi' - возвращает данные в формате json из файла data.json. Вторая '/' возвращает HTML страницу.

```
app.get('/weatherApi', (req, res) =>{
    let obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.send(obj);
})
 
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + '/View/index.html'));
})

app.use('/', router);
app.use(express.static(__dirname + '/View'));

const server = app.listen(3000, () => {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://localhost:3000")
 })
```

### script.js Разбор

Данный код будет выполняться на стороне клиента, в его браузере. Здесь мы видимо, что объявили функцию **example**, в ней мы указали линк на которую будет выполняться GET реквест.

После этого мы создаем переменную которая будет выполнять сам запрос - var request = new XMLHttpRequest();

После этого мы видим загадочный код event handler ``` request.readyState == 4  ``` Информацию по этому можно прочитать [тут](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState). Если в двух словах, мы проверям если состояние объекта XMLHttpRequest и если оно равно 'Done' то выполняем очередной запрос.

После данных действий мы парсим реквест ```var jsonObj = JSON.parse(request.responseText);``` и используя стандартные средства JS модифицируем HTML страницу.

```
request.open("GET", url, true);
request.send();
```
В этих строках мы как раз и выполняем запрос, когда запрос равен - Done, выполняется наш event handler и обрабатывает данные реквеста.

```
example = () => {
    var url = "/weatherApi";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readyState == 4  )
        {
          var jsonObj = JSON.parse(request.responseText);
          document.getElementById("temperature").innerHTML =  jsonObj.temperature;
          document.getElementById("wind").innerHTML = jsonObj.wind;
          document.getElementById("Humidity").innerHTML = jsonObj.Humidity;
        }
     }
     request.open("GET", url, true);
     request.send();
}
```
Строка ```setInterval(example, 100)``` заставляет данную фукнцию **example** запускаться каждые 100мс, что обеспечивает нам постоянно актуальную информацию.

Для запуска данного проекта необходимо открыть консоль и вписать следующую команду:

```
node index.js
```

После этого в нашем браузере открываем http://localhost:3000

Теперь мы можем изменять данные в файле data.json и это сразу будет изменяться в нашей html странице, без необходимости обновлять страницу.

