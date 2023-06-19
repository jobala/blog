shortcodes = document.getElementsByClassName('gh')

const Language = {
  go: 'go',
  toml: 'toml',
  js: 'javascript',
  json: 'json',
  yml: 'yaml',
  yaml: 'yaml',
}

for (let i = 0; i < shortcodes.length; i++) {
  const url = new URL(shortcodes[i].innerHTML)
  shortcodes[i].innerHTML = ''
  const [start, stop] = getLineNumbers(url.hash)
  const code = document.createElement('code')
  const language = getLanguage(url.pathname)
  const snippetPath = getSnippetPath(url.pathname)
  code.setAttribute('class', 'snippet')

  // add snippet header
  const snippetHeader = document.createElement('div')
  const linkToSnippet = document.createElement('a')
  linkToSnippet.setAttribute('href', url.href)
  linkToSnippet.setAttribute('target', '_blank')
  linkToSnippet.innerHTML = snippetPath
  snippetHeader.setAttribute('class', 'snippet-header')
  snippetHeader.appendChild(linkToSnippet)
  shortcodes[i].appendChild(snippetHeader)

  const snippetContainer = document.createElement('div')
  snippetContainer.setAttribute('class', 'snippet-container')
  snippetContainer.appendChild(code)
  shortcodes[i].appendChild(snippetContainer)

  fetch('https://raw.githubusercontent.com/' + url.pathname.replace('/blob', '')).then(async (res) => {
    r = await res.text()
    lines = r.split('\n')

    for (let j = start - 1; j < stop + 1; j++) {
      const div = document.createElement('div')
      div.innerHTML = hljs.highlight(lines[j], { language, style: 'github' }).value
      code.appendChild(div)
    }
  })
}

/**
 * getLineNumbers returns the start and stop numbers given a hash
 * @param {string} hash
 */
function getLineNumbers(hash) {
  res = hash.replace('#', '').split('-')
  start = res[0].slice(1)
  stop = res[1].slice(1)
  return [Number(start), Number(stop)]
}

/**
 * getLanguage gets the programming language from a pathname
 * @param {string} pathname
 */
function getLanguage(pathname) {
  const parsed = pathname.split('/')
  const file = parsed[parsed.length - 1]
  const extension = file.split('.')[1]
  return Language[extension]
}

/**
 * getSnippetPath gets the path to a snippet file from pathname
 */
function getSnippetPath(pathname) {
  const parsed = pathname.split('/')
  return parsed[2] + '/' + parsed.slice(5).join('/')
}
