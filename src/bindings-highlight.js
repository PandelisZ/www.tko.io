

var readonlyThemeMap = {
  html: "solarized_light",
  javascript: "solarized_light"
}

var emap = {
  '&amp;': '&',
  '&lt;': '<'
}

function unescape(str) {
  return str.replace(
    /&amp;|&lt;/g,
    function (ent) { return emap[ent]}
  )
}

ko.bindingHandlers.highlight = {
  setup: function (element, va) {
    var $e = $(element)
    var language = va()
    if (language !== 'html' && language !== 'javascript') {
      console.error("A language should be specified.", element)
      return
    }
    var content = unescape($e.text())
    $e.empty()
    var editor = ace.edit(element)
    var session = editor.getSession()
    editor.setTheme(`ace/theme/${readonlyThemeMap[language]}`)
    editor.setOptions({
      highlightActiveLine: false,
      useSoftTabs: true,
      tabSize: 2,
      minLines: 1,
      wrap: true,
      maxLines: 35,
      readOnly: true
    })
    session.setMode(`ace/mode/${language}`)
    editor.setValue(content)
    editor.clearSelection()
    ko.utils.domNodeDisposal.addDisposeCallback(element, () => editor.destroy())
  },

  init: function (element, va) {
    whenAlmostInView(element, () => ko.bindingHandlers.highlight.setup(element, va))
  }
}
