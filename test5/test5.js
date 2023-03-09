//Задача 5
/*Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее: 
Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.
Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).*/

function rangeNumber() {
    const inputFirst = document.querySelector("#input1");
    const inputSecond = document.querySelector("#input2");
    const button = document.querySelector("#button");
    const imageDiv = document.querySelector(".j-result");
    const localData = localStorage.getItem('url', 'data');
    
    button.addEventListener ("click", async () => {
            if (inputFirst.value < 1 || inputFirst.value > 10) {
        if (inputSecond.value < 1 || inputSecond.value > 10 ) {
            imageDiv.innerText = "Номер страницы и лимит вне диапазона от 1 до 10"
        } else {
            imageDiv.innerText = "Номер страницы вне диапазона от 1 до 10"
        }
        } else  if (inputSecond.value < 1 || inputSecond.value > 10 ) {
            imageDiv.innerText = "Лимит вне диапазона от 1 до 10" 
        } else {
            await sendRequest()
        }
    
    })
    
    function sendRequest() {
      // if (checkNumber()){
        fetch (`https://picsum.photos/v2/list?page=${inputFirst.value}&limit=${inputSecond.value}`)
        .then(response => {
        return response.json()
        })
        .then (data => {
        console.log(data)
        initImages(data);
        localStorage.setItem('url', JSON.stringify(data));
        })
    }
        function initImages (data) { 
        let htmlImages = ''
        data.forEach (item => {
        htmlImages += `<div class="image-item"><img src ="${item.download_url}"</div>`;
        })
        imageDiv.innerHTML = htmlImages;
        }
    
}  

document.addEventListener("DOMContentLoaded", rangeNumber)