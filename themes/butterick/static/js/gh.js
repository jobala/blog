shortcodes = document.getElementsByClassName('gh')

for (let i = 0; i < shortcodes.length; i++) {
  const url = new URL(shortcodes[i].innerHTML)
  const [start, stop] = getLineNumbers(url.hash)
  console.log(start, stop)

  fetch('https://raw.githubusercontent.com/' + url.pathname.replace('/blob', '')).then(async (res) => {
    r = await res.text()
    lines = r.split('\n')

    for (let j = start; j < stop + 1; j++) {
      shortcodes[i].value += '\n' + lines[j]
    }

    shortcodes[i].style.height = shortcodes[i].scrollHeight + 'px'
  })
  console.log(url)
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
