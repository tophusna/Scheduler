=== Вначале работаем с группами ===
1)  Готовый интерфейс
    https://2-fc.com/scad/hubopts.php
2)  Создаются сам проект шедулера json
3)  Добавляются хабы
4)  Для хабов добавляются группы
5)  Открывается окно настройки группы
6)  Все сохраняется в проекте
7)  Выложить на сервер 11
    Заходим на 11 сервер и запускаем приложение

8)  Конкретно группа это и есть сабскрайб
9)  Настройки группы - имя, период опроса, ключи 
   -- апи
11) Шедулер - это один из элементов большого проекта
    Шедулер - это бэкенд
    Интерфейс - это манипуляция шедулером на сервере

=== Потом отстраиваем сущности ===
12) Сущности могут быть вложенными


=== Что работает ===

 1) Запросы setEntityParams
 2) subscribe (ограниченно), список сущностей, список параметров, таймаут

10.10.20.8  работают все методы, но может упасть.
10.10.20.11 рабочее но кастрированое
123Root

ws://localhost:8001
ws://10.10.20.8/connect
ws://10.10.20.11/connect

1) Создать новую сущность на основе шаблона.
2) Возможность изменить сам шаблон и его название во второй вкладке.
3) Все сущности и группы - это JS скрипты, их запускают JS шедулеры. Можно указать источник шаблона, изменить JS шедулер и создать новый тип шаблона JS шедулеров.
4) Редактирование JS шедулеров и соответствующих скриптов.
5) JS шедулеры создаются на React с использованием setTimeout и setInterval. Скрипты меняют только путь к одному из сохраненных шаблонов JS шедулера.
6) Создание новой сущности на основе выбранного шаблона с указанием пути в JS скрипт, управляющий определенным шедулером.
7) Определение прав доступа для создания и изменения JS шедулеров.
8) Автоматическое создание редактируемого JS скрипта для управления шедулером.
9) Определение операционной системы для управления шедулерами с помощью JS.
10) Указание, какие данные в конкретных JS скриптах можно изменять и откуда их брать.
11) Организация структуры папок и файлов для хранения шаблонных текстовых файлов и JS скриптов шедулера.   
=====================================
Дублирование данных для разных хостов:

Дублирование данных может пригодиться, если один из хабов стал недоступен, и данные можно получить из другого хаба.
Эти данные могут быть предназначены для обработки и проведения математических операций.
Смещение и ведущий-ведомый:

Смещение может быть важным аспектом в процессе, где "ведущий" и "ведомый" объекты взаимодействуют.
Важно установить порог срабатывания, поскольку у них могут быть разные данные и критерии срабатывания.
Параллели и дата-ченж:

Работа в параллели может включать сабскрайб (подписку) и выполнение действий при изменении данных.
Возможно, передача массива объектов в качестве параметра и выполнение операций, например, путем умножения на 2 и записи в переменную.
Дебаггер и контракт:

Использование дебаггера с брейкпойнтами может быть одним из способов отслеживания выполнения кода.
Уточнение контракта, то есть ожидаемого поведения или интерфейса, может быть важным, но пока не описано подробно.
Интеграция с БД и работа с SQL:

Скрипты могут писать программисты.
Важно интегрировать систему с любой базой данных и работать с разными типами данных.
Обработка SQL и других баз данных может потребовать разработки оберток и обработки SQL в коде.


На сервере с IP-адресом 10.10.20.11 развернут хаб, и на этом сервере также находится и запускается Node.js скрипт для взаимодействия с этим хабом.

Для взаимодействия с хабом, я открываю шедулер IDE в веб-браузере, заходя на сервер с IP-адресом 10.10.20.11, где создаю новый проект и выбираю папку для его сохранения.

При создании проекта, мне предлагается выбрать папку и опцию для создания новой папки с стандартной структурой.

Если необходимо, создается хаб в менеджере подписок, где можно настраивать параметры хаба и создавать группы подписок.

В каждой подписке, можно выбирать сущность, которую хотите отслеживать.

По мере продвижения, я получаю представление об общей структуре системы и двигаюсь к следующему этапу, последовательно продвигаясь.

Клиент выполняет одноразовый запрос для получения данных сущностей (GET-запрос), и возвращенные данные предоставляют сущности.

Для передачи данных используется метод POST, и данные поступают обратно в ответ на POST-запрос.

В данной системе отсутствует постоянное соединение, и данные обновляются через отдельные запросы.

Система подтверждает данные, отправляя их как JSON. Это означает, что система будет отправлять данные в формате JSON, непрерывно и моментально.

Если какой-либо параметр изменяется, соответствующее значение этого параметра отправляется мгновенно, в противном случае данные отправляются с интервалом в одну секунду.

Здесь может быть нулевой интервал, что означает отправку данных только при изменениях.

История обновляется путем активации нулевого интервала, что означает отправку всех изменений за секунду.

Если параметр изменился 5 раз за секунду, то будет 5 значений в массиве, и последнее значение отправляется, если нет изменений.

Сообщения о изменениях не отправляются, если ничего не изменилось.

Эти изменения распространяются на всю группу сущностей, и можно создать множество групп с разными конфигурациями.

Для некоторых сущностей история не нужна, и они могут получать только последние значения.

Решение о применении истории будет зависеть от конечных пользователей.

Подписка на конкретные сущности и их конфигурации будет настраиваться пользователем и активироваться по запросу пользователя.

Значения параметров могут быть получены через подписку, активной только по запросу пользователя.

Определенные методы выполняются через определенные интервалы.

Конфигурация запускается при определенных событиях, и скрипты выполняются в соответствии с конфигурацией.

Методы выполняются с определенной периодичностью и могут записывать и сохранять данные.

https://docs.google.com/spreadsheets/d/1eeebLxUuE7UycdIj8GcZWOZOvxntw_kshk9I4z83MCw/edit?pli=1#gid=0

https://drive.google.com/drive/folders/1mhYHLd1jfVY-UMuHtkWLUq0Gx2jLc_vH


http://10.10.20.11/admin
admin@admin.ru
E226Dgry

Самое главное это key
и method, и параметры, в зависимости от конкретно АПИ



1) С тебя утверждение описанных мною работ возможно их дополнишь .
2) Срок реализации и демонстрации мне .

1) Создание интерактивного  пользовательского интерфейса.
Написать JavaScript-функцию для реализации динамической подгрузки данных при взаимодействии пользователя без перезагрузки страницы.
2) Реализовать функцию создания проекта в формате JSON-файла "Scheduler" и хранение всех настроек и данных.
         —-Определить структуру JSON-файла: поля для хранения настроек и данных о проекте.
3) Реализовать функцию добавления/редактирования/настройки подключения микросервисов (хабов) с использованием методов API.
    ——Создать форму для ввода необходимой информации о хабе (URL, токен и т.д.).

4) Разработать функцию создания/добавления/редактирования групп хабов.
    ——Создать форму для управления  свойств группы хабов.
    ——Написать функцию для добавления новой группы хабов и редактирования существующих.
5) Реализовать функцию сохранения всех настроек (добавление, редактирование) в локальное хранилище браузера.?или в файл  в локальном хранилище ? 
6) Протестировать работу методов API (подписка, и другие )  в контексте проекта. Не требуется актуальный бэкэнд для тестирования.
7) Произвести деплой интерфейса на 11 сервер.
8)Связать интерфейс с тестовыми данными для их отображения в проекте.


*** Дублирование данных для разных хостов
 - один хаб отпал, данные можно из другого хаба
 - для обработки и математики
 - смещение
 // Ведущий - ведомый
 // Порог срабатывания, данны разные

 // Параллели(разные)
 // Дата-ченж - это сабскрайб, выполнение по измеениею
 // передаем массив объектов в качестве парамета п1 * 2 и записываем в п1
 
 // дебаггер с брейкпойнтами - это первый вариант
 // Могут выдаваться все связки
 // Должен быть контракт, и он не описан еще

 // p1,p2 скрипты пишет интегратор
 // в момент завершения скрипта
 // все значения каждый
 // Интеграция скедьюлера с любой БД, и любые значения. Стандартная работа с СУБД
 Скрипт пишет программист
 SQL * FROM 
 // SQL и другие базы данных, обертка для них и процессинг SQL в коде


