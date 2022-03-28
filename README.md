# Проектная работа "Mesto"

## Автор: Артем Есаулков, 2022 г.

### Общая информация
Данный проект является одностраничным сайтом, являющимся прототипом социальной сети с названием "Mesto". В данном проекте можно добавлять информацию о себе, редактировать свой аватар (в проекте), добавлять любимые места путешествий.

### Адаптивность сайта
На данном сайте организована адаптивная вёрстка на экранах монитора шириной от 320 до 1280 пикселей, но сайт неплохо смотрится и на более широких экранах (в этом преимущество данной проектной работы от предыдущей). Просмотр данного сайта допустим на любых возможных сегодня экранах. Адаптивность реализована, прежде всего, за счёт медиазапросов в CSS-коде, а также благодаря grid-блокам, "резиновой вёрстке" и очень полезным функциям max() и calc().

### Кроссбраузерность сайта
В проекте реализована кроссбраузерность в части сглаживания текста. Сайт прекрасно будет работать на основных браузерах: Chrome, Mozilla Firefox, Yandex, Opera, MS Edge, Safari.

### CSS: стили и оформление
На сайте подсвечиваются все ссылки и кнопки. Это реализовано за счёт псевдокласса :hover, а также CSS-свойств opacity и transition. 
Все изображения на сайте оснащены альтернативным текстом для того, чтобы читатель был в курсе, с каким изображением он мог бы познакомиться, если бы не технические неполадки.
В ходе выполнения проекта активно использовались флекс-контейнеры, в том числе с поперечной осью. Верстка попапа также была выполнена с помощью технологии Flex.

### JavaScript: интерактивность сайта
В данной проектной работе был реализован скрипт, благодаря которому пользователь может редактировать свой профиль в специальном всплывающем окне (попапе). Также есть возможность добавить карточку с фотографией места, где пользователь побывал. Любую карточку можно открыть в увеличенном формате или удалить. Реализована валидация форм, которые заполняются пользователем. Модальное окно может быть закрыто нажатием на оверлей или клавишу Esc. В скрипте были затронуты такие темы, как объявление и использование переменных, объявление и вызов функций, методы добавления и удаления класса элемента, замена текстового содержимого и реакция на действия пользователя: нажатие на элемент и отправка формы. Были затронуты массивы и действия с ними, организовано внедрение template-элементов в структуру DOM, объекты и обработчики событий, валидация форм, объектно-ориентированное программирование и модули JavaScript.

### Деплой сайта
Для перехода на сайт используйте ссылку на GitHub Pages: ...(пока недоступна).