export default function bootstrapLink(history, state, path, query = null) {
  return {
    onClick: (event) => {
      event.preventDefault();
      history.pushState(state, path);
    },
    active: history.isActive(path, query)
  };
}

export function bootstrapSelectLink(history, state, path, query = null) {
  return {
    onSelect: (event) => {
      event.preventDefault();
      history.pushState(state, path);
    },
    active: history.isActive(path, query)
  };
}
