export default function modals(state = { campaigns: false }, action) {
  switch (action.type) {
    case 'MODAL_SHOW': {
      return { [action.key]: true }
    }
    case 'MODAL_HIDE':
      return { [action.key]: false }
    default:
      return state
  }
}
