shortcodes = document.getElementsByClassName('gh')

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

  // modify elements
  linkToSnippet.innerHTML = snippetPath
  shortcodes[i].innerHTML = ''
  shortcodes[i].appendChild(snippetHeader)
  snippetHeader.appendChild(linkToSnippet)
  snippetContainer.appendChild(codeEl)
  shortcodes[i].appendChild(snippetContainer)

  fetchSnippetFrom(url).then((snippet) => {
    createCodeBlock(snippet, firstLine, lastLine, codeEl, getLanguage(url.pathname))
  })
}

async function fetchSnippetFrom(url) {
  return fetch('https://raw.githubusercontent.com/' + url.pathname.replace('/blob', '')).then(async (res) => {
    return await res.text()
  })
}

function createCodeBlock(snippet, start, stop, code, language) {
  snippet
    .split('\n')
    .slice(start - 1, stop + 1)
    .map((line) => {
      const div = document.createElement('div')
      div.innerHTML = highlightLine(line, language)
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
  const res = hash.replace('#', '').split('-')
  const start = res[0].slice(1)
  const stop = res[1].slice(1)
  return [Number(start), Number(stop)]
}

/**
 * getLanguage gets the programming language from a pathname
 * @param {string} pathname
 */
function getLanguage(pathname) {
  const Language = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    go: 'go',
    c: 'c',
    yml: 'yaml',
    toml: 'toml',
    json: 'json',
    yaml: 'yaml',
    html: 'html',
  }

  const parsed = pathname.split('/')
  const file = parsed[parsed.length - 1]
  const extension = file.split('.')[1]
  return Language[extension] ? Language[extension] : 'plaintext'
}

/**
 * getSnippetPath gets the path to a snippet file from pathname
 */
function getSnippetPath(pathname) {
  const parsed = pathname.split('/')
  return parsed[2] + '/' + parsed.slice(5).join('/')
}
