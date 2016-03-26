'use strict'

//--------------------------------------------- Black Jack -------------------------------------------------------------------------------------
window.onload = function () {

	function Players (playerName) {

		this.score = 0;

		this.playerName = playerName;


		this.sitOnTheTable = function (i) {

			var placeOnTheTable = document.getElementById('player' + i);

			placeOnTheTable.style.display = 'block';

			placeOnTheTable.innerHTML = '<p>' + this.playerName + '</p>' + '<br/>' + '<span id=balance>' + this.score + '</span>' +
			'<div class=playerCards></div>' + '<button class="player'+ i +' Get">Get Card</button> <button class="player'+ i + ' Full">Full</button>';

		};

	};

	var countPlayers = Number(prompt('How many Players want to play?', 4));
	var players = [];
	var names = ['Vasya', 'Petya', 'Masha', 'Katya'];

	for (var i = 0; i < countPlayers; i++) {
		
		players[i] = new Players(names[i]);

		players[i].sitOnTheTable(i+1);

	};

	var cards = [];
	var x1, y1, score;

	// массив объектов как колода карт
	for (var i = 0; i < 13; i++) { // первая четверка тузы
	
		for (var j = 0; j<4; j++) {
			x1 = 0 + i*(-46.15); // координаты карт в спрайте
			y1 = 804 + j*67;

			if (i==0) { // для первой четверки 
				score=10;
			};

			cards.push({'x': x1, // координаты
						'y': y1,
						'score': score // очки
			});
		};

		if (i==0) { // сброс, остальные начинаются с 2
				score=1;
		};

		if (score<10) { // и увеличиваются на 1
			score++;
		};
	};

	cards.sort(function (a, b) {  // тосовка карт, рандом
  				return Math.random() - 0.5;
	});

	// alert(cards.length);

//	 var countCards = 0;
//
//	 function showCards() { // вытягивает изображение карты
//		 
//	 	document.getElementById('test').style.background = 'url("600px-svg-cards-2.0.png") ' + cards[countCards].x + 'px ' + cards[countCards].y + 'px';
//	 	alert(cards[countCards].score);
//	 	countCards++;
//
//	 	if (countCards == (cards.length)) {
//
//	 	 	clearInterval(intervalId);
//	 	 	return alert('The end');
//	 	};
//	 };
//
//	  var intervalId = setInterval(showCards, 500);

	 /* перебрать массив, проставить Очки за карты в зависимости от Х. Создать дивы для каждого игрока, заполнять их картинками карт. 
		сортировать массив карт случайным образом.
	 */

	 $('.playerCards').eq(3).append('<div class=Card></div>');

	 var fg ='url("600px-svg-cards-2.0.png") ' + cards[0].x + 'px ' + cards[0].y + 'px';

	  $('.Card').css('background', fg);
    
    $('.playerCards').eq(1).append('<div class=Card></div>');
    fg ='url("600px-svg-cards-2.0.png") ' + cards[1].x + 'px ' + cards[1].y + 'px';

	  $('.Card').eq(0).css('background', fg);
    
    $('button').click(function(){ // при клиеке на любую кнопку
        var button=$(this); 
       if (button.hasClass('Get')) { // если это запрос карты
           alert('its Get Card Button');
           
           // вытягиваем номер игрока
           var player = '#'+String(button.attr('class')).slice(0,7);
          alert(player); 
           
           // добавляем в список его карт карту
           $(player + '>.playerCards').append('<div class=Card></div>'); 
           
           // берем карту с колоды
           var card ='url("600px-svg-cards-2.0.png") ' + cards[0].x + 'px ' + cards[0].y + 'px'; 
           
           // устанавливаем фон карты
           $(player + '>.playerCards').children('.Card').last().css('background', card);
           
                    //посчитать счет игрока
           // # in array of players
           var playerNum = player.slice(7,8) - 1;
           players[playerNum].score = players[playerNum].score + cards[0].score;
           
           //показать New счет
            $(player).children('#balance').html(players[playerNum].score);
           
           // delate this card from Deck
           cards.splice(0,1);
           
           //and shuffling the Deck
           cards.sort(function (a, b) { 
  				return Math.random() - 0.5;
	       });
           
           alert(cards.length + ' cards in the Deck');
           
           /*добавить проверку количества очков. Больше 21 - вылетел.
           заблочить кнопки все кроме того, кого очередь пришла тянуть карту
           настроить кнопку "пропустить" с передачей очереди выбора карты след игроку.
           уведомлять, чья очередь тянуть карту, и что очередь не твоя
           
           НА ГИТ ВСЕ ЭТО НУЖНО ЗАЛИТЬ
           */
       } else if ($(this).hasClass('Full')) {
            alert('Full');  
       }
    });
    

}; // window.onload