var codeEl, nameEl, langEl

window.onload = function () {
  codeEl = document.getElementById('code')
  nameEl = document.getElementById('name')
  langEl = document.getElementById('language')
  update()
}

window.onhashchange = update

function update () {
  var file = decodeURIComponent(window.location.hash.substr(1))
  if (file.indexOf('/ipfs/') !== 0) file = '/ipfs/' + file
  var url = window.location.origin + file

  var split = file.split('/')
  nameEl.textContent = split[split.length - 1]

  var req = new XMLHttpRequest()
  req.addEventListener('load', function () {
    codeEl.textContent = req.responseText
    codeEl.className = ''
    hljs.highlightBlock(codeEl)
    document.body.style.background = codeEl.style.background
    langEl.textContent = codeEl.className.substr(5)
  })
  req.open('get', url, true)
  req.send()
}
