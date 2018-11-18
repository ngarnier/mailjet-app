export default function selectors(state = {
  sent: true,
  opened: true,
  clicked: true,
  hardBounced: true,
  softBounced: true,
  blocked: true,
  spam: true,
  unsub: true,
}, action) {
  switch (action.type) {
    case 'SELECTOR_SET': {
      return { ...state, [action.selector]: action.key }
    }
    default:
      return state
  }
}
