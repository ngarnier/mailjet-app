export const showModal = (key) => {
  return {
    type: 'MODAL_SHOW',
    key,
  }
}

export function hideModal(key) {
  return {
    type: 'MODAL_HIDE',
    key,
  }
}
