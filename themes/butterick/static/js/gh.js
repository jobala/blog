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
  const url = getUrlFrom(shortcodes[i].innerHTML)
  const snippetPath = getSnippetPath(url.pathname)
  const [firstLine, lastLine] = getLineNumbers(url.hash)

  // create elements
  const codeEl = document.createElement('code')
  const snippetHeader = document.createElement('div')
  const snippetContainer = document.createElement('div')
  const linkToSnippet = document.createElement('a')

  // set attributes
  codeEl.setAttribute('class', 'snippet')
  snippetContainer.setAttribute('class', 'snippet-container')
  snippetHeader.setAttribute('class', 'snippet-header')
  linkToSnippet.setAttribute('target', '_blank')
  linkToSnippet.setAttribute('href', url.href)

  linkToSnippet.innerHTML = snippetPath
  shortcodes[i].innerHTML = ''
  shortcodes[i].appendChild(snippetHeader)
  snippetHeader.appendChild(linkToSnippet)
  snippetContainer.appendChild(codeEl)
  shortcodes[i].appendChild(snippetContainer)

  fetchSnippetFrom(url).then((snippet) => {
    createCodeBlock(snippet, firstLine, lastLine, codeEl, url)
  })
}

async function fetchSnippetFrom(url) {
  return fetch('https://raw.githubusercontent.com/' + url.pathname.replace('/blob', '')).then(async (res) => {
    return await res.text()
  })
}

function createCodeBlock(snippet, start, stop, code, url) {
  snippet
    .split('\n')
    .slice(start, stop + 1)
    .map((line) => {
      const div = document.createElement('div')
      div.innerHTML = highlightLine(line, getLanguage(url.pathname))
      code.appendChild(div)
    })
}

function highlightLine(line, language) {
  return hljs.highlight(line, { language, style: 'github' }).value
}

function getUrlFrom(permalink) {
  return new URL(permalink)
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
