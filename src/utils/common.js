export function ToTree(arrData, IdFueldName = 'id', ParentIdFieldName = 'parent', ChildrenFieldName = 'children') {
  //为了不破坏原来数据的内容,用JSON破坏掉正常的变量赋值,真搞不懂JS的深浅拷贝slice,concat 都不行
  let arrDataNew = JSON.stringify(arrData);
  arrDataNew = JSON.parse(arrDataNew);
  var map = {};
  arrDataNew.forEach(function (item) {
    map[item[IdFueldName]] = item;
  });
  var arrResult = [];
  arrDataNew.forEach(function (item) {
    var parent = map[item[ParentIdFieldName]];
    if (parent) {
      (parent[ChildrenFieldName] || (parent[ChildrenFieldName] = [])).push(item);
    } else {
      arrResult.push(item);
    }
  });
  return arrResult;
}