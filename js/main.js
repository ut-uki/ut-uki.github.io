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

function in_includes(list, str){
  for (let i=0; i< list.length; i++){
    if (list[i].includes(str)) return true;
  }
  return false
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

function make_data_lists() {
  let returnLists = []

  let nameList0 = [];
  for (let i =1; i < database.length; i++){
    if(database[i][0] !== "") nameList0.push(database[i][0]);
  }
  returnLists.push(nameList0.sort());

  let nameList1 = [];
  for (let i =1; i < database.length; i++){
    if(database[i][1] !== "") nameList1.push(database[i][1]);
  }
  returnLists.push(nameList1.sort());

  let genreList = [];
  for (let i =1; i < database.length; i++){
    if (database[i][3] !== "" && !genreList.includes(database[i][3])) genreList.push(database[i][3]);
  }
  returnLists.push(genreList.sort());

  let relatedList = [];
  for (let i =1; i < database.length; i++){
    if(database[i][4] !== "") {
      let related = database[i][4].split("　")
      related.forEach(function (val) {
        if (!relatedList.includes(val)) relatedList.push(val)
      });
    }
  }
  returnLists.push(relatedList.sort());

  return returnLists
}

function initialize(genreList) {
  //ジャンルリスト生成
  const tag_ul = document.getElementById("genre-list")
  for (let i=0; i< genreList.length; i++){
    let tag_li = document.createElement("li");
    tag_ul.appendChild(tag_li)

    let tag_a = document.createElement("a")
    tag_a.className = "dropdown-item";
    tag_a.href = "#";
    tag_a.addEventListener("click", function(){print_list(N, genreList[i])});
    tag_a.textContent = genreList[i];
    tag_li.appendChild(tag_a)
  }
// 　フォーム生成
  let form = document.getElementById("input-form")
  form.children[1].addEventListener("click", function(){search();})
  form.children[1].click();
}

function make_accordion(data, num) {

  let tag_div1 = document.createElement('div');
  tag_div1.className = "accordion-item" + "";
  document.getElementById('accordionExample').appendChild(tag_div1);

  let tag_h2_ = document.createElement('h2');
  tag_h2_.className = "accordion-header"
  tag_h2_.id = "heading"+num
  tag_div1.appendChild(tag_h2_);

  let tag_button = document.createElement('button');
  tag_button.className = "accordion-button collapsed color"+data[7];
  tag_button.type = "button";
  tag_button.setAttribute("data-bs-toggle", "collapse");
  tag_button.setAttribute("data-bs-target", "#collapse"+num)
  tag_button.setAttribute("area-expanded", "false");
  tag_button.setAttribute("area-controls", "collapse"+num);
  tag_button.textContent = data[1];
  tag_h2_.appendChild(tag_button)

  let tag_div2 = document.createElement('div');
  tag_div2.id = "collapse"+num;
  tag_div2.className = "accordion-collapse collapse ";
  tag_div2.setAttribute("aria-labelledby", "heading"+num);
  // tag_div2.setAttribute("data-bs-parent", "#accordionExample");
  tag_div1.appendChild(tag_div2);

  // accordion-body
  let tag_div3 = document.createElement('div');
  tag_div3.className = "accordion-body";
  tag_div2.appendChild(tag_div3);

  let tag_strong = document.createElement('strong');
  tag_strong.textContent = data[2]
  tag_div3.appendChild(tag_strong)

  let tag_p = document.createElement('p');
  tag_p.textContent =  data[9] + " (" + data[9].length + ")";
  tag_div3.appendChild(tag_p)

  let tag_div4 = document.createElement('div');
  tag_div4.className = "genre";
  tag_div4.textContent = "ジャンル:";
  tag_div3.appendChild(tag_div4);
  let tag_a1 = document.createElement('a');
  tag_a1.textContent = data[3]
  tag_a1.href = "#"
  tag_a1.addEventListener('click', function(){print_list(N, data[3], "")});
  tag_div4.appendChild(tag_a1)

  let tag_div6 = document.createElement('div');
  tag_div6.style = "width :50%; font-size:8px; display:inline-block"
  tag_div6.textContent = "source:" + data[6] + (data[5] === "" ? "" : ("\n出題 :" + data[5]));
  tag_div3.appendChild(tag_div6)

  let tag_div5 = document.createElement('div');
  tag_div5.className = "genre";
  tag_div5.style = "width:50%; display:inline-block;";
  tag_div5.textContent = "関連:";
  tag_div3.appendChild(tag_div5);
  let related_list = data[4].split("　");
  for (let i = 0; i < related_list.length; i++){
    let tag_an = document.createElement('a');
    tag_an.textContent = related_list[i]
    tag_an.href = "#"
    tag_an.addEventListener('click', function(){print_list(N, "", related_list[i])});
    tag_div5.appendChild(tag_an)
  }

}

function print_list(n, genre="", related="", name="", important="") {
  let title = []
  let accordion = document.getElementById('accordionExample');
  let clone = accordion.cloneNode(false);
  accordion.parentNode.replaceChild(clone, accordion);

  let results = database.slice(1,n+1)

  if (important !== "") {
    results = results.filter(function(value) {
      return value[7].toString() === important
    });
  }

  if (related !== "") {
    results = results.filter(function(value) {
      return in_includes(value[4].split("　"),related) || value[1] === genre;
    });
    title.push(related)
  }

  if(genre !== "") {
    results = results.filter((value) =>value[3].includes(genre));
    title.push(genre)
  }

  if(name !== ""){
    results = results.filter((value) =>value[1].includes(name));
    title.push(name)
  }

  if (document.getElementById("flexSwitchCheckChecked").checked){
    results = arrayShuffle(results.slice())
    title.push("ランダム")
  } else{
    results = results.slice().sort()
  }

  for (let i = 0; i < results.length; i++) {
    make_accordion(results[i], i+1)
  }

  let title_text = "単語リスト"
  let title_add = " (" + title.reverse().join(", ") + ")"
  title_text += title.length===0 ? "" : title_add;
  document.getElementById("page-title").textContent = title_text;

  return results
}

function search() {
  let search_input = document.getElementById("input-form").children[0]
  let search_text = search_input.value
　let _important = "";
  let _genre = "";
  let _related = "";
  let _name = "";
  let _vars_change = false;

  if (["1","2","3","4","5"].includes(search_text)){
    _important = search_text;
    _vars_change = true;
    // print_list(N, "", "", "", search_text)
    // search_input.placeholder = "search";
  }
  if (in_includes(Lists[2], search_text)){
    _genre = search_text;
    _vars_change = true;
    // print_list(N, search_text, "", "", "")
    // search_input.placeholder = "search";
  }
  if (in_includes(Lists[3], search_text)) {
    _related = search_text;
    _vars_change = true;
    // print_list(N, "", search_text, "")
    // search_input.placeholder = "search";
  }
  if (in_includes(Lists[1], search_text)){
    _name = search_text;
    _vars_change = true;
    // print_list(N, "", "", search_text)
    // search_input.placeholder = "search";
  }

  if (_vars_change){
    print_list(N, _genre, _related, _name, _important);
    search_input.placeholder = "search";
  }
  else {
    // print_list(N)
    search_input.value = "";
    search_input.placeholder = "cannot find the word";
  }
}


const database = read_csv("js/心理学単語帳v2.csv").filter((value) => value[9] !== "");
const N = database.length
const Lists = make_data_lists()
initialize(Lists[2])



// let thelist = [["a","b"],["a","c"],["a b","c d"],["a m d","k i c"]]
// console.log(thelist);
// console.log(in_includes(thelist,"b"));
// console.log(in_includes(Lists[1], "アセチル"))
