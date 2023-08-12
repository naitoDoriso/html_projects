const button = document.getElementById("redButton");
const messageBox = document.getElementById("messageBox");
const recorde = document.getElementById("recorde");
const nro = document.getElementById("nro");
let record = {tent:Infinity,prob:Infinity};
const tempo = document.getElementById("tempo");
let s = 0;
let time = {ht:0,mt:0,st:0};
let i = 0;

if (localStorage.getItem("closed")) {
  document.querySelector(".inicial").remove();
}

button.addEventListener("click", () => {
  if (s == 0) {
    setInterval(()=>{
      s++;
      console.log(s);
      if (s<60) {
        time.st = s;
      } else if (s>=60 && s<3600) {
        time.mt = s/60;
        time.st = Math.floor(time.mt%1*60);
      } else if (s>=3600) {
        time.ht = s/3600;
        time.mt = time.ht%1*60;
        time.st = Math.floor(time.mt%1*60);
      }

      time.st = time.st<10 ? '0'+Math.floor(time.st) : Math.floor(time.st);
      time.mt = time.mt<10 ? '0'+Math.floor(time.mt) : Math.floor(time.mt);
      time.ht = time.ht<10 ? '0'+Math.floor(time.ht) : Math.floor(time.ht);

      tempo.textContent = `${time.ht}:${time.mt}:${time.st}`;
    },1000);
  }
  if (nro.value == '') window.alert('Você não colocou nenhum número >:(');
  else {
    let rnd = Math.floor( Math.random()*9.9999*(10**(nro.value.length<5 ? nro.value.length-1 : 4) ))+1;
    i++;
    messageBox.innerHTML = 'RNG: '+rnd+'<br>#'+i;
    if (nro.value == rnd) {
      setTimeout(()=>{
        window.alert('Acertou! Com probabilidade de '+(1/(Math.floor(9.9999*(10**(nro.value.length<5 ? nro.value.length-1 : 4) ))+1))*100+"%");
        if (i < record.tent) {
          record.tent = i;
        }
        let prob = (1/(Math.floor(9.9999*(10**(nro.value.length<5 ? nro.value.length-1 : 4) ))+1))*100;
        if (prob < record.prob) {
          record.prob = prob;
        }
        recorde.innerHTML = '<h1>BEST</h1><br><br>Nº DE TENTATIVAS: '+record.tent+'<br>PROBABILIDADE: '+record.prob+'%<hr>';
        i = 0;
      },10);
    }
  }
});

nro.focus();

nro.addEventListener("click", (e) =>{
  e.preventDefault();
  e.stopPropagation();
});

nro.addEventListener("input", () => {
  nro.value = nro.value.replaceAll(' ', '');
  if (nro.value == 0 && nro.value != '') window.alert("Não pode ser 0 >:(");
  else if (nro.value < 0) window.alert("Não pode ser menor que 0 >:(");
  else if (nro.value > 99999) window.alert("Não pode ter mais de 5 dígitos >:(");
  if (!(nro.value>0 && nro.value <= 99999)) nro.value = '';
  if (nro.value>0 && nro.value <= 99999) {
    record.tent = Infinity;
    record.prob = Infinity;
  }
});

button.addEventListener("keydown", (e)=>{
  if (e.code == 'Space') {
    button.click();
    button.click();
    button.click();
  }
});