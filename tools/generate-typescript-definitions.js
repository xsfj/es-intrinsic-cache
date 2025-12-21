#!/usr/bin/env node
"use strict"

/**
 * Script to generate complete TypeScript definitions for es-intrinsic-cache
 * Run with: node generate-types.js > index.d.ts
 */

const fs = require("node:fs")
const path = require("node:path")

// Get all intrinsic names from the INTRINSICS object
// We need to extract this from the source since it's not exported
const indexPath = path.join(__dirname, "../index.js")
const source = fs.readFileSync(indexPath, "utf8")

// Extract INTRINSICS object keys
const intrinsicsMatch = source.match(/var INTRINSICS = \{[^}]+\}/s)
const legacyAliasesMatch = source.match(/var LEGACY_ALIASES = \{[^}]+\}/s)

function extractKeys(objectString) {
  const keys = []
  const regex = /["']([^"']+)["']\s*:/g
  let match
  while ((match = regex.exec(objectString)) !== null) {
    if (match[1] !== "__proto__") {
      keys.push(match[1])
    }
  }
  return keys
}

const intrinsicKeys = intrinsicsMatch ? extractKeys(intrinsicsMatch[0]) : []
const legacyKeys = legacyAliasesMatch ? extractKeys(legacyAliasesMatch[0]) : []

// Generate property paths for common intrinsics
const propertyPaths = []
const baseIntrinsics = [
  "Array",
  "Object",
  "String",
  "Number",
  "Boolean",
  "Function",
  "Date",
  "RegExp",
  "Error",
  "Map",
  "Set",
  "Promise",
  "Symbol",
  "Math",
  "JSON",
]

baseIntrinsics.forEach((base) => {
  // Add .prototype variations (but not for Math and JSON - they're not constructors)
  if (base !== "Math" && base !== "JSON") {
    propertyPaths.push(`%${base}.prototype%`)
  }

  // Add common methods
  if (base === "Array") {
    ;[
      "push",
      "pop",
      "shift",
      "unshift",
      "slice",
      "splice",
      "concat",
      "join",
      "reverse",
      "sort",
      "indexOf",
      "lastIndexOf",
      "every",
      "some",
      "forEach",
      "map",
      "filter",
      "reduce",
      "reduceRight",
      "entries",
      "keys",
      "values",
      "find",
      "findIndex",
      "includes",
    ].forEach((method) => {
      propertyPaths.push(`%Array.prototype.${method}%`)
    })
  } else if (base === "Object") {
    ;[
      "toString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
    ].forEach((method) => {
      propertyPaths.push(`%Object.prototype.${method}%`)
    })
    ;[
      "assign",
      "create",
      "defineProperty",
      "defineProperties",
      "entries",
      "freeze",
      "getOwnPropertyDescriptor",
      "getOwnPropertyDescriptors",
      "getOwnPropertyNames",
      "getOwnPropertySymbols",
      "getPrototypeOf",
      "is",
      "isExtensible",
      "isFrozen",
      "isSealed",
      "keys",
      "preventExtensions",
      "seal",
      "setPrototypeOf",
      "values",
    ].forEach((method) => {
      propertyPaths.push(`%Object.${method}%`)
    })
  } else if (base === "Function") {
    ;["call", "apply", "bind"].forEach((method) => {
      propertyPaths.push(`%Function.prototype.${method}%`)
    })
  } else if (base === "String") {
    ;[
      "charAt",
      "charCodeAt",
      "concat",
      "indexOf",
      "lastIndexOf",
      "slice",
      "substring",
      "toLowerCase",
      "toUpperCase",
      "trim",
      "split",
      "replace",
      "match",
      "search",
      "includes",
      "startsWith",
      "endsWith",
      "repeat",
      "padStart",
      "padEnd",
    ].forEach((method) => {
      propertyPaths.push(`%String.prototype.${method}%`)
    })
  } else if (base === "Math") {
    ;[
      "abs",
      "acos",
      "asin",
      "atan",
      "atan2",
      "ceil",
      "cos",
      "exp",
      "floor",
      "log",
      "max",
      "min",
      "pow",
      "random",
      "round",
      "sin",
      "sqrt",
      "tan",
      "sign",
      "trunc",
    ].forEach((method) => {
      propertyPaths.push(`%Math.${method}%`)
    })
  } else if (base === "JSON") {
    propertyPaths.push("%JSON.parse%")
    propertyPaths.push("%JSON.stringify%")
  } else if (base === "Promise") {
    ;["then", "catch", "finally"].forEach((method) => {
      propertyPaths.push(`%Promise.prototype.${method}%`)
    })
    ;["all", "allSettled", "any", "race", "resolve", "reject"].forEach(
      (method) => {
        propertyPaths.push(`%Promise.${method}%`)
      },
    )
  }
})

// Combine all intrinsic names
const intrinsicSet = new Set([
  ...intrinsicKeys,
  ...legacyKeys,
  ...propertyPaths,
])

// Add non-% versions for better autocomplete
intrinsicSet.forEach((name) => {
  if (name.startsWith("%") && name.endsWith("%")) {
    intrinsicSet.add(name.slice(1, -1))
  }
})

const allIntrinsics = [...intrinsicSet].sort()

// Generate TypeScript definition
const typescript = `// Type definitions for es-intrinsic-cache
// Project: https://github.com/xsfj/es-intrinsic-cache

/**
 * Available intrinsic names that can be retrieved.
 * This includes all JavaScript built-in intrinsics, their prototypes,
 * methods, and legacy aliases for compatibility.
 */
type IntrinsicName =
${allIntrinsics.map((name) => `  | '${name}'`).join("\n")}
  | string; // Allow any string for dynamic access

/**
 * Get a cached JavaScript intrinsic value by name.
 * 
 * Intrinsics are retrieved from a cache that is populated at module load time,
 * ensuring you get pristine versions of built-in JavaScript objects and functions
 * before they can be modified by other code.
 * 
 * @param name - The intrinsic name, with or without % delimiters (e.g., 'Array' or '%Array%')
 * @param allowMissing - If false (default), throws when intrinsic doesn't exist. If true, returns undefined.
 * @returns The cached intrinsic value
 * 
 * @throws {TypeError} If \`name\` is not a non-empty string
 * @throws {TypeError} If \`allowMissing\` is provided but is not a boolean
 * @throws {SyntaxError} If \`name\` has invalid syntax (e.g., mismatched % delimiters)
 * @throws {TypeError} If the intrinsic exists but is not available in the current environment and \`allowMissing\` is false
 * @throws {SyntaxError} If the intrinsic name does not exist
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
 * 
 * @example
 * // Safe handling of potentially missing intrinsics
 * const $asyncGen = GetIntrinsic('%AsyncGeneratorFunction%', true);
 * if ($asyncGen) {
 *   // Use async generator functionality
 * }
 * 
 * @example
 * // Protect against prototype pollution
 * Array.prototype.push = function() { console.log('hacked!'); };
 * const $push = GetIntrinsic('%Array.prototype.push%');
 * const arr = [1, 2];
 * $push.call(arr, 3); // Still works correctly, arr is [1, 2, 3]
 */
declare function GetIntrinsic(
  name: IntrinsicName,
  allowMissing?: false
): any;

/**
 * Get a cached JavaScript intrinsic value by name, returning undefined if not available.
 * 
 * @param name - The intrinsic name, with or without % delimiters
 * @param allowMissing - Must be true to use this overload
 * @returns The cached intrinsic value, or undefined if not available
 * 
 * @example
 * const $asyncGen = GetIntrinsic('%AsyncGeneratorFunction%', true);
 * // $asyncGen may be undefined in older environments
 */
declare function GetIntrinsic(
  name: IntrinsicName,
  allowMissing: true
): any | undefined;

export = GetIntrinsic;
`

console.log(typescript)
