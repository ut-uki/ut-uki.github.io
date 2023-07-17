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

export {read_csv, in_includes, arrayShuffle}
