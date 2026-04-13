requirejs.config({
  waitSeconds: 200,
  paths: {
    'docsearch': '//cdn.jsdelivr.net/npm/@docsearch/js@4.6.0/dist/umd/index'
  },
  shim: {
    'search': ['docsearch'],
  }
})

requirejs([
  'search'
])
