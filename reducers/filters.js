export default function filters(state = {
  campaigns: 'Sent',
  period: 'Day',
}, action) {
  switch (action.type) {
    case 'FILTER_SET': {
      return { ...state, [action.context]: action.key }
    }
    default:
      return state
  }
}
