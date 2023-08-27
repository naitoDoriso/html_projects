$(function(){
    function exibeAleatorio(){
        $(".bloco").css('animation','rodar .4s ease-in-out forwards');
        $("#btn_dados").attr('disabled','true');
        let num = Math.floor(Math.random() * 6 + 1);
        $(":root").css('--dado_left',-100*(num-1)-(num+1)+'%');
        $(":root").css('--dado_left_mb',-100*(num-1)+(num+1)+'%');
        setTimeout(()=>{
            $(".bloco").css('animation','');
            $("#btn_dados").removeAttr('disabled');
        },2000);
    }

    if (!localStorage.getItem("db")) {
        localStorage.setItem("db","db_teste.json");
    } else {
        if (localStorage.getItem("db") != "db.json") {
            $(".change-db").text("Usar Banco de Dados Oficial");
        } else {
            $(".change-db").text("Usar Banco de Dados de Teste");
        }
    }

    $(".change-db").click(()=>{
        if (localStorage.getItem("db") != "db.json") {
            localStorage.setItem("db","db.json");
            $(".change-db").text("Usar Banco de Dados de Teste");
        } else {
            localStorage.setItem("db","db_teste.json");
            $(".change-db").text("Usar Banco de Dados Oficial");
        }
    });

    $("#btn_dados").click(exibeAleatorio);
    
})