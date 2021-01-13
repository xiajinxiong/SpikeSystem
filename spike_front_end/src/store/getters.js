const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,

  //below added by xia
  studentNo: state => state.user.studentNo,
  studentName: state => state.user.studentName,
  gender: state => state.user.gender,
  code: state => state.user.code,
  year: state => state.user.year,
  roomstatus: state => state.user.roomstatus,
}
export default getters
