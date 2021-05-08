
    // 获得输入的元素
    let fliterInput = document.getElementById("fliterInput");
    
    // 添加事件
    fliterInput.addEventListener("keyup", fliterNames);


function fliterNames() {
  //从Input里获取值,要过滤的值为输入的值的大写形式
  let fliterValue = document.getElementById("fliterInput").value.toUpperCase();

  //获取ul id "names"
  let ul = document.getElementById("names");

  //从ul中获取所有<li>，返回NodeList
  //NodeList 对象是节点的集合,是一个类数组对象
  let li = ul.querySelectorAll("li.collection-item");

  //在collection-item li中循环
  for(let i=0;i<li.length;i++){
    //获得第i个<li>的第一个<a>
    let a = li[i].getElementsByTagName("a")[0];
    //a.innerHTML.toUpperCase()取得上述所求<a>的HTML内容，本样例中也即通讯录中的姓名
    //.indexOf(fliterValue)也即在刚才所取得的大写姓名中寻找,输入的值的大写形式

    if(a.innerHTML.toUpperCase().indexOf(fliterValue)>-1){//如果找到，应该返回一个正数
       //则令其显示
       //这样代码并不多余，若缺少这行代码，则导致删除或改变关键词后，表单回退不到之前的状态
      li[i].style.display = "";     
    }
    else{
      //否则，元素不会被显示
      li[i].style.display = "none";
    }
  }
}



