let fightStart = false;
const screen = document.querySelector('#screen');
screen.style.height= 500 + 'px';

const acceptButton = document.querySelector('#accept_button');

const hide = id => {
    document.querySelector(id).style.display = 'none';
};

const showInline = id => {
    document.querySelector(id).style.display = 'inline'
};


const myRequest = new XMLHttpRequest();
const choose_Pokemon = (pokeId) => {
document.getElementById('' + pokeId).onclick = () => {
    myRequest.open('get', 'https://pokeapi.co/api/v2/pokemon/'+pokeId+'/');


myRequest.onload = function() {
    const obj = JSON.parse(myRequest.responseText);
    if(myRequest.readyState === 4){
        console.log(obj.name);
        for(let i = 0; i < 4; i++){
            document.getElementById(''+i).innerHTML = obj.moves[i].move.name;
        }
        if(fightStart === false){
            document.getElementById('pokeName').innerHTML = 'Name: '+obj.name;
        document.getElementById('moves').innerHTML = 'Move List'
        acceptButton.style.display = 'inline-block';
        }
    }

}

myRequest.send();

    document.getElementById('accept_button').onclick = () => {
        const obj = JSON.parse(myRequest.responseText);

        if(confirm('Are you sure?')){
            fightStart = true;
            screen.style.backgroundImage = 'url(/../img/pokemon_x_and_y_battle_background_16_by_phoenixoflight92-d8594wx.png)'
            acceptButton.style.display = 'none'
            hide('#description');
            hide('#title');
            document.getElementById('pokeName').innerHTML = '';
            document.getElementById(''+pokeId).classList.add('zero');
            document.querySelector('#table').style.display = 'table';
            showInline('#mew')
            document.querySelector('#score').style.display = 'block';
            for(let i = 1; i < 5; i++){
                document.getElementById('move'+i).innerHTML = obj.moves[i].move.name;
            };
            showInline('#health');
            showInline('#enemy');
            if(pokeId == 25){
                 hide('.two');
                 hide('.three');
            }else if(pokeId == 5){
                hide('.one');
                hide('.three');
            }else {
                hide('.one');
                hide('.two');
            }

          };
         }
    };

};


choose_Pokemon(25);
choose_Pokemon(5);
choose_Pokemon(393);


//battle logic

const changeHtml = (id,value) => {
    document.getElementById(id).innerHTML = value
};

const battle_over = () => {
  if(enemyHealth <= 0){
    document.querySelector('#Won').style.display = 'block';
    hide('#mew');
  }
}



let score = 0;
let health = 100;
let enemyHealth = 100;
let attack = (Math.random()*10)+3;
const superMove = 30;
const battle_sim = () => {
    enemyHealth -= attack
    enemyHealth = Math.round(enemyHealth);
    score += 5
    enemyTurn();
    if(score >= 30){
        document.querySelector('#super').style.display = 'block';
        document.getElementById('super').onclick = () => {
            enemyHealth -= 30;
            changeHtml('enemy','health:'+enemyHealth);
            battle_over();
        }
    }
};
const enemyTurn = () => {
    if(enemyHealth > 50){
        health -= 10;
        return health;
    }else if(enemyHealth < 50){
        health -= 16;
        return health;
    }
}

const battle = id => {
    document.getElementById('move'+id).onclick = () => {
        if(id === 1){
            attack += 2;
            battle_sim();
            battle_over();
        }else{
            battle_sim();
            battle_over();
        }
        changeHtml('score','score:'+score);
    changeHtml('health','health:'+health);
    changeHtml('enemy','health:'+enemyHealth);
    }
}
battle(1);
battle(2);
battle(3);
battle(4);
