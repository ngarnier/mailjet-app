export default function setFilter(context, key) {
  return {
    type: 'FILTER_SET',
    context,
    key,
  }
}

