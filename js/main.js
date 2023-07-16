

function read_csv(filename) {
  // CSVファイルを取得
  let csv = new XMLHttpRequest();

// CSVファイルへのパス
  csv.open("GET", filename, false);
  csv.send(null)
// 配列を定義
  let csvArray = [];

// 改行ごとに配列化
  let lines = csv.responseText.split(/\r\n|\n/);

// 1行ごとに処理
  for (let i = 0; i < lines.length; ++i) {
    let cells = lines[i].split(",");
    if (cells.length != 1) {
      csvArray.push(cells);
    }
  }
  return csvArray
}

function make_accordion(data, num) {

  let tag_div1 = document.createElement('div');
  tag_div1.className = "accordion-item";
  document.getElementById('accordionExample').appendChild(tag_div1);

  let tag_h2_ = document.createElement('h2');
  tag_h2_.className = "accordion-header"
  tag_h2_.id = "heading"+num
  tag_div1.appendChild(tag_h2_);

  let tag_button = document.createElement('button');
  tag_button.className = "accordion-button collapsed";
  tag_button.type = "button";
  tag_button.setAttribute("data-bs-toggle", "collapse");
  tag_button.setAttribute("data-bs-target", "#collapse"+num)
  tag_button.setAttribute("area-expanded", "false");
  tag_button.setAttribute("area-controls", "collapse"+num);
  tag_button.textContent = num + " " + data[0];
  tag_h2_.appendChild(tag_button)

  let tag_div2 = document.createElement('div');
  tag_div2.id = "collapse"+num;
  tag_div2.className = "accordion-collapse collapse ";
  tag_div2.setAttribute("aria-labelledby", "heading"+num);
  // tag_div2.setAttribute("data-bs-parent", "#accordionExample");
  tag_div1.appendChild(tag_div2);

  let tag_div3 = document.createElement('div');
  tag_div3.className = "accordion-body";
  tag_div3.textContent = data[3];
  tag_div2.appendChild(tag_div3);


}

function arrayShuffle(array) {
  for(let i = (array.length - 1); 0 < i; i--){

    // 0〜(i+1)の範囲で値を取得
    let r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    let tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

function make_list(n) {
  accordion = document.getElementById('accordionExample');
  clone = accordion.cloneNode(false);
  accordion.parentNode.replaceChild(clone, accordion);

  results = read_csv("js/uriage.csv").slice(1,n+2)

  if (document.getElementById("flexSwitchCheckChecked").checked){
    results_ = arrayShuffle(results)
  }else{
    results_ = results
  }

  for (let i = 1; i < n+1; i++) {
    make_accordion(results_[i], i)
    console.log(i)
  }
}

result = read_csv("js/uriage.csv").slice(1,20)

// var form = document.forms.myform;
//
// form.output.textContent = result.join("\n");

// for (let i = 1; i < 20; i++) {
//     make_accordion(result[i], i)
// }
make_list(20)


