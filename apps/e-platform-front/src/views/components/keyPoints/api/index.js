import service from "@/utils/request";

//工具
export function searchDataListcompanyIndicators(data) {
  return service({
    url: '/atree/mysql/searchDataMap',
    method: 'POST',
    data
  });
}
export function serachDataTree(data) {
  return service({
    url: '/atree/mysql/searchDataMap',
    method: 'POST',
    data
  });
}
export function companyIndicatorssearchDataTree(data) {
  return service({
    url: '/atree/mysql/searchDataMap',
    method: 'POST',
    data
  });
}
export function searchImpactFactorList(data) {
  return service({
    url: '/atree/mysql/searchDataMap',
    method: 'POST',
    data
  });
}
export function searchQuotaMap(data) {
  return service({
    url: '/atree/mysql/searchDataMap',
    method: 'POST',
    data
  });
}
