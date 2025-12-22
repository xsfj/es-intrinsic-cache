# es-intrinsic-cache

> Get and robustly cache all JavaScript language-level intrinsics at first require time

[![npm version](https://img.shields.io/npm/v/es-intrinsic-cache.svg)](https://www.npmjs.com/package/es-intrinsic-cache)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## What is this?

`es-intrinsic-cache` provides safe, cached access to JavaScript's built-in objects and functions (intrinsics) before they can be modified by other code. This is essential for building robust libraries that need to rely on pristine versions of native JavaScript functionality.

## Why would you need this?

JavaScript allows modification of built-in prototypes and globals, which can break your code:

```javascript
// Malicious or buggy code could do this:
Array.prototype.push = function() { 
  console.log("hacked") 
}

// Now normal array operations break:
const arr = [1, 2, 3]
arr.push(4) // Logs "hacked" instead of working correctly
console.log(arr) // Logs [1,2,3] - nothing actually modified
```

`es-intrinsic-cache` solves this by caching the original intrinsics when your module first loads:

```javascript
const GetIntrinsic = require("es-intrinsic-cache")

// Hack the Array.prototype.push
Array.prototype.push = function() { 
  console.log("hacked") 
}

// Get the REAL Array.prototype.push, cached at module load time
const $push = GetIntrinsic("%Array.prototype.push%")

// This always works, even if Array.prototype.push was modified
const arr = [1, 2, 3]
$push.call(arr, 4) // ✅ Works correctly
console.log(arr) // Logs [1, 2, 3, 4]
```

## Installation

Using NPM:
```bash
npm install es-intrinsic-cache
```

Using Yarn:
```bash
yarn add es-intrinsic-cache
```

Using PNPM:
```bash
pnpm add es-intrinsic-cache
```

Using Bun:
```bash
bun add es-intrinsic-cache
```

## Usage

```javascript
const GetIntrinsic = require("es-intrinsic-cache")

// Access intrinsics with % wrapper syntax
const ArrayProto = GetIntrinsic("%Array.prototype%")
const ObjectCreate = GetIntrinsic("%Object.create%")
const JSONParse = GetIntrinsic("%JSON.parse%")

// Or without % wrappers (they're optional)
const Array = GetIntrinsic("Array")
const push = GetIntrinsic("Array.prototype.push")
```

### Accessor Properties

For accessor properties (getters/setters), `GetIntrinsic` returns the getter function. (**Note**: If a getter is emulating a data property (indicated by an `originalValue` property on the getter), the actual value is returned instead.)

Example:

```javascript
const GetIntrinsic = require("es-intrinsic-cache")

// Get the getter for Map.prototype.size
const $mapSize = GetIntrinsic("%Map.prototype.size%")

const myMap = new Map([["a", 1], ["b", 2]])
console.log($mapSize.call(myMap)) // 2
```

### `allowMissing` parameter

Some intrinsics may not exist in all environments. Use the second parameter to avoid errors. This also applies to nested properties: if the base intrinsic exists but the requested property does not, it returns undefined instead of throwing.

```javascript
const GetIntrinsic = require("es-intrinsic-cache")

// Throws TypeError if AsyncGeneratorPrototype doesn't exist
const AsyncGenProto = GetIntrinsic("%AsyncGeneratorPrototype%")

// Returns undefined if AsyncGeneratorPrototype doesn't exist
const AsyncGenProto = GetIntrinsic("%AsyncGeneratorPrototype%", true)
```

## ⚠️ Important Note: Load Order Matters

**`es-intrinsic-cache` must be loaded as early as possible in your application**, ideally before any other code runs. If other code modifies built-ins before `es-intrinsic-cache` is loaded, those modifications will be cached.

```javascript
// ✅ GOOD - Load es-intrinsic-cache first
const GetIntrinsic = require("es-intrinsic-cache")
// ... rest of your application

// ❌ BAD - Other code runs first
require("some-library-that-modifies-prototypes")
const GetIntrinsic = require("es-intrinsic-cache") // Too late!
```

## Available Intrinsics

See the full list of available intrinsics that you can cache with `es-intrinsic-cache` in the TypeScript definitions (`index.d.ts`).

## API

### `GetIntrinsic(name, [allowMissing])`

**Parameters:**
- `name` (string, required): The name of the intrinsic to retrieve. Can be wrapped in `%` or not.
- `allowMissing` (boolean, optional): If `true`, returns `undefined` for missing intrinsics instead of throwing. Default: `false`

**Returns:** The requested intrinsic value.

**Throws:**
- `TypeError` if `name` is not a non-empty string.
- `TypeError` if `allowMissing` is not a boolean.
- `SyntaxError` if `%` appears in the middle of the name (e.g., `%Array%.push`).
- `SyntaxError` if quoted property paths have mismatched or invalid quotes.
- `TypeError` if the intrinsic (or a base property) is missing/unavailable (unless `allowMissing` is true).


## Common Use Case

```javascript
const GetIntrinsic = require("es-intrinsic-cache")

const susLibrary = require("sus-library") // library that we're not sure about that might replace an intrinsic

const $JSONParse = GetIntrinsic("%JSON.parse%")
const $ObjectKeys = GetIntrinsic("%Object.keys%")

function safeJSONParse(str) {
  // Always uses pristine JSON.parse, even if JSON.parse was replaced
  return $JSONParse(str)
}
```

## Why `es-intrinsic-cache` instead of `get-intrinsic`?

`es-intrinsic-cache` is a modernized refactor of `get-intrinsic` that maintains **100% API compatibility** while improving internal clarity, dependency focus, and developer experience. Both libraries cache JavaScript intrinsics to protect against prototype pollution, but they differ in implementation philosophy.

### Key Advantages

- **Cleaner internals** 🧹  
  Removes the legacy `needsEval` / `doEval` mechanism and initializes intrinsics explicitly at module load time. This results in simpler, more readable code with less state-machine complexity.

- **Complete TypeScript definitions** 🧠  
  Includes **240+ fully typed intrinsics**, covering missing entries from `@types/get-intrinsic` (such as `%Float16Array%`, `%FinalizationRegistry%`, `%WeakRef%`, and legacy aliases). Types are auto-generated and always stay in sync with the implementation.

- **Comprehensive JSDoc documentation** 📚  
  Provides detailed JSDoc comments with parameter descriptions, edge cases, and examples, enabling better IDE hover docs and easier contributor onboarding.

- **Smaller, more focused dependencies** 📦  
  Uses single-responsibility helper modules instead of multi-purpose utilities, reducing unused code and dependency surface area.

- **Identical public API** 🔁  
  Fully compatible with `get-intrinsic`, including the same function signature, intrinsic naming syntax, legacy aliases, error handling, and edge-case protections.

### Performance

The performance difference is negligible in real-world usage. `es-intrinsic-cache` trades a tiny upfront initialization cost for simpler logic and slightly faster lookups, while `get-intrinsic` defers some computation until first access.

### When to Choose Which

**Choose `es-intrinsic-cache` if:**
- You want complete TypeScript coverage and full IDE autocomplete
- You value comprehensive documentation and cleaner internals
- You prefer explicit initialization over lazy evaluation
- You are starting new projects or libraries

**Choose `get-intrinsic` if:**
- You need the widely adopted, long-established ecosystem standard
- You are maintaining existing code that already depends on it
- Maximum ecosystem familiarity is your top priority

📄 **Full technical comparison:**  
See [COMPARISON.md](https://github.com/xsfj/es-intrinsic-cache/blob/main/COMPARISON.md) for an in-depth breakdown of design decisions, internal differences, and performance details.

**Summary:**  
`es-intrinsic-cache` offers the same robustness as `get-intrinsic` with improved developer experience, clearer internals, and more complete typing—while remaining a drop-in replacement.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for any new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT © Fox Jones
See license in [LICENSE](https://github.com/xsfj/es-intrinsic-cache/blob/main/LICENSE) (or don't, because it's just your regular MIT license)

## Support

- 🐛 [Report bugs](https://github.com/xsfj/es-intrinsic-cache/issues)
- 💡 [Request features](https://github.com/xsfj/es-intrinsic-cache/issues)

---

**Remember**: Load `es-intrinsic-cache` early in your application to ensure you get pristine intrinsics! 🛡️