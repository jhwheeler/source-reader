import htmlparser from 'htmlparser2'

const getBodyElement = dom => htmlparser.DomUtils.findOne(
  ({ type, name}) => type === 'tag' && name === 'body',
  dom,
);

const getText = html => {
    const handler = new htmlparser.DomHandler()
    const parser = new htmlparser.Parser(handler)

    parser.write(html)
    parser.end()

    const nodes = handler.root.childNodes
    const body = getBodyElement(nodes)
    const bodyWithoutScripts = body.children.filter((({ name }) => !name || name !== 'script'))

    return htmlparser.DomUtils.getOuterHTML(bodyWithoutScripts)
}

async function fetchHTML (url) {
  const res = await fetch(url)
  const html = await res.text()
  
  const text = getText(html)
  return text
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()

    const url = data.get('url-input')
    const html = await fetchHTML(url)
    return { html }
  }
}