$(function(){
    if (!localStorage.getItem("darkmode")) localStorage.setItem("darkmode", "true");

    render = () => {
        let actual = localStorage.getItem("darkmode");

        if (actual == "true") {
            $("#css").attr("href", "planilha.css");
            $("#darkmode").attr("alt", "Turn on lights");
            $("#darkmode").attr("src", "light.png");
        } else {
            $("#css").attr("href", "planilhalight.css");
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
});