requirejs.config({
  waitSeconds: 200,
  paths: {
    'docsearch': '//cdn.jsdelivr.net/npm/@docsearch/js@3.0.0/dist/umd/index'
  },
  shim: {
    'search': ['docsearch'],
  }
})

requirejs([
  'search'
])
