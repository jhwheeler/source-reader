import htmlparser from 'htmlparser2'

const getText = html => {
    const handler = new htmlparser.DomHandler()
    const parser = new htmlparser.Parser(handler)

    parser.write(html)
    parser.end()

    const nodes = handler.root.childNodes
    const body = getBodyElement(nodes)
    return htmlparser.DomUtils.getOuterHTML(body[0]?.children)
}

const getBodyElement = function(dom) {
  return htmlparser.DomUtils.find(function(element) {
    return element.type === 'tag' && element.name === 'body'
  }, dom, true, 1)
}

async function fetchHTML (url) {
  const res = await fetch(url)
  const html = await res.text()
  
  const dom = htmlparser.parseDocument(html)

  const text = getText(html)
  console.log('body', text)
  return text
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    console.log('data', data)

    const url = data.get('url-input')
    const html = await fetchHTML(url)
    return { html }
  }
}