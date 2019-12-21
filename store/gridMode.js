export const gridMode = Object.freeze({
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  EDIT: 'EDIT'
})

export const state = () => ({
  gridMode: gridMode.PAUSE
})

export const mutations = {
  set(state, newMode) {
    state.gridMode = newMode
  }
}

export const getters = {
  get(state) {
    return state.gridMode
  }
}
