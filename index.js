if (!localStorage.getItem("config_w")) {
    localStorage.setItem("config_w", 3);
}
if (!localStorage.getItem("config_d")) {
    localStorage.setItem("config_d", 2);
}

document.addEventListener("keydown", (e)=>{
    if (e.code == "Semicolon" && e.ctrlKey) {
        localStorage.setItem("config_w", window.prompt("Quantas meditações por semana?"));
    }
    if (e.code == "Quote" && e.ctrlKey) {
        localStorage.setItem("config_d", window.prompt("Quantas meditações por dia? (cada 1 tem 5min)"));
    }
});

document.getElementById("week").addEventListener("click", ()=>{
    let elm = document.querySelector(".drop-box");
    elm.className = elm.className.includes('closed') ? 'drop-box' : 'drop-box closed';
});

document.getElementById("day").addEventListener("click", ()=>{
    let elm = document.querySelector(".drop-box");
    elm.className = elm.className.includes('closed') ? 'drop-box' : 'drop-box closed';
});

let data_user =
{
    "start": new Date('2023-08-20T00:00:00').toUTCString(),
    "week": 1,
    "week_days": {
        "start": 0,
        "end": 0
    },
    "days": {
        "1": "pending",
        "2": "pending",
        "3": "pending",
        "4": "pending",
        "5": "pending",
        "6": "pending",
        "7": "pending"
    }
};

data_user.week_days.start = new Date((data_user.week-1)*(7*24*60*60*1000)+new Date(data_user.start).valueOf()).toUTCString();
data_user.week_days.end = new Date((data_user.week)*(7*24*60*60*1000)+new Date(data_user.start).valueOf()).toUTCString();

if (!localStorage.getItem("data_user")) {
    localStorage.setItem("data_user", JSON.stringify(data_user));
}

let day_of_week = '';
let hoje = new Date(new Date().toUTCString());

if (localStorage.getItem("data_user")) {
    data_user = JSON.parse(localStorage.getItem("data_user"));
    
    if (hoje.valueOf() >= new Date(data_user.week_days.start).valueOf() && hoje.valueOf() < new Date(data_user.week_days.end).valueOf()) {
        day_of_week = Math.floor((hoje.valueOf()-new Date(data_user.week_days.start).valueOf()+(1000*60*60*24))/(1000*60*60*24));
        let week = data_user.week;
        let day_string = `${hoje.getDate()<10?'0'+hoje.getDate():hoje.getDate()}/${hoje.getMonth()+1<10?'0'+(hoje.getMonth()+1):hoje.getMonth()+1}/${hoje.getFullYear().toString().substr(2,4)<10?'0'+hoje.getFullYear().toString().substr(2,4):hoje.getFullYear().toString().substr(2,4)}`;
        
        document.getElementById("day_today").innerHTML = day_string;
        document.getElementById("week").innerHTML = document.getElementById("week").innerHTML.replace('SEMANA ...',`SEMANA ${week}`).replaceAll('...', Object.values(data_user.days).filter(x=>x=='completed').length>parseInt(localStorage.getItem("config_w"))-1 ? 'completed' : (day_of_week==7&&data_user.days[7]!='pending' ? 'incompleted' : 'pending'));
        document.getElementById("day").innerHTML = document.getElementById("day").innerHTML.replace('DIA ...', `DIA ${day_of_week}`).replaceAll('...', data_user.days[day_of_week]);

        document.querySelector(".drop-box").innerHTML = "";
        for (i=1; i<day_of_week; i++) {
            if (data_user.days[i]=='pending') data_user.days[i] = 'incompleted';
        }
        localStorage.setItem("data_user", JSON.stringify(data_user));
        for (i=1; i<=day_of_week; i++) {
            let dia = new Date(new Date(data_user.week_days.start).valueOf()+((i-1)*24*60*60*1000));
            let dia_str = `${dia.getDate()<10?'0'+dia.getDate():dia.getDate()}/${dia.getMonth()+1<10?'0'+(dia.getMonth()+1):dia.getMonth()+1}/${dia.getFullYear().toString().substr(2,4)<10?'0'+dia.getFullYear().toString().substr(2,4):dia.getFullYear().toString().substr(2,4)}`;
            document.querySelector(".drop-box").innerHTML += `<li class="day-type-1" value="${dia_str}">DIA ${i} - <a class="${data_user.days[i]}">${data_user.days[i].toUpperCase()}</a></li>`
        }

        if (data_user.days[day_of_week] == 'completed') document.querySelector(".centered").innerHTML = '<h2 id="continue">CONTINUE AMANHÃ!</h2>';

    } else {
        data_user.days = {
            "1": "pending",
            "2": "pending",
            "3": "pending",
            "4": "pending",
            "5": "pending",
            "6": "pending",
            "7": "pending"
        };

        for (let i=1; i<Infinity; i++) {
            if (new Date((i-1)*(7*24*60*60*1000)+new Date(data_user.start).valueOf()).valueOf() > hoje.valueOf()) {
                data_user.week = i-1;
                data_user.week_days.start = new Date((data_user.week-1)*(7*24*60*60*1000)+new Date(data_user.start).valueOf()).toUTCString();
                data_user.week_days.end = new Date((data_user.week)*(7*24*60*60*1000)+new Date(data_user.start).valueOf()).toUTCString();
                break;
            }
        }
        
        localStorage.setItem("data_user", JSON.stringify(data_user));
        location.reload();
    }
}

[...document.querySelectorAll("ul li")].map((x, i)=>{
    x.addEventListener("click", (e)=>{
        let clicked = e.target.tagName == 'A' ? e.target.parentElement : e.target;
        clicked.className = clicked.className == 'day-type-1' ? 'day-type-2' : 'day-type-1';
        if (clicked.className == 'day-type-2') {
            let val = clicked.innerHTML[clicked.innerHTML.indexOf('DIA ')+4];
            clicked.innerHTML = clicked.innerHTML.replace(/DIA.{2}/, 'DIA '+clicked.getAttribute('value'));
            clicked.setAttribute('value',val);
        } else {
            let val = clicked.innerHTML.substr(clicked.innerHTML.indexOf('DIA ')+4, clicked.innerHTML.indexOf('DIA ')+8);
            clicked.innerHTML = clicked.innerHTML.replace(/DIA.{9}/g, 'DIA '+clicked.getAttribute('value'));
            clicked.setAttribute('value', val);
        }
    });
});

if (!localStorage.getItem("checkbox-daily")) {
    let checkboxes =
    {
        "ids": [],
        "start": new Date('2023-08-20T00:00:00').toUTCString()
    };
    localStorage.setItem("checkbox-daily", JSON.stringify(checkboxes));
}

if (localStorage.getItem("checkbox-daily")) {
    let checkboxes = JSON.parse(localStorage.getItem("checkbox-daily"));

    [...document.querySelectorAll("input[type=checkbox]")].map((x) => {
        x.addEventListener("input", ()=>{
            let ids = [...document.querySelectorAll("input[type=checkbox]:checked")].map(x=>x.id);
            checkboxes.ids = ids;
            if (ids.length == parseInt(localStorage.getItem("config_d"))) {
                checkboxes.ids = [];
                data_user.days[day_of_week] = 'completed';
                location.reload();
            }
            localStorage.setItem("checkbox-daily", JSON.stringify(checkboxes));
            localStorage.setItem("data_user", JSON.stringify(data_user));
        });
    });

    [...document.querySelectorAll("input[type=checkbox]")].map((x) => {
        if( checkboxes.ids.find(y=>y==x.id) != undefined ) {
            x.checked = "checked";
        }
    })
}