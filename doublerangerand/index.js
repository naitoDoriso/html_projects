window.onload = () => {
    sliderOne();
    sliderTwo();
}

document.addEventListener('keydown', (e)=>{
    console.log(e.key, e.ctrlKey);

    if (e.key == '/' && e.ctrlKey && document.querySelector(".rand").className.includes("closed")) {
        if (document.querySelector(".msg").className.includes("closed")) {
            document.querySelector(".msg").className = "msg";
            document.querySelector(".msg").style.display = '';
            document.querySelector(".msg #close").onclick = () => {
                document.querySelector(".msg").style.display = 'none';
                document.querySelector(".msg").className = "msg closed";
            }
        }
    }

    if (document.querySelector(".msg").className.includes("closed") && document.querySelector(".rand").className.includes("closed")) {
        if (e.key == 'm') {
            document.getElementById("slider-1").value = 5;
            document.getElementById("slider-2").value = 15;
        } else if (e.key == 'e') {
            document.getElementById("slider-1").value = 10;
            document.getElementById("slider-2").value = 50;
        } else if (e.key == 's') {
            document.getElementById("slider-1").value = 5;
            document.getElementById("slider-2").value = 10;
        } else if (e.key == 'r') {
            document.getElementById("slider-1").value = 10;
            document.getElementById("slider-2").value = 30;
        } else if (e.key == 'c') {
            document.getElementById("slider-1").value = 15;
            document.getElementById("slider-2").value = 90;
        } else if (e.key == 'C') {
            document.getElementById("slider-1").value = 90;
            document.getElementById("slider-2").value = 180;
        }
        sliderOne();
        sliderTwo();
    }

    if (!document.querySelector(".rand").className.includes("closed") && e.key == 'Escape') {
        document.querySelector(".rand").style.display = 'none';
        document.querySelector(".rand").className = "rand closed";
    } else if (!document.querySelector(".msg").className.includes("closed") && e.key == 'Escape') {
        document.querySelector(".msg").style.display = 'none';
        document.querySelector(".msg").className = "msg closed";
    }
});

document.querySelector(".rand #close").onclick = () => {
    document.querySelector(".rand").style.display = 'none';
    document.querySelector(".rand").className = "rand closed";
}

document.querySelector("#btn").onclick = () => {
    document.querySelector(".rand").style.display = '';
    document.querySelector(".rand").className = "rand";

    let rand = Math.round( Math.random() * (parseInt(document.getElementById("slider-2").value) - parseInt(document.getElementById("slider-1").value)) + parseInt(document.getElementById("slider-1").value) );
    if (rand < 60) document.querySelector("#result").innerText = rand+"min";
    else if (rand == 60 || rand == 120 || rand == 180) document.querySelector("#result").innerText = parseInt(rand/60)+"h";
    else document.querySelector("#result").innerText = parseInt(rand/60)+"h"+Math.round(rand/60%1*60)+"min";
}

let displayRange1 = document.getElementsByClassName("range-1")[0];
let displayRange2 = document.getElementsByClassName("range-2")[0];
let slider1 = document.getElementById("slider-1");
let slider2 = document.getElementById("slider-2");

function sliderOne() {
    if (parseInt(slider2.value) - parseInt(slider1.value) <= 0) {
        slider1.value = parseInt(slider2.value)-1;
    }
    if (parseInt(slider1.value) < 60) {
        displayRange1.textContent = slider1.value+"min";
    } else if (parseInt(slider1.value) == 60 || parseInt(slider1.value) == 120 || parseInt(slider1.value) == 180) {
        displayRange1.textContent = parseInt(slider1.value/60)+"h";
    } else {
        displayRange1.textContent = parseInt(slider1.value/60)+"h"+Math.round(slider1.value/60%1*60)+"min";
    }
}

function sliderTwo() {
    if (parseInt(slider2.value) - parseInt(slider1.value) <= 0) {
        slider2.value = parseInt(slider1.value)+1;
    }
    if (parseInt(slider2.value) < 60) {
        displayRange2.textContent = slider2.value+"min";
    } else if (parseInt(slider2.value) == 60 || parseInt(slider2.value) == 120 || parseInt(slider2.value) == 180) {
        displayRange2.textContent = parseInt(slider2.value/60)+"h";
    } else {
        displayRange2.textContent = parseInt(slider2.value/60)+"h"+Math.round(slider2.value/60%1*60)+"min";
    }
}