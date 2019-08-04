export async function wxLogin(key) {
  return new Promise((resolve, reject) => {
    wx.login({
      success (res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

export async function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success (res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

export async function setStorage(key, data) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success (res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

export async function removeStorage(key) {
  return new Promise((resolve, reject) => {
    wx.removeStorage({
      key,
      success (res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}
