$(function(){
    $("#sec-2").hide();
    $("#sec-1").show();

    let fase = 0;
    function wrong(){
        let correct = HREF!=='/Divisão' ? eval($("#termo").text().replace(/=| /g, '')) : eval($("#termo").text().replace(/=| /g, '')).toFixed('2');
        $("#msg").html('Tempo esgotado!<br>O resultado é: '+correct);
        $("#result").attr('readonly', true);
        $($("#fases > li")[fase]).find('img').removeClass('neutral').addClass('wrong');
        $("#timer").addClass('wrong-timer');

        if (fase!==4){
            fase++;
            $("#next").show();
        } else {
            blocked = true;
            $("#retry").show();
            $("#home").show();
            $("#final").show();
            $("#final").html($('li>img.right').length+'/5');
        }
        clearInterval(startedTimer);
    }

    let startedTimer = null;
    function startTimer(){
        let timer = $("#timer");
        let sec = mili = 0;

        startedTimer = setInterval(()=>{
            mili += 1;
            if (mili === 10) {
                sec += 1;
                mili = 0;
            }

            let timerTxt = `${sec}.${mili===0?'000':mili*100}`;
            timer.text(timerTxt);

            if (sec > 9) {
                wrong();
            }
        },100);
    }

    blocked = false
    $('body').on('keydown', (e)=>{
        if (e.key === 'Enter' && !blocked) {
            $("#next").click();
        }
        if (e.key === 'r' && blocked) {
            $("#retry").click();
        }
        if (e.key === 'h' && blocked) {
            $("#home").click();
        }
    });

    $(".href").click(()=>{
        location.replace('/');
    });

    const HREF = $("#href").text();
    let max = HREF!=='/Multiplicação'&&HREF!=='/Divisão' ? 1000 : 10;

    $("#load-game").click(function(){
        $('#sec-1').hide();
        $('#sec-2').show();
        setTimeout(()=>{
            $("#sec-1, #sec-2").remove();
            $("#sec-3").show();

            let valor1 = Math.floor(Math.random()*max+1);
            let valor2 = Math.floor(Math.random()*max+1);

            let op = "";
            switch(HREF) {
                case '/Soma':
                    op = '+';
                    break;
                case '/Subtração':
                    op = '-';
                    break;
                case '/Multiplicação':
                    op = '*';
                    break;
                case '/Divisão':
                    op = '/';
                    break;
                default:
                    break;
            }
            $("#termo").text(`${valor1} ${op} ${valor2} = `);
            $("#result").focus();
            
            startTimer();
            $("#result").on('input', (e)=>{
                let correct = HREF!=='/Divisão' ? eval($("#termo").text().replace(/=| /g, '')) : eval($("#termo").text().replace(/=| /g, '')).toFixed('2');
                if (e.target.value == correct) {
                    $("#msg").html('Correto!<br>O resultado é: '+correct);
                    $("#result").attr('readonly', true);
                    $($("#fases > li")[fase]).find('img').removeClass('neutral').addClass('right');
                    $("#timer").addClass('correct-timer');

                    if (fase!==4){
                        fase++;
                        $("#next").show();
                    } else {
                        blocked = true;
                        $("#retry").show();
                        $("#home").show();
                        $("#final").show();
                        $("#final").html($('li>img.right').length+'/5');
                    }
                    clearInterval(startedTimer);
                }
            });
        },800);

        $("#next").click(function(){
            if (fase!==5) {
                $(this).hide();
                $("#msg").text('');

                console.log(max);
                let valor1 = Math.floor(Math.random()*max+1);
                let valor2 = Math.floor(Math.random()*max+1);

                let op = "";
                switch(HREF) {
                    case '/Soma':
                        op = '+';
                        break;
                    case '/Subtração':
                        op = '-';
                        break;
                    case '/Multiplicação':
                        op = '*';
                        break;
                    case '/Divisão':
                        op = '/';
                        break;
                    default:
                        break;
                }
                $("#termo").text(`${valor1} ${op} ${valor2} = `);
                $("#result").val('');
                $("#result").focus();
                $("#result").attr('readonly', false);
                $("#timer").removeClass('correct-timer wrong-timer');
                sec = mili = 0;

                clearInterval(startedTimer);
                startTimer();
            }
        });
    });

    $("#retry").click(()=>{
        document.cookie = 'retry=true;expires='+new Date(new Date().valueOf()+3000).toUTCString()+';path=/';
        location.reload();
    });

    if (document.cookie.indexOf('retry')!==-1) {
        $("#load-game").click();
    }

    $("#home").click(()=>{
        location.replace('/');
    });
});