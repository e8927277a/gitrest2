var xhr = new XMLHttpRequest();
xhr.open('get', "https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery", true);
xhr.send();
xhr.onload = function() {
  var data = JSON.parse(xhr.responseText)
  
  var area = document.querySelector('.area');
  var area_list = {};
  var area_str = '<option>' + "請選擇地區" + '</option>';
  
  var info = document.querySelector('.info');
  var info_list = {};
  var info_str = '<option>' + "請選擇類型" + '</option>';
  
  var area_info = document.querySelector('.area_info');
  var count = document.querySelector('.count');
  var count_str = '';
  
  for(var i = 0 ; data.length>i ; i++) {
    if(area_list[data[i].ZipName_] == undefined) {
      area_list[data[i].ZipName_] = 1;
    } else {
      area_list[data[i].ZipName_] += 1;
    }
}
  //console.log(area_list)
  for(area_item in area_list) {
  area_str += '<option>' + area_item +'</option>'
}
  area.innerHTML = area_str;
  
  
  for(var j = 0 ; data.length>j ; j++) {
    if(info_list[data[j].InformDesc_] == undefined) {
      info_list[data[j].InformDesc_] = 1;
    } else {
      info_list[data[j].InformDesc_] += 1;
    }
}
  //console.log(info_list)
  for(info_item in info_list) {
  info_str += '<option>' + info_item +'</option>'
}
  info.innerHTML = info_str;
  
  
  
  document.getElementById("search").addEventListener('click', search);
  function search() {
    var select_area = area.value;
    var select_info = info.value;
    var select_str = '';
    var j = 0;
    for(var i = 0; data.length>i; i++) {
      if(select_area == data[i].ZipName_ && select_info == data[i].InformDesc_) {
        select_str += '<li>' + "地點 : " + data[i].address_ + '</br>' + "報案狀況 : " + data[i].BeforeDesc_ + "</lit>";
        j += 1
      } else if(select_area == data[i].ZipName_) {
        j += 1
        select_str += '<li>' + "地點 : " + data[i].address_ + '</br>' + "報案狀況 : " + data[i].BeforeDesc_ + "</lit>";
      } else if(select_info == data[i].InformDesc_) {
        j += 1
        select_str += '<li>' + "地點 : " + data[i].address_ + '</br>' + "報案狀況 : " + data[i].BeforeDesc_ + "</lit>";
      }
    }
    count_str += "全部" + select_info + "有" + j + "處";
    count.innerHTML = count_str;
    area_info.innerHTML = select_str;
  }
}