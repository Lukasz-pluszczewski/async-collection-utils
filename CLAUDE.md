# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run build` - Build library with tsup (outputs to dist/)
- `npm test` - Run all tests with type checking and coverage
- `npm run test-single src/asyncMap.test.ts` - Run specific test file in watch mode

## Architecture

This library provides async and sync collection manipulation functions (map, filter, reduce, flatMap, forEach) that work with multiple data types:

- **Input types**: Arrays, Sets, Maps, plain Objects, TypedArrays, Iterables, AsyncIterables
- **Output behavior**: Functions preserve input type (map on Set returns Set). Use `*ToArray` variants to always get arrays.

### Control Flow
- `Break` - Symbol to stop iteration early without including current value
- `Last(value)` - Wrapper to stop iteration and include the wrapped value

### Code Organization
- `src/shared.ts` - Break/Last symbols, type definitions (ObjectKey, TypedArray), helper functions (entries, keys, isPlainObject)
- Each function is in its own file with corresponding `*.test.ts` (unit) and `*.test-d.ts` (type tests)

### Pattern: Polymorphic Overloads
Functions use multiple TypeScript overloads for type-safe handling of different inputs. Implementation checks input type at runtime (Array.isArray, instanceof Set/Map, isPlainObject, etc.).
