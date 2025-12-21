# es-intrinsic-cache

Cache JavaScript intrinsics (built-in objects and methods) at module load time.
This ensures you can access the original, unmodified intrinsics even if globals or prototypes are later patched.

> Note: This provides consistency, not a security boundary. Code that runs before this module can still modify built-ins.

---

## Installation

```bash
npm install es-intrinsic-cache
```

---

## Usage

```javascript
const GetIntrinsic = require("es-intrinsic-cache")

// Access intrinsic methods or constructors
const $push = GetIntrinsic("%Array.prototype.push%")
const $isArray = GetIntrinsic("%Array.isArray%")

const arr = [1, 2]
$push.call(arr, 3)       // [1, 2, 3]
$isArray(arr)            // true

// Optional: no % symbols needed
const JSONParse = GetIntrinsic("JSON.parse")
```

### Accessor Properties

For getters/setters, the getter function is returned:

```javascript
const $mapSize = GetIntrinsic("%Map.prototype.size%")
const myMap = new Map([["a", 1]])
console.log($mapSize.call(myMap)) // 1
```

### Missing Intrinsics

Some intrinsics may not exist in all environments. Use the second parameter to avoid errors:

```javascript
const AsyncGenProto = GetIntrinsic("%AsyncGeneratorPrototype%", true)
console.log(AsyncGenProto) // undefined if not supported
```

---

## API

### `GetIntrinsic(name: string, allowMissing?: boolean): any`

* `name` — intrinsic name (string), with optional `%` wrappers
* `allowMissing` — if true, returns `undefined` instead of throwing

Throws a `TypeError` if the name is invalid, or a `SyntaxError` if the syntax is malformed, unless `allowMissing` is true.

---

## Notes

* **Load early:** To get pristine intrinsics, require this module before any code that might patch built-ins.
* **Not a security measure:** Only provides consistency; malicious code running first can modify the cached intrinsics.
* **Receiver objects matter:** Cached methods operate on the object you call them with.

---

## TypeScript Support

Complete TypeScript definitions are included, covering 240+ intrinsics.

```typescript
import GetIntrinsic from "es-intrinsic-cache"
const $push: (...args: any[]) => number = GetIntrinsic("%Array.prototype.push%")
```

---

## Comparison with `get-intrinsic`

* `es-intrinsic-cache` eagerly caches intrinsics at load time.
* Provides complete TypeScript definitions (240+ intrinsics) and full JSDoc documentation.
* Uses fewer dependencies and simpler internal code.
* API-compatible with `get-intrinsic`.

`get-intrinsic` maintains the same backward compatibility, but some intrinsics are missing from its type definitions and it does not include JSDoc documentation.

---

## Testing and Linting

* **Tests:** Run with [Tape](https://www.npmjs.com/package/tape)

```bash
npm test
```

* **Linting:** Uses [Biome](https://biomejs.dev/)

```bash
npm run lint
```

---

## License

MIT © Fox Jones
