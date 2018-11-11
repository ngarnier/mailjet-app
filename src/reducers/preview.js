export default function preview(state = {
  previewIsFullSize: false,
}, action) {
  switch (action.type) {
    case 'PREVIEW_FULLSIZE_SET': {
      return { ...state, previewIsFullSize: action.key }
    }
    default:
      return state
  }
}
