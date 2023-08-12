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

    $("#btn_dados").click(exibeAleatorio);
    
})