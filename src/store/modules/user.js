import { login, logout, getInfo } from '@/api/user'
import { showFailToast, showLoadingToast } from 'vant'
import { getConfig, getOssKey } from '@/api/common'
import { TokenKey, DominKey, setToken, OssKey } from '@/utils/auth'
import { getCookieByKey, setCookie, removeCookieByKey, clearAllCookies } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import globleFun from '@/utils/link'

const state = {
  token: getCookieByKey( 'token' ),
  name: '灰是小灰灰的灰',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  introduction: '',
  roles: [],
  info: {},
  config: {},
  domain: '',
  activeTabbar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFOS: (state, data) => {
    const { name, avatar, roles } = data
    state.name = name
    state.avatar = avatar
    state.roles = roles
  },
  CLEAR_USER_INFOS( state ) {
    state.token = ''
    state.name = ''
    state.avatar = ''
    state.roles = []
  },
  
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_CONFIG: (state, config) => {
    state.config = config
  },
  SET_ACTIVETABBAR: (state, active) => { 
    state.activeTabbar = active
  }
}

const actions = {
  // 用户注册成功之后，保存token assessCode timestamp
  saveToken( { commit }, payload ) {
    const { token } = payload
    commit( 'SET_TOKEN', payload )
    setCookie( `${COOKIE_PREFIX}token`, token )
  },
  
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response
          commit('SET_INFO', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
    })
  },
  
  getOssKey({ commit }) {
    return new Promise((resolve, reject) => { 
      getOssKey().then(response => {
        setToken({ key: OssKey, value: JSON.stringify(response.data)  })
      })
    })
  },

  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setCookie('token', data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  logout({ state, dispatch }) {
    return new Promise((resolve, reject) => {
      removeCookieByKey(TokenKey)
      globleFun.onGoto('/login', 'replace')
      resolve()
    })
  },

  getConfig({ commit, state }) {
    return new Promise((resolve, reject) => {
      const toast = showLoadingToast({
        overlay: true,
        duration: 0,
        message: '加载中...'
      })
      getConfig()
        .then(response => {
          const { data } = response
          setToken({ key: DominKey, value: data.cdn_domain })
          commit('SET_CONFIG', data)
          toast.close()
          resolve(data)
        }).catch(error => {
          toast.close()
          showFailToast({
            overlay: true,
            duration: 0,
            message: '请求失败，请刷新重试'
          })
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
