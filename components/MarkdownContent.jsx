import { memo, useMemo } from 'react'
import marked from 'marked'
// import MarkNav from 'markdown-navbar'
import hljs from 'highlight.js'
import '../lib/markdown.scss'

hljs.configure({
  tabReplace: '  ',
  useBR: true,
  // languages: ['CSS', 'HTML, XML', 'JavaScript', 'Java', 'Python', 'TypeScript', 'Markdown']
})

const rendererMD = new marked.Renderer()
rendererMD.heading = function (text, level, raw) {
  return `<h${level}>${text}</h${level}>\n`
}
rendererMD.table = function (header, body) {
  return '<table class="table" border="0" cellspacing="0" cellpadding="0">' + header + body + '</table>'
}

marked.setOptions({
  renderer: rendererMD,
  headerIds: false,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})


export default memo(({ content }) => {
  const html = useMemo(() => marked(content), [content])
  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <style jsx>{`
        .markdown-body {
          width: 90%
        }
      `}</style>
    </div>
  )
})
