"use strict"

var undefined

var $Object = require("es-object-atoms")

var $Error = require("es-error-intrinsics/Error")
var $EvalError = require("es-error-intrinsics/EvalError")
var $RangeError = require("es-error-intrinsics/RangeError")
var $ReferenceError = require("es-error-intrinsics/ReferenceError")
var $SyntaxError = require("es-error-intrinsics/SyntaxError")
var $TypeError = require("es-error-intrinsics/TypeError")
var $URIError = require("es-error-intrinsics/URIError")

var abs = require("math-intrinsics/abs")
var floor = require("math-intrinsics/floor")
var max = require("math-intrinsics/max")
var min = require("math-intrinsics/min")
var pow = require("math-intrinsics/pow")
var round = require("math-intrinsics/round")
var sign = require("math-intrinsics/sign")

var gOPD = require("gopd")
var defineProperty = require("es-define-property")

/**
 * Helper function that always throws a TypeError.
 * Used as a fallback when the intrinsic %ThrowTypeError% cannot be obtained.
 * @private
 * @throws {TypeError} Always throws
 */
var throwTypeError = function () {
  throw new $TypeError()
}

/**
 * The intrinsic %ThrowTypeError% function.
 *
 * In strict mode, this is the function that throws TypeError when accessing
 * forbidden properties like arguments.caller or arguments.callee.
 *
 * This implementation handles multiple environment quirks:
 * - IE 8 does not throw on arguments.callee access
 * - IE 8 throws when calling Object.getOwnPropertyDescriptor on arguments
 * - Modern environments return the getter from arguments.callee descriptor
 *
 * @private
 * @type {Function}
 */
var ThrowTypeError = (function () {
  if (gOPD) {
    return (function () {
      try {
        arguments.callee // IE 8 does not throw here
        return throwTypeError
      } catch {
        try {
          // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, "")
          return gOPD(arguments, "callee").get
        } catch {
          return throwTypeError
        }
      }
    })()
  } else {
    return throwTypeError
  }
})()

var hasSymbols = require("has-symbol-support-x")

var getProto = require("get-proto")
var ObjectGPO = require("get-proto/Object.getPrototypeOf")
var ReflectGPO = require("get-proto/Reflect.getPrototypeOf")

var $apply = require("function.apply-x")
var $call = require("function.call-x")

var TypedArray = (function () {
  if (typeof Uint8Array === "undefined" || !getProto) {
    return undefined
  } else {
    return getProto(Uint8Array)
  }
})()

var getAsyncFunctionConstructor = require("async-function")
var getGeneratorFunctionConstructor = require("generator-function")
var getAsyncGeneratorFunctionConstructor = require("async-generator-function")

/**
 * Gets the intrinsic %AsyncGenerator% (AsyncGeneratorFunction.prototype).
 * @private
 * @returns {Object|undefined} The AsyncGenerator prototype or undefined if not available
 */
var getAsyncGeneratorIntrinsic = function () {
  var gen = getAsyncGeneratorFunctionConstructor() || undefined
  if (gen) {
    return gen.prototype
  } else {
    return gen
  }
}

/**
 * Gets the intrinsic %AsyncIteratorPrototype%.
 * This is the prototype of AsyncGenerator.prototype.
 * @private
 * @returns {Object|undefined} The AsyncIteratorPrototype or undefined if not available
 */
var getAsyncIteratorPrototype = function () {
  var gen = getAsyncGeneratorIntrinsic()
  if (gen && getProto) {
    return getProto(gen.prototype)
  } else {
    return gen
  }
}

var INTRINSICS = {
  __proto__: null,
  "%AggregateError%":
    typeof AggregateError === "undefined" ? undefined : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined : ArrayBuffer,
  "%ArrayIteratorPrototype%":
    hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
  "%AsyncFromSyncIteratorPrototype%": undefined,
  "%AsyncFunction%": getAsyncFunctionConstructor() || undefined,
  "%AsyncGenerator%": getAsyncGeneratorIntrinsic() || undefined,
  "%AsyncGeneratorFunction%": getAsyncGeneratorFunctionConstructor(),
  "%AsyncIteratorPrototype%": getAsyncIteratorPrototype(),
  "%Atomics%": typeof Atomics === "undefined" ? undefined : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined : BigInt,
  "%BigInt64Array%":
    typeof BigInt64Array === "undefined" ? undefined : BigInt64Array,
  "%BigUint64Array%":
    typeof BigUint64Array === "undefined" ? undefined : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": $Error,
  // biome-ignore lint/security/noGlobalEval: eval is an intrinsic, we must cache it
  "%eval%": eval,
  "%EvalError%": $EvalError,
  "%Float16Array%":
    typeof Float16Array === "undefined" ? undefined : Float16Array,
  "%Float32Array%":
    typeof Float32Array === "undefined" ? undefined : Float32Array,
  "%Float64Array%":
    typeof Float64Array === "undefined" ? undefined : Float64Array,
  "%FinalizationRegistry%":
    typeof FinalizationRegistry === "undefined"
      ? undefined
      : FinalizationRegistry,
  "%Function%": Function,
  "%GeneratorFunction%": getGeneratorFunctionConstructor() || undefined,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined : Int32Array,
  // biome-ignore lint/suspicious/noGlobalIsFinite: isFinite is an intrinsic, we must cache it
  "%isFinite%": isFinite,
  // biome-ignore lint/suspicious/noGlobalIsNan: isNaN is an intrinsic, we must cache it
  "%isNaN%": isNaN,
  "%IteratorPrototype%":
    hasSymbols && getProto
      ? getProto(getProto([][Symbol.iterator]()))
      : undefined,
  "%JSON%": typeof JSON === "object" ? JSON : undefined,
  "%Map%": typeof Map === "undefined" ? undefined : Map,
  "%MapIteratorPrototype%":
    typeof Map === "undefined" || !hasSymbols || !getProto
      ? undefined
      : getProto(new Map()[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": $Object,
  "%Object.getOwnPropertyDescriptor%": gOPD,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined : Proxy,
  "%RangeError%": $RangeError,
  "%ReferenceError%": $ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined : Set,
  "%SetIteratorPrototype%":
    typeof Set === "undefined" || !hasSymbols || !getProto
      ? undefined
      : getProto(new Set()[Symbol.iterator]()),
  "%SharedArrayBuffer%":
    typeof SharedArrayBuffer === "undefined" ? undefined : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%":
    hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined,
  "%Symbol%": hasSymbols ? Symbol : undefined,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined : Uint8Array,
  "%Uint8ClampedArray%":
    typeof Uint8ClampedArray === "undefined" ? undefined : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined : Uint32Array,
  "%URIError%": $URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined : WeakSet,

  "%Function.prototype.call%": $call,
  "%Function.prototype.apply%": $apply,
  "%Object.defineProperty%": defineProperty,
  "%Object.getPrototypeOf%": ObjectGPO,
  "%Math.abs%": abs,
  "%Math.floor%": floor,
  "%Math.max%": max,
  "%Math.min%": min,
  "%Math.pow%": pow,
  "%Math.round%": round,
  "%Math.sign%": sign,
  "%Reflect.getPrototypeOf%": ReflectGPO,
}

try {
  null.error
} catch (error) {
  // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
  var errorProto = getProto(getProto(error))
  INTRINSICS["%Error.prototype%"] = errorProto
}

var LEGACY_ALIASES = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": [
    "AsyncGeneratorFunction",
    "prototype",
    "prototype",
  ],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"],
}

var bind = require("function-bind")
var hasOwn = require("hasown")
var $concat = bind.call($call, Array.prototype.concat)
var $spliceApply = bind.call($apply, Array.prototype.splice)
var $replace = bind.call($call, String.prototype.replace)
var $strSlice = bind.call($call, String.prototype.slice)
var $exec = bind.call($call, RegExp.prototype.exec)

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName =
  /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g

var reEscapeChar =
  /\\(\\)?/g /** Used to match backslashes in property paths. */

/**
 * Parses an intrinsic name string into an array of property path parts.
 * Handles % delimiters, dots, brackets, and quoted strings.
 *
 * @private
 * @param {string} string - The intrinsic name to parse (e.g., '%Array.prototype.push%')
 * @returns {string[]} Array of path parts (e.g., ['Array', 'prototype', 'push'])
 * @throws {SyntaxError} If the string has mismatched % delimiters
 *
 * @example
 * stringToPath('%Array.prototype.push%')
 * // Returns: ['Array', 'prototype', 'push']
 */

var stringToPath = function stringToPath(string) {
  var first = $strSlice(string, 0, 1)
  var last = $strSlice(string, -1)
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`")
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`")
  }
  var result = []
  $replace(string, rePropName, function (match, number, quote, subString) {
    result[result.length] = quote
      ? $replace(subString, reEscapeChar, "$1")
      : number || match
  })
  return result
}
/* end adaptation */

/**
 * Retrieves a base intrinsic from the INTRINSICS cache, handling legacy aliases.
 *
 * @private
 * @param {string} name - The intrinsic name (e.g., '%Array%' or '%ArrayPrototype%')
 * @param {boolean} allowMissing - Whether to return undefined instead of throwing for missing intrinsics
 * @returns {{alias: string[]|undefined, name: string, value: *}} Object containing alias info, canonical name, and value
 * @throws {SyntaxError} If the intrinsic does not exist
 * @throws {TypeError} If the intrinsic exists but is unavailable and allowMissing is false
 */
var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  var intrinsicName = name
  var alias
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName]
    intrinsicName = "%" + alias[0] + "%"
  }

  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName]
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError(
        "intrinsic " +
          name +
          " exists, but is not available. Please file an issue!",
      )
    }

    return {
      alias: alias,
      name: intrinsicName,
      value: value,
    }
  }

  throw new $SyntaxError("intrinsic " + name + " does not exist!")
}

/**
 * Get a cached JavaScript intrinsic value by name.
 *
 * Intrinsics are retrieved from a cache populated at module load time,
 * ensuring pristine versions of built-in objects and functions before
 * they can be modified by other code.
 *
 * The % delimiters are optional: both 'Array' and '%Array%' work.
 * Property access uses dots: '%Array.prototype.push%' gets Array.prototype.push.
 *
 * For accessor properties (getters/setters), returns the getter function.
 * Use .call() to invoke: GetIntrinsic('%Map.prototype.size%').call(myMap)
 *
 * @param {string} name - Intrinsic name with optional % delimiters
 * @param {boolean} [allowMissing=false] - Return undefined for missing intrinsics instead of throwing
 * @returns {*} The cached intrinsic value
 *
 * @throws {TypeError} If name is not a non-empty string
 * @throws {TypeError} If allowMissing is provided but not a boolean
 * @throws {SyntaxError} If name has invalid syntax (mismatched %, invalid quotes)
 * @throws {SyntaxError} If the intrinsic name does not exist
 * @throws {TypeError} If intrinsic exists but unavailable in current environment (when allowMissing is false)
 *
 * @example
 * // Basic usage
 * const $push = GetIntrinsic('%Array.prototype.push%');
 * $push.call([1, 2], 3); // [1, 2, 3]
 *
 * @example
 * // Without % delimiters
 * const ArrayProto = GetIntrinsic('Array.prototype');
 *
 * @example
 * // Handling missing intrinsics
 * const $AsyncGen = GetIntrinsic('%AsyncGeneratorFunction%', true);
 * if ($AsyncGen) {
 *   // Use async generator functionality
 * }
 *
 * @example
 * // Accessor properties (getters)
 * const $mapSize = GetIntrinsic('%Map.prototype.size%');
 * const myMap = new Map([['a', 1]]);
 * console.log($mapSize.call(myMap)); // 1
 *
 * @example
 * // Protection from prototype pollution
 * Array.prototype.push = () => console.log('hacked');
 * const $push = GetIntrinsic('%Array.prototype.push%');
 * const arr = [];
 * $push.call(arr, 1); // Works correctly, arr becomes [1]
 */
module.exports = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError("intrinsic name must be a non-empty string")
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError('"allowMissing" argument must be a boolean')
  }

  if ($exec(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError(
      "`%` may not be present anywhere but at the beginning and end of the intrinsic name",
    )
  }
  var parts = stringToPath(name)
  var intrinsicBaseName = parts.length > 0 ? parts[0] : ""

  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing)
  var intrinsicRealName = intrinsic.name
  var value = intrinsic.value
  var skipFurtherCaching = false

  var alias = intrinsic.alias
  if (alias) {
    intrinsicBaseName = alias[0]
    $spliceApply(parts, $concat([0, 1], alias))
  }

  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i]
    var first = $strSlice(part, 0, 1)
    var last = $strSlice(part, -1)
    if (
      (first === '"' ||
        first === "'" ||
        first === "`" ||
        last === '"' ||
        last === "'" ||
        last === "`") &&
      first !== last
    ) {
      throw new $SyntaxError(
        "property names with quotes must have matching quotes",
      )
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true
    }

    intrinsicBaseName += "." + part
    intrinsicRealName = "%" + intrinsicBaseName + "%"

    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName]
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError(
            "base intrinsic for " +
              name +
              " exists, but the property is not available.",
          )
        }
        return undefined
      }
      if (gOPD && i + 1 >= parts.length) {
        var desc = gOPD(value, part)
        isOwn = !!desc

        // By convention, when a data property is converted to an accessor
        // property to emulate a data property that does not suffer from
        // the override mistake, that accessor's getter is marked with
        // an `originalValue` property. Here, when we detect this, we
        // uphold the illusion by pretending to see that original data
        // property, i.e., returning the value rather than the getter
        // itself.
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get
        } else {
          value = value[part]
        }
      } else {
        isOwn = hasOwn(value, part)
        value = value[part]
      }

      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value
      }
    }
  }
  return value
}
