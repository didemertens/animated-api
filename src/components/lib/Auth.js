class Auth {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static setUserId(userId) {
    localStorage.setItem('userId', userId)
  }

  static getUserId() {
    return localStorage.getItem('userId')
  }

  static logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  static getPayload() {
    const token = this.getToken('token')
    if (!token) return false
    const parts = token.split('.')
    if (parts.length < 3) return false
    return JSON.parse(atob(parts[1]))
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }
}

export default Auth