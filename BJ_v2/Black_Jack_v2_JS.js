$(document).ready(function(){
        
    $('#popup').fancybox();
    
    $('#popup').click();
    
    var player = [];
    
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
   
    
    $('#config').submit(function(){
        var countPlayers = Number($('#config > select').val());
        event.preventDefault();
        $.fancybox.close();
        
        for (var i=0; i<countPlayers; i++) {
            $('.player').eq(i).css('display', 'inline-block'); 
        }
        
        $('.players').css('width', 24*countPlayers +'%');
        $('.player').css('width', 96/countPlayers + '%');
        
        if ($('input').val()!=='') {
            var namesOfPlayers = String($('input').val()).split(', ');
        } else {
            namesOfPlayers = [];
        }
            
        setPlayerData(countPlayers, namesOfPlayers);

        
        // раздать по 2 карты сразу
        var j=0;
        
        do {
            j++;
            for (var i=0; i < countPlayers; i++) {
                
                giveTheCard($('.player').eq(i));
            }
        } while(j<2);
              
    });
    
  
    
    function setPlayerData(count, names) {
        
        for (var i=0; i<count; i++) {
            
            if (names[i]===undefined || names.length==0) { // если имя не указано для игрока
                names[i]='Player' + (i+1);
            }
             
            player[i] = new PlayerData(names[i]);
            
            $('.player').eq(i).children('.playerName').text(names[i]);
            $('.player').eq(i).children('.balance').text('Balance: ' + player[i].balance + ';');
            $('.player').eq(i).children('.score').text('Score: ' + player[i].score + '.');
            
        };
    };
    
    function PlayerData(name) {
        this.name = name;
        this.score = 0;
        this.balance = 1000;
    };
    
    
    $('.getCard').click(function(){    
       giveTheCard($(this).parent('div'));
    });
    
    function giveTheCard (thisPlayer) {
        
         var card ='url("600px-svg-cards-2.0.png") ' + cards[0].x + 'px ' + cards[0].y + 'px';
        
        thisPlayer.children('br').after('<div class="card"></div>');
        
        thisPlayer.children('div').first().css('background', card); 
        
        var playerNum = String(thisPlayer.attr('class')).slice(13,14); // номер игрока с Класса блока
        
        var totalScore = player[playerNum -1].score + cards[0].score; // текущий счет + новая карта
        
        player[playerNum -1].score = totalScore; //переписали текущий счет в объекте
        
        thisPlayer.children('.score').text('Score: ' + totalScore + "." ); // вывели на страницу тек. счет
        
        cards.shift(); // удалили карту с колоды
    };
       
}); // READY