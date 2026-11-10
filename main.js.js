var arr = [];
function $(id){ return document.getElementById(id); }
function show(id, text){ $(id).textContent = text; }

function renderArr(){
  var box = $("arrView");
  if(arr.length === 0){ box.innerHTML = 'Mảng đang trống.'; return; }
  box.textContent = "Mảng: [" + arr.join(", ") + "]";
}

function addNumber(){
  var el = $("numInput"), raw = el.value.trim();
  $("err").textContent = "";
  if(raw === ""){ $("err").textContent = "Hãy nhập một số nguyên."; return; }
  var n = Number(raw);
  if(!Number.isInteger(n)){ $("err").textContent = "\"" + raw + "\" không phải số nguyên. Hãy nhập số như 5 hoặc -3."; return; }
  arr.push(n); el.value = ""; el.focus(); renderArr();
}

function needArray(){
  if(arr.length === 0){ return false; }
  return true;
}

function isPrime(n){
  if(n < 2) return false;
  for(var i = 2; i * i <= n; i++){ if(n % i === 0) return false; }
  return true;
}

var actions = {
  sumPos: function(){
    var s = 0;
    for(var i = 0; i < arr.length; i++){ if(arr[i] > 0) s += arr[i]; }
    show("out1", "Tổng số dương: " + s);
  },
  countPos: function(){
    var c = 0;
    for(var i = 0; i < arr.length; i++){ if(arr[i] > 0) c++; }
    show("out2", "Có " + c + " số dương");
  },
  min: function(){
    var m = arr[0];
    for(var i = 1; i < arr.length; i++){ if(arr[i] < m) m = arr[i]; }
    show("out3", "Số nhỏ nhất: " + m);
  },
  minPos: function(){
    var m = null;
    for(var i = 0; i < arr.length; i++){ if(arr[i] > 0 && (m === null || arr[i] < m)) m = arr[i]; }
    show("out4", m === null ? "Không có số dương trong mảng" : "Số dương nhỏ nhất: " + m);
  },
  lastEven: function(){
    var r = -1;
    for(var i = arr.length - 1; i >= 0; i--){ if(arr[i] % 2 === 0){ r = arr[i]; break; } }
    show("out5", "Số chẵn cuối cùng: " + r);
  },
  swap: function(){
    var a = $("pos1").value, b = $("pos2").value;
    var i = Number(a), j = Number(b);
    if(a === "" || b === "" || !Number.isInteger(i) || !Number.isInteger(j) || i < 0 || j < 0 || i >= arr.length || j >= arr.length){
      show("out6", "Vị trí phải là số nguyên từ 0 đến " + (arr.length - 1)); return;
    }
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    renderArr();
    show("out6", "Mảng sau khi đổi chỗ: " + arr.join(", "));
  },
  sort: function(){
    arr.sort(function(x, y){ return x - y; });
    renderArr();
    show("out7", "Mảng tăng dần: " + arr.join(", "));
  },
  firstPrime: function(){
    var r = -1;
    for(var i = 0; i < arr.length; i++){ if(isPrime(arr[i])){ r = arr[i]; break; } }
    show("out8", "Số nguyên tố đầu tiên: " + r);
  },
  compare: function(){
    var p = 0, n = 0;
    for(var i = 0; i < arr.length; i++){ if(arr[i] > 0) p++; else if(arr[i] < 0) n++; }
    var kq = p > n ? "Số dương nhiều hơn" : (n > p ? "Số âm nhiều hơn" : "Số dương bằng số âm");
    show("out10", kq + " (" + p + " dương, " + n + " âm)");
  }
};

function countInt(){
  var raw = $("realInput").value.trim();
  if(raw === ""){ show("out9", "Hãy nhập mảng số thực, cách nhau bằng dấu phẩy."); return; }
  var parts = raw.split(","), c = 0;
  for(var i = 0; i < parts.length; i++){
    var s = parts[i].trim();
    var v = Number(s);
    if(s === "" || isNaN(v)){ show("out9", "\"" + s + "\" không phải số hợp lệ."); return; }
    if(Number.isInteger(v)) c++;
  }
  show("out9", "Có " + c + " số nguyên trong " + parts.length + " số");
}

document.querySelectorAll("button[data-act]").forEach(function(btn){
  btn.addEventListener("click", function(){
    var act = btn.getAttribute("data-act");
    if(act === "countInt"){ countInt(); return; }
    if(!needArray()){
      var outs = {sumPos:"out1",countPos:"out2",min:"out3",minPos:"out4",lastEven:"out5",swap:"out6",sort:"out7",firstPrime:"out8",compare:"out10"};
      show(outs[act], "Hãy thêm ít nhất một số vào mảng trước."); return;
    }
    actions[act]();
  });
});

$("btnAdd").addEventListener("click", addNumber);
$("numInput").addEventListener("keydown", function(e){ if(e.key === "Enter") addNumber(); });
$("btnClear").addEventListener("click", function(){
  arr = []; $("err").textContent = "";
  document.querySelectorAll(".out").forEach(function(o){ o.textContent = ""; });
  renderArr();
});
renderArr();
