export default function setSelector(selector, key) {
  return {
    type: 'SELECTOR_SET',
    selector,
    key,
  }
}
