// Crash if NGN is not found.
if (NGN === undefined || typeof NGN !== 'object') {
  throw new Error('Cannot find NGN. JET depends on the presenceof NGN.')
}

/**
 * @namespace JET
 */
Object.defineProperty(NGN.global, 'JET', NGN.public(Object.defineProperties({}, {
  extend: NGN.const((namespace, descriptor) => {
    if (JET.hasOwnProperty(namespace)) {
      throw new Error(`Cannot create JET.${namespace} because it already exists.`)
    }

    if ((typeof descriptor !== 'object') || (!descriptor.hasOwnProperty('value') && !descriptor.hasOwnProperty('get') && !descriptor.hasOwnProperty('set'))) {
      NGN.WARN(`No descriptor was supplied for the new JET namespace "${namespace}". Using NGN.public() by default.`)
      descriptor = NGN.public(descriptor)
    }

    let scopes = namespace.split('.')
    let parent = NGN.global.JET

    // Prevent duplication of global namespace.
    if (scopes[0].trim().toUpperCase() === 'JET') {
      scopes.shift()
    }

    while (scopes.length > 0) {
      let scope = scopes.shift()

      if (!parent.hasOwnProperty(scope)) {
        Object.defineProperty(parent, scope, scopes.length > 0 ? NGN.const({}) : descriptor)
      }

      parent = parent[scope]
    }
  }),

  version: NGN.const('[#REPLACE_VERSION#]')
})))

export { JET as default }
