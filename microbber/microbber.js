import own from 'micromark/dist/constant/has-own-property.js'
import assign from 'micromark/dist/constant/assign.js'

export default function compileLatex (options) {
  const settings = options || {}
  const extensions = settings.extensions || {}
  const defaultHandlers = {
    enter: {
      emphasis: onEnterEmphasis
    },
    exit: {
      data: onEnterData,
      emphasis: onExitEmphasis
    }
  }

  const handlers = defaultHandlers

  return compile

  function compile (events) {
    const body = []
    const context = {
      raw,
      encode
    }

    for (const event of events) {
      const handler = handlers[event[0]]

      if (own.call(handler, event[1].type)) {
        const extendedContext = assign({ sliceSerialize: event[2].sliceSerialize }, context)
        handler[event[1].type].call(extendedContext, event[1])
      }
    }

    return body.join('')

    function raw (content) {
      body.push(content)
    }

    function encode (content) {
      return content
    }
  }

  function onEnterData (event) {
    this.raw(this.sliceSerialize(event))
  }

  function onEnterEmphasis (event) {
    this.raw('\\textit{')
  }

  function onExitEmphasis (event) {
    this.raw('}')
  }
}
