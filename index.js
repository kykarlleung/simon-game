$(document).ready(($) => {
    let gamePattern = [];
    let buttonColors = ['red', 'blue', 'green', 'yellow'];
    let userClickedPattern = [];
    let level = 0;
    started = false;
    let interval = 1000;

    nextSequence = () => {
        userClickedPattern = [];
        let rand = Math.floor((Math.random() * 100)) % 4;
        let randomChosenColor = buttonColors[rand]
        gamePattern.push(randomChosenColor);
        playSound(randomChosenColor);
        blink(randomChosenColor);
        level++;
        console.log('game ' + gamePattern)
    };

    $(document).on('keypress', () => {
        if (started === false) {
            startOver();
            $('#level-title').html("<em>LEVEL: " + (level + 1) + "</em>")
            $('body').css('background-color', '#011F3F')
            started = true;
            nextSequence();
        }
    })

    $('.btn').click(function (e) {
        let id = event.target.id;
        userClickedPattern.push(id);
        playSound(id);
        blink(id);
        animatePress(id);
        // console.log('user ' + userClickedPattern);
        checkAns(userClickedPattern.length - 1);
    })

    playSound = (color) => {
        const audio = new Audio('sounds/' + color + ".mp3");
        audio.play();
    }

    blink = (color) => {
        $('#' + color).fadeOut(100).fadeIn(100);
    }

    animatePress = (color) => {
        $('#' + color).addClass('pressed');
        setTimeout(() => {
            $('#' + color).removeClass('pressed');
        }, 100)
    }

    checkAns = (cur) => {
        if(gamePattern.length >= userClickedPattern.length && gamePattern[cur] === userClickedPattern[cur]) {
            if(cur===level-1)
                contGame();
        }
        else {
            stopGame();
        }
    }

    startOver = () => {
        gamePattern = [];
        level = 0;
        $('#score').text(null);
    }

    contGame = () => {
        $("#level-title").text('LEVEL: ' + (level + 1))
        setTimeout(() => {
            nextSequence()
        }, interval)
    }

    stopGame = () => {
        $('#score').text('Score: ' + level);
        $("#level-title").text('Press any Key to restart')
        $('body').css('background-color', 'red')
        started = false;
        playSound('wrong');
    }

    $('#add').click(()=>{
        if(interval < 2000){
            interval += 100
            $('#difficulty').text("Time Interval: "+ (interval/1000).toFixed(1) + "s");
        }
    })

    $('#minus').click(()=>{
        if(interval > 300){
            interval -= 100
            $('#difficulty').text("Time Interval: "+ (interval/1000).toFixed(1) + "s");
        }
    })

})