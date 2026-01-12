// Type definitions for es-intrinsic-cache with full IDE support
// Project: https://github.com/xsfj/es-intrinsic-cache

/**
 * Mapping of intrinsic names to their actual types for IDE autocomplete and type checking
 */
interface IntrinsicTypeMap {
  '%AggregateError%': typeof AggregateError
  '%Array%': typeof Array
  '%Array.prototype%': Array<any>
  '%Array.prototype.concat%': typeof Array.prototype.concat
  '%Array.prototype.entries%': typeof Array.prototype.entries
  '%Array.prototype.every%': typeof Array.prototype.every
  '%Array.prototype.filter%': typeof Array.prototype.filter
  '%Array.prototype.find%': typeof Array.prototype.find
  '%Array.prototype.findIndex%': typeof Array.prototype.findIndex
  '%Array.prototype.forEach%': typeof Array.prototype.forEach
  '%Array.prototype.includes%': typeof Array.prototype.includes
  '%Array.prototype.indexOf%': typeof Array.prototype.indexOf
  '%Array.prototype.join%': typeof Array.prototype.join
  '%Array.prototype.keys%': typeof Array.prototype.keys
  '%Array.prototype.lastIndexOf%': typeof Array.prototype.lastIndexOf
  '%Array.prototype.map%': typeof Array.prototype.map
  '%Array.prototype.pop%': typeof Array.prototype.pop
  '%Array.prototype.push%': typeof Array.prototype.push
  '%Array.prototype.reduce%': typeof Array.prototype.reduce
  '%Array.prototype.reduceRight%': typeof Array.prototype.reduceRight
  '%Array.prototype.reverse%': typeof Array.prototype.reverse
  '%Array.prototype.shift%': typeof Array.prototype.shift
  '%Array.prototype.slice%': typeof Array.prototype.slice
  '%Array.prototype.some%': typeof Array.prototype.some
  '%Array.prototype.sort%': typeof Array.prototype.sort
  '%Array.prototype.splice%': typeof Array.prototype.splice
  '%Array.prototype.unshift%': typeof Array.prototype.unshift
  '%Array.prototype.values%': typeof Array.prototype.values
  '%ArrayBuffer%': typeof ArrayBuffer
  '%ArrayBufferPrototype%': ArrayBuffer
  '%Boolean%': typeof Boolean
  '%Boolean.prototype%': Boolean
  '%BooleanPrototype%': Boolean
  '%DataView%': typeof DataView
  '%DataViewPrototype%': DataView
  '%Date%': typeof Date
  '%Date.prototype%': Date
  '%DatePrototype%': Date
  '%Error%': typeof Error
  '%Error.prototype%': Error
  '%ErrorPrototype%': Error
  '%EvalError%': typeof EvalError
  '%EvalErrorPrototype%': EvalError
  '%FinalizationRegistry%': typeof FinalizationRegistry
  '%Float32Array%': typeof Float32Array
  '%Float32ArrayPrototype%': Float32Array
  '%Float64Array%': typeof Float64Array
  '%Float64ArrayPrototype%': Float64Array
  '%Function%': typeof Function
  '%Function.prototype%': Function
  '%Function.prototype.apply%': typeof Function.prototype.apply
  '%Function.prototype.bind%': typeof Function.prototype.bind
  '%Function.prototype.call%': typeof Function.prototype.call
  '%FunctionPrototype%': Function
  '%Int16Array%': typeof Int16Array
  '%Int16ArrayPrototype%': Int16Array
  '%Int32Array%': typeof Int32Array
  '%Int32ArrayPrototype%': Int32Array
  '%Int8Array%': typeof Int8Array
  '%Int8ArrayPrototype%': Int8Array
  '%JSON%': typeof JSON
  '%JSON.parse%': typeof JSON.parse
  '%JSON.stringify%': typeof JSON.stringify
  '%JSONParse%': typeof JSON.parse
  '%JSONStringify%': typeof JSON.stringify
  '%Map%': typeof Map
  '%Map.prototype%': Map<any, any>
  '%MapPrototype%': Map<any, any>
  '%Math%': typeof Math
  '%Math.abs%': typeof Math.abs
  '%Math.acos%': typeof Math.acos
  '%Math.asin%': typeof Math.asin
  '%Math.atan%': typeof Math.atan
  '%Math.atan2%': typeof Math.atan2
  '%Math.ceil%': typeof Math.ceil
  '%Math.cos%': typeof Math.cos
  '%Math.exp%': typeof Math.exp
  '%Math.floor%': typeof Math.floor
  '%Math.log%': typeof Math.log
  '%Math.max%': typeof Math.max
  '%Math.min%': typeof Math.min
  '%Math.pow%': typeof Math.pow
  '%Math.random%': typeof Math.random
  '%Math.round%': typeof Math.round
  '%Math.sign%': typeof Math.sign
  '%Math.sin%': typeof Math.sin
  '%Math.sqrt%': typeof Math.sqrt
  '%Math.tan%': typeof Math.tan
  '%Math.trunc%': typeof Math.trunc
  '%Number%': typeof Number
  '%Number.prototype%': Number
  '%NumberPrototype%': Number
  '%Object%': typeof Object
  '%Object.assign%': typeof Object.assign
  '%Object.create%': typeof Object.create
  '%Object.defineProperties%': typeof Object.defineProperties
  '%Object.defineProperty%': typeof Object.defineProperty
  '%Object.entries%': typeof Object.entries
  '%Object.freeze%': typeof Object.freeze
  '%Object.getOwnPropertyDescriptor%': typeof Object.getOwnPropertyDescriptor
  '%Object.getOwnPropertyDescriptors%': typeof Object.getOwnPropertyDescriptors
  '%Object.getOwnPropertyNames%': typeof Object.getOwnPropertyNames
  '%Object.getOwnPropertySymbols%': typeof Object.getOwnPropertySymbols
  '%Object.getPrototypeOf%': typeof Object.getPrototypeOf
  '%Object.is%': typeof Object.is
  '%Object.isExtensible%': typeof Object.isExtensible
  '%Object.isFrozen%': typeof Object.isFrozen
  '%Object.isSealed%': typeof Object.isSealed
  '%Object.keys%': typeof Object.keys
  '%Object.preventExtensions%': typeof Object.preventExtensions
  '%Object.prototype%': Object
  '%Object.prototype.hasOwnProperty%': typeof Object.prototype.hasOwnProperty
  '%Object.prototype.isPrototypeOf%': typeof Object.prototype.isPrototypeOf
  '%Object.prototype.propertyIsEnumerable%': typeof Object.prototype.propertyIsEnumerable
  '%Object.prototype.toString%': typeof Object.prototype.toString
  '%Object.prototype.valueOf%': typeof Object.prototype.valueOf
  '%Object.seal%': typeof Object.seal
  '%Object.setPrototypeOf%': typeof Object.setPrototypeOf
  '%Object.values%': typeof Object.values
  '%ObjectPrototype%': Object
  '%Promise%': typeof Promise
  '%Promise.all%': typeof Promise.all
  '%Promise.allSettled%': typeof Promise.allSettled
  '%Promise.any%': typeof Promise.any
  '%Promise.prototype%': Promise<any>
  '%Promise.prototype.catch%': typeof Promise.prototype.catch
  '%Promise.prototype.finally%': typeof Promise.prototype.finally
  '%Promise.prototype.then%': typeof Promise.prototype.then
  '%Promise.race%': typeof Promise.race
  '%Promise.reject%': typeof Promise.reject
  '%Promise.resolve%': typeof Promise.resolve
  '%PromiseProto_then%': typeof Promise.prototype.then
  '%PromisePrototype%': Promise<any>
  '%Promise_all%': typeof Promise.all
  '%Promise_reject%': typeof Promise.reject
  '%Promise_resolve%': typeof Promise.resolve
  '%Proxy%': typeof Proxy
  '%RangeError%': typeof RangeError
  '%RangeErrorPrototype%': RangeError
  '%ReferenceError%': typeof ReferenceError
  '%ReferenceErrorPrototype%': ReferenceError
  '%Reflect%': typeof Reflect
  '%Reflect.getPrototypeOf%': typeof Reflect.getPrototypeOf
  '%RegExp%': typeof RegExp
  '%RegExp.prototype%': RegExp
  '%RegExpPrototype%': RegExp
  '%Set%': typeof Set
  '%Set.prototype%': Set<any>
  '%SetPrototype%': Set<any>
  '%SharedArrayBuffer%': typeof SharedArrayBuffer
  '%SharedArrayBufferPrototype%': SharedArrayBuffer
  '%String%': typeof String
  '%String.prototype%': String
  '%String.prototype.charAt%': typeof String.prototype.charAt
  '%String.prototype.charCodeAt%': typeof String.prototype.charCodeAt
  '%String.prototype.concat%': typeof String.prototype.concat
  '%String.prototype.endsWith%': typeof String.prototype.endsWith
  '%String.prototype.includes%': typeof String.prototype.includes
  '%String.prototype.indexOf%': typeof String.prototype.indexOf
  '%String.prototype.lastIndexOf%': typeof String.prototype.lastIndexOf
  '%String.prototype.match%': typeof String.prototype.match
  '%String.prototype.padEnd%': typeof String.prototype.padEnd
  '%String.prototype.padStart%': typeof String.prototype.padStart
  '%String.prototype.repeat%': typeof String.prototype.repeat
  '%String.prototype.replace%': typeof String.prototype.replace
  '%String.prototype.search%': typeof String.prototype.search
  '%String.prototype.slice%': typeof String.prototype.slice
  '%String.prototype.split%': typeof String.prototype.split
  '%String.prototype.startsWith%': typeof String.prototype.startsWith
  '%String.prototype.substring%': typeof String.prototype.substring
  '%String.prototype.toLowerCase%': typeof String.prototype.toLowerCase
  '%String.prototype.toUpperCase%': typeof String.prototype.toUpperCase
  '%String.prototype.trim%': typeof String.prototype.trim
  '%String.prototype.substr%': typeof String.prototype.substr
  '%StringPrototype%': String
  '%Symbol%': typeof Symbol
  '%Symbol.prototype%': Symbol
  '%SymbolPrototype%': Symbol
  '%SyntaxError%': typeof SyntaxError
  '%SyntaxErrorPrototype%': SyntaxError
  '%TypeError%': typeof TypeError
  '%TypeErrorPrototype%': TypeError
  '%URIError%': typeof URIError
  '%URIErrorPrototype%': URIError
  '%Uint16Array%': typeof Uint16Array
  '%Uint16ArrayPrototype%': Uint16Array
  '%Uint32Array%': typeof Uint32Array
  '%Uint32ArrayPrototype%': Uint32Array
  '%Uint8Array%': typeof Uint8Array
  '%Uint8ArrayPrototype%': Uint8Array
  '%Uint8ClampedArray%': typeof Uint8ClampedArray
  '%Uint8ClampedArrayPrototype%': Uint8ClampedArray
  '%WeakMap%': typeof WeakMap
  '%WeakMapPrototype%': WeakMap<any, any>
  '%WeakRef%': typeof WeakRef
  '%WeakSet%': typeof WeakSet
  '%WeakSetPrototype%': WeakSet<any>
  '%decodeURI%': typeof decodeURI
  '%decodeURIComponent%': typeof decodeURIComponent
  '%encodeURI%': typeof encodeURI
  '%encodeURIComponent%': typeof encodeURIComponent
  '%eval%': typeof eval
  '%isFinite%': typeof isFinite
  '%isNaN%': typeof isNaN
  '%parseFloat%': typeof parseFloat
  '%parseInt%': typeof parseInt
  
  // Aliases without % delimiters
  'AggregateError': typeof AggregateError
  'Array': typeof Array
  'Array.prototype': Array<any>
  'Array.prototype.concat': typeof Array.prototype.concat
  'Array.prototype.entries': typeof Array.prototype.entries
  'Array.prototype.every': typeof Array.prototype.every
  'Array.prototype.filter': typeof Array.prototype.filter
  'Array.prototype.find': typeof Array.prototype.find
  'Array.prototype.findIndex': typeof Array.prototype.findIndex
  'Array.prototype.forEach': typeof Array.prototype.forEach
  'Array.prototype.includes': typeof Array.prototype.includes
  'Array.prototype.indexOf': typeof Array.prototype.indexOf
  'Array.prototype.join': typeof Array.prototype.join
  'Array.prototype.keys': typeof Array.prototype.keys
  'Array.prototype.lastIndexOf': typeof Array.prototype.lastIndexOf
  'Array.prototype.map': typeof Array.prototype.map
  'Array.prototype.pop': typeof Array.prototype.pop
  'Array.prototype.push': typeof Array.prototype.push
  'Array.prototype.reduce': typeof Array.prototype.reduce
  'Array.prototype.reduceRight': typeof Array.prototype.reduceRight
  'Array.prototype.reverse': typeof Array.prototype.reverse
  'Array.prototype.shift': typeof Array.prototype.shift
  'Array.prototype.slice': typeof Array.prototype.slice
  'Array.prototype.some': typeof Array.prototype.some
  'Array.prototype.sort': typeof Array.prototype.sort
  'Array.prototype.splice': typeof Array.prototype.splice
  'Array.prototype.unshift': typeof Array.prototype.unshift
  'Array.prototype.values': typeof Array.prototype.values
  'ArrayBuffer': typeof ArrayBuffer
  'Boolean': typeof Boolean
  'Boolean.prototype': Boolean
  'DataView': typeof DataView
  'Date': typeof Date
  'Date.prototype': Date
  'Error': typeof Error
  'Error.prototype': Error
  'EvalError': typeof EvalError
  'Function': typeof Function
  'Function.prototype': Function
  'Function.prototype.apply': typeof Function.prototype.apply
  'Function.prototype.bind': typeof Function.prototype.bind
  'Function.prototype.call': typeof Function.prototype.call
  'JSON': typeof JSON
  'JSON.parse': typeof JSON.parse
  'JSON.stringify': typeof JSON.stringify
  'Map': typeof Map
  'Map.prototype': Map<any, any>
  'Math': typeof Math
  'Math.abs': typeof Math.abs
  'Math.acos': typeof Math.acos
  'Math.asin': typeof Math.asin
  'Math.atan': typeof Math.atan
  'Math.atan2': typeof Math.atan2
  'Math.ceil': typeof Math.ceil
  'Math.cos': typeof Math.cos
  'Math.exp': typeof Math.exp
  'Math.floor': typeof Math.floor
  'Math.log': typeof Math.log
  'Math.max': typeof Math.max
  'Math.min': typeof Math.min
  'Math.pow': typeof Math.pow
  'Math.random': typeof Math.random
  'Math.round': typeof Math.round
  'Math.sign': typeof Math.sign
  'Math.sin': typeof Math.sin
  'Math.sqrt': typeof Math.sqrt
  'Math.tan': typeof Math.tan
  'Math.trunc': typeof Math.trunc
  'Number': typeof Number
  'Number.prototype': Number
  'Object': typeof Object
  'Object.assign': typeof Object.assign
  'Object.create': typeof Object.create
  'Object.defineProperties': typeof Object.defineProperties
  'Object.defineProperty': typeof Object.defineProperty
  'Object.entries': typeof Object.entries
  'Object.freeze': typeof Object.freeze
  'Object.getOwnPropertyDescriptor': typeof Object.getOwnPropertyDescriptor
  'Object.getOwnPropertyDescriptors': typeof Object.getOwnPropertyDescriptors
  'Object.getOwnPropertyNames': typeof Object.getOwnPropertyNames
  'Object.getOwnPropertySymbols': typeof Object.getOwnPropertySymbols
  'Object.getPrototypeOf': typeof Object.getPrototypeOf
  'Object.is': typeof Object.is
  'Object.isExtensible': typeof Object.isExtensible
  'Object.isFrozen': typeof Object.isFrozen
  'Object.isSealed': typeof Object.isSealed
  'Object.keys': typeof Object.keys
  'Object.preventExtensions': typeof Object.preventExtensions
  'Object.prototype': Object
  'Object.prototype.hasOwnProperty': typeof Object.prototype.hasOwnProperty
  'Object.prototype.isPrototypeOf': typeof Object.prototype.isPrototypeOf
  'Object.prototype.propertyIsEnumerable': typeof Object.prototype.propertyIsEnumerable
  'Object.prototype.toString': typeof Object.prototype.toString
  'Object.prototype.valueOf': typeof Object.prototype.valueOf
  'Object.seal': typeof Object.seal
  'Object.setPrototypeOf': typeof Object.setPrototypeOf
  'Object.values': typeof Object.values
  'Promise': typeof Promise
  'Promise.all': typeof Promise.all
  'Promise.allSettled': typeof Promise.allSettled
  'Promise.any': typeof Promise.any
  'Promise.prototype': Promise<any>
  'Promise.prototype.catch': typeof Promise.prototype.catch
  'Promise.prototype.finally': typeof Promise.prototype.finally
  'Promise.prototype.then': typeof Promise.prototype.then
  'Promise.race': typeof Promise.race
  'Promise.reject': typeof Promise.reject
  'Promise.resolve': typeof Promise.resolve
  'Proxy': typeof Proxy
  'RangeError': typeof RangeError
  'ReferenceError': typeof ReferenceError
  'Reflect': typeof Reflect
  'Reflect.getPrototypeOf': typeof Reflect.getPrototypeOf
  'RegExp': typeof RegExp
  'RegExp.prototype': RegExp
  'Set': typeof Set
  'Set.prototype': Set<any>
  'SharedArrayBuffer': typeof SharedArrayBuffer
  'String': typeof String
  'String.prototype': String
  'String.prototype.charAt': typeof String.prototype.charAt
  'String.prototype.charCodeAt': typeof String.prototype.charCodeAt
  'String.prototype.concat': typeof String.prototype.concat
  'String.prototype.endsWith': typeof String.prototype.endsWith
  'String.prototype.includes': typeof String.prototype.includes
  'String.prototype.indexOf': typeof String.prototype.indexOf
  'String.prototype.lastIndexOf': typeof String.prototype.lastIndexOf
  'String.prototype.match': typeof String.prototype.match
  'String.prototype.padEnd': typeof String.prototype.padEnd
  'String.prototype.padStart': typeof String.prototype.padStart
  'String.prototype.repeat': typeof String.prototype.repeat
  'String.prototype.replace': typeof String.prototype.replace
  'String.prototype.search': typeof String.prototype.search
  'String.prototype.slice': typeof String.prototype.slice
  'String.prototype.split': typeof String.prototype.split
  'String.prototype.startsWith': typeof String.prototype.startsWith
  'String.prototype.substring': typeof String.prototype.substring
  'String.prototype.toLowerCase': typeof String.prototype.toLowerCase
  'String.prototype.toUpperCase': typeof String.prototype.toUpperCase
  'String.prototype.trim': typeof String.prototype.trim
  'String.prototype.substr': typeof String.prototype.substr
  'Symbol': typeof Symbol
  'Symbol.prototype': Symbol
  'SyntaxError': typeof SyntaxError
  'TypeError': typeof TypeError
  'URIError': typeof URIError
  'Uint8Array': typeof Uint8Array
  'Uint16Array': typeof Uint16Array
  'Uint32Array': typeof Uint32Array
  'Uint8ClampedArray': typeof Uint8ClampedArray
  'WeakMap': typeof WeakMap
  'WeakRef': typeof WeakRef
  'WeakSet': typeof WeakSet
  'decodeURI': typeof decodeURI
  'decodeURIComponent': typeof decodeURIComponent
  'encodeURI': typeof encodeURI
  'encodeURIComponent': typeof encodeURIComponent
  'eval': typeof eval
  'isFinite': typeof isFinite
  'isNaN': typeof isNaN
  'parseFloat': typeof parseFloat
  'parseInt': typeof parseInt
}

type IntrinsicName = keyof IntrinsicTypeMap

/**
 * Get a cached JavaScript intrinsic value by name with full type inference.
 *
 * Intrinsics are retrieved from a cache that is populated at module load time,
 * ensuring you get pristine versions of built-in JavaScript objects and functions
 * before they can be modified by other code.
 *
 * @param name - The intrinsic name, with or without % delimiters (e.g., 'Math.pow' or '%Math.pow%')
 * @param allowMissing - If false (default), throws when intrinsic doesn't exist. If true, returns undefined.
 * @returns The cached intrinsic value with proper type inference
 *
 * @throws {TypeError} If `name` is not a non-empty string
 * @throws {TypeError} If `allowMissing` is provided but is not a boolean
 * @throws {SyntaxError} If `name` has invalid syntax (e.g., mismatched % delimiters)
 * @throws {TypeError} If the intrinsic exists but is not available in the current environment and `allowMissing` is false
 * @throws {SyntaxError} If the intrinsic name does not exist
 *
 * @example
 * // Get Math.pow with full type inference
 * const $pow = GetIntrinsic('%Math.pow%');
 * const result = $pow(2, 3); // TypeScript knows this returns number
 *
 * @example
 * // Get Array.prototype.push
 * const $push = GetIntrinsic('%Array.prototype.push%');
 * const arr = [1, 2, 3];
 * $push.call(arr, 4); // arr is now [1, 2, 3, 4]
 *
 * @example
 * // Get Object.create
 * const $create = GetIntrinsic('%Object.create%');
 * const obj = $create(null); // Object with no prototype
 */
declare function GetIntrinsic<K extends IntrinsicName>(
  name: K,
  allowMissing?: false
): IntrinsicTypeMap[K]

/**
 * Get a cached JavaScript intrinsic value by name, returning undefined if not available.
 *
 * @param name - The intrinsic name, with or without % delimiters
 * @param allowMissing - Must be true to use this overload
 * @returns The cached intrinsic value with proper type, or undefined if not available
 *
 * @example
 * const $asyncGen = GetIntrinsic('%AsyncGeneratorFunction%', true);
 * // $asyncGen may be undefined in older environments
 */
declare function GetIntrinsic<K extends IntrinsicName>(
  name: K,
  allowMissing: true
): IntrinsicTypeMap[K] | undefined

export = GetIntrinsic