const AccessTokenKey = 'token'
export function getToken() {
  return wx.getStorageSync(AccessTokenKey)
}
