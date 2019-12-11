export const controlState = Object.freeze({
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  EDIT: 'EDIT'
})

export const state = () => ({
  gridControlState: controlState.PAUSE
})

export const mutations = {
  set(state, newControlState) {
    state.gridControlState = newControlState
  }
}

export const getters = {
  get(state) {
    return state.gridControlState
  }
}
