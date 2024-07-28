[![Lint and Test](https://github.com/v-nvtsk/otus-jsbasic-dz24-life/actions/workflows/lint-test.yaml/badge.svg)](https://github.com/v-nvtsk/otus-jsbasic-dz24-life/actions/workflows/lint-test.yaml) ![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fv-nvtsk%2Ff9b687636482339cabd6a8c4b369f3eb%2Fraw%2F6d10b8af87097de7c5f9c876931dd8beba01f3c1%2Fotus-jsbasic-dz24-life-junit-tests.json) [![pages-build-deployment](https://github.com/v-nvtsk/otus-jsbasic-dz24-life/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/v-nvtsk/otus-jsbasic-dz24-life/actions/workflows/pages/pages-build-deployment) ![GitHub repo size](https://img.shields.io/github/repo-size/v-nvtsk/otus-jsbasic-dz24-life)

# Игра "Жизнь"

<center> <img src="./docs/app-img.png" width="600" /> </center>

## Описание

Реализация на языке Typescript клеточного автомата ["Игра Жизнь"](https://ru.wikipedia.org/wiki/Игра_«Жизнь») , придуманного английским математиком Джоном Конвеем в 1970 году.

Игрок задает начальное состояние "клеток" и нажимает на кнопку старт.

- "Живые клетки" окрашены ярко зелёным цветом.
- Новые живые клетки появляются на пустых ячейках, если у них есть три живых соседа.
- Если соседей только два клетка остаётся живой.
- Если соседей меньше двух или больше трёх клетка погибает.

Возможно добавление новых живых ячеек в процессе игры кликом на одиночной ячейке или движением мыши при нажатой левой кнопке мыши.
В процессе игры можно менять размеры поля и скорость игры (время между ходами).

Рабочая версия проекта доступна по ссылке: [https://v-nvtsk.github.io/life-game/](https://v-nvtsk.github.io/life-game/)

## Детальное описание

- Сборка проекта выполняется с использованием webpack. Сборку можно выполнить запуском npm скрипта:

  > npm run build

  запуск локального веб-сервера по адресу http://127.0.0.1:8080 выполняется скриптом:

  > npm start

- Настроена транспиляция typescript с использованием babel
- Поддержка импорта css файлов в webpack
- Модульное тестирование выполняется с помощью jest.
  Настроен контроль покрытия кода тестами в ci/cd. Покрытие не ниже 60%
  Ручной запуск тестов выполняется запуском скрипта `npm test`.

- Отрисовка поля по-умолчанию выполняется на элементе Canvas
- Возможно использование других классов имплементирующих абстрактный класс View, например, класса Table, реализующего отображение с помощью HTML-элемента table.
