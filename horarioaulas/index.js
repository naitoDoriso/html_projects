$(function(){
    if (!localStorage.getItem("darkmode")) localStorage.setItem("darkmode", "true");

    render = () => {
        let actual = localStorage.getItem("darkmode");

        if (actual == "true") {
            $("#css").attr("href", "index.css");
            $("#darkmode").attr("alt", "Turn on lights");
            $("#darkmode").attr("src", "light.png");
        } else {
            $("#css").attr("href", "indexlight.css");
            $("#darkmode").attr("alt", "Turn off lights");
            $("#darkmode").attr("src", "dark.png");
        }
    };
    
    render();

    $($("#darkmode")[0].parentElement).click( () => {
        let val = eval(localStorage.getItem("darkmode"));

        localStorage.setItem("darkmode", !val);
        render();
    } );

    /********************************************/
    // Horários

    let aulas = {
        'seg': [
            'Planejamento e Controle da Produção (Aline)',
            'Planejamento e Controle da Produção (Aline)',
            'Projeto Integrador: Projetos Mecânicos (Maurilio)',
            'Projeto Integrador: Projetos Mecânicos (Maurilio)',
            'Manutenção (André)',
            'Manutenção (André)',
            '...'],
        'ter': [
            'Biologia e Programa de Saúde (Lorena)',
            'Biologia e Programa de Saúde (Lorena)',
            'Geografia (Karime)',
            'Matemática (Antão)',
            'Matemática (Antão)',
            'Matemática (Antão)',
            '...'],
        'qua': [
            'História (Bola)',
            'História (Bola)',
            'Geografia (Karime)',
            'Geografia (Karime)',
            'Língua Portuguesa e Redação (Borgato)',
            'Língua Portuguesa e Redação (Borgato)',
            '...'],
        'qui': [
            'Física (Marcão)',
            'Física (Marcão)',
            'Sociologia (Luciane)',
            'Sociologia (Luciane)',
            'Língua Portuguesa e Redação (Borgato)',
            'Língua Portuguesa e Redação (Borgato)',
            '...'],
        'sex': [
            'Artes (Renata)',
            'Artes (Renata)',
            'Projeto Integrador: Projetos Mecânicos (Maurilio)',
            'Filosofia (Nestor)',
            'Filosofia (Nestor)',
            'Projeto Integrador: Projetos Mecânicos (Maurilio)',
            '...']
    };
    let horario = ['12:35', '13:25', '14:25', '15:15', '16:20', '17:10', '...'];

    let dia_hoje = new Date().getDay();

    switch(dia_hoje) {
        case 0: return false;
        case 1: dia_hoje = 'seg'; break;
        case 2: dia_hoje = 'ter'; break;
        case 3: dia_hoje = 'qua'; break;
        case 4: dia_hoje = 'qui'; break;
        case 5: dia_hoje = 'sex'; break;
        case 6: return false;
    }

    let now = ( new Date().getHours() < 10 ? '0'+new Date().getHours() : new Date().getHours() )+':'+( new Date().getMinutes() < 10 ? '0'+new Date().getMinutes() : new Date().getMinutes() );
    
    if (now>="17:15") return false;
    let j = 0;
    let stop = false;
    horario.map( (hora, i) => {
        if ((now<=hora || hora == "...") && stop == false) {
            j = i;
            stop = true;
            return true;
        }
    });

    $("#prox_aula").text(aulas[dia_hoje][j]);
    $("#prox_hora").text(horario[j]);
    $("#outra_aula").text(aulas[dia_hoje][j+1]);
    $("#outra_hora").text(horario[j+1]);

    setInterval( () => {
        let now = ( new Date().getHours() < 10 ? '0'+new Date().getHours() : new Date().getHours() )+':'+( new Date().getMinutes() < 10 ? '0'+new Date().getMinutes() : new Date().getMinutes() );
        if (now>="17:15") return false;
        let j = 0;
        let stop = false;
        horario.map( (hora, i) => {
            if ((now<=hora || hora == "...") && stop == false) {
                j = i;
                stop = true;
                return true;
            }
        });

        $("#prox_aula").text(aulas[dia_hoje][j]);
        $("#prox_hora").text(horario[j]);
        $("#outra_aula").text(aulas[dia_hoje][j+1]);
        $("#outra_hora").text(horario[j+1]);
    }, (60*1000));
});