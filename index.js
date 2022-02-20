const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api

const token = ''; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new TelegramBot(token, {polling: true});

//конфиг клавиатуры
const keyboard = [
    [
      {
        text: 'Хочу Camry', // текст на кнопке
        callback_data: 'moreKeks' // данные для обработчика событий
      }
    ],
    [
        {
          text: 'Хочу Range', // текст на кнопке
          callback_data: 'moreRange' // данные для обработчика событий
        }
      ],
    [
        {
          text: 'Хочу AMG',
          callback_data: 'morePes'
        }
    ],
    [
        {
          text: 'Хочу слушать музыку',
          url: 'https://t.me/nrsltnmuz' //внешняя ссылка
        }
      ],
      [
        {
          text: 'Ничего', // текст на кнопке
          callback_data: 'moreAngry' // данные для обработчика событий
        }
      ],
  ];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if (query.data === 'moreKeks') { // если Camry
        img = 'https://toyota-bishkek.kg/media/2552/g33_tcm-3051-2203477.png';
    }

    if (query.data === 'moreRange') { // если Range
        img = 'https://paultan.org/image/2021/05/2021-Range-Rover-Evoque-P300-HST-2-e1620786244613.jpg';
    }

    if (query.data === 'morePes') { // если Amg
        img = 'https://cdn.motor1.com/images/mgl/LeAeW/s1/mercedes-amg-gt-63-s-e-performance.jpg';
    }

    if (query.data === 'moreAngry') { // если Ничего
        img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXpRV5VeqRRgZwuU3uVP5mJHqKuCfTW3i9oQ&usqp=CAU';
    }

    if (img) {
        bot.sendPhoto(chatId, img, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
  });