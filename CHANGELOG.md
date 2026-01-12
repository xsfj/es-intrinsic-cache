# Changelog

All notable changes to `es-intrinsic-cache` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 1/1/2/2026
### Changed
- TypeScript definitions to be better

## [1.0.1] - 12/22/2025

### Changed
- Rewrote `README.md` for clarity and improved documentation.

### Added
- Added `COMPARISON.md` to compare `get-intrinsic` vs `es-intrinsic-cache`.
- Added `CHANGELOG.md` to track releases and improvements.
- Added `SECURITY.md` with guidelines for reporting vulnerabilities.

## [1.0.0] - 12/21/2025

### Added
- Initial release of `es-intrinsic-cache`.
- Caches all JavaScript built-in objects and functions (intrinsics) at module load time.
- Full support for legacy intrinsic aliases (e.g., `%ArrayPrototype%`).
- Optional `%` delimiters in intrinsic names.
- `allowMissing` parameter for safely handling unavailable intrinsics.
- Comprehensive TypeScript definitions for 240+ intrinsics.
- Complete JSDoc documentation with usage examples.
