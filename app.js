// ------------------------------ Variables ------------------------------ //
const button_colors = ["red", "blue", "green", "yellow"];
const buttons = document.querySelectorAll(".btn");
const red_audio = new Audio("./sounds/red.mp3");
const blue_audio = new Audio("./sounds/blue.mp3");
const green_audio = new Audio("./sounds/green.mp3");
const yellow_audio = new Audio("./sounds/yellow.mp3");
const wrong_audio = new Audio("./sounds/wrong.mp3");
const background = document.querySelector("body");
const audio_dict = {
    "red": red_audio,
    "green": green_audio,
    "yellow": yellow_audio,
    "blue": blue_audio,
};
let game_pattern = [];
let user_clicked_pattern = [];
let games_is_on = false;
let level = 0;
let title = document.getElementById("level-title");

// ------------------------------ Funciones ------------------------------ //
function next_sequence() {
    level += 1;
    title.innerHTML = "Level " + level;

    let random_number = Math.floor(Math.random() * 4); 
    let random_chosen_color = button_colors[random_number];
    game_pattern.push(random_chosen_color);

    let button = document.getElementById(random_chosen_color);
    button.classList.add("pressed");
    setTimeout(function(){
        button.classList.remove("pressed");
    }, 200);

    let audio = audio_dict[random_chosen_color];
    audio.play();
}

function wrong_answer() {
    wrong_audio.play();
    title.innerHTML = "Game over, press A to restart";

    background.classList.add("game-over");
    setTimeout(function(){
        background.classList.remove("game-over");
    }, 100);

    games_is_on = false;
    user_clicked_pattern = [];
    game_pattern = [];
    level = 0;
}

// ------------------------------ Script ------------------------------ //
buttons.forEach(btn => {
    btn.addEventListener("click", function() {
        btn.classList.add("pressed");
        setTimeout(function(){
            btn.classList.remove("pressed");
        }, 100);
        let user_chosen_color = btn.getAttribute("id");
        let audio = audio_dict[user_chosen_color];

        if(games_is_on == true) {
            user_clicked_pattern.push(user_chosen_color);

            audio.play();

            if(game_pattern.length == user_clicked_pattern.length) {
                if(game_pattern[game_pattern.length - 1] == user_clicked_pattern[user_clicked_pattern.length - 1]) {
                    user_clicked_pattern = [];
                    setTimeout(function() {
                        next_sequence();
                    }, 750);
                } else {
                    wrong_answer();
                    return;
                }
            } else {
                for (let i = 0; i < user_clicked_pattern.length; i++) {
                    if(user_clicked_pattern[i] != game_pattern[i]) {
                        wrong_answer();
                        break;
                    }
                }
            }
        }
    })
});

document.addEventListener("keydown", function(e) {
    if(e.key.toLowerCase() == "a" && games_is_on == false) {
        games_is_on = true;
        setTimeout(function () {  
            next_sequence();
        }, 100)
    }
})

