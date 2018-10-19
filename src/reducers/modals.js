export default function modals(state = {
  campaigns: false,
  messages: false,
  settings: false,
}, action) {
  switch (action.type) {
    case 'MODAL_SHOW': {
      return { ...state, [action.key]: true }
    }
    case 'MODAL_HIDE':
      return { ...state, [action.key]: false }
    default:
      return state
  }
}
