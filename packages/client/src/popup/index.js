var bilibiliLiveHimePopup = (function () {
	'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty = _defineProperty;

	function objToString(obj) {
	  switch (typeof obj) {
	    case "undefined":
	        return 'undefined';
	    case "object":
	        let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	        switch (type) {
	            case "null":
	                return 'null';
	            case "array":
	                return '[' + obj.map(key => objToString(key)).join(', ') + ']';
	            case 'object':
	                return '{ ' + Object.keys(obj).map(key => key + ': ' + objToString(obj[key])).join(', ') + ' }';
	            default:
	                try {
	                  return obj.toString();
	                } catch (e) {
	                  return '[Unknown type: ' + type + ']';
	                }
	        }
	    default:
	        return obj.toString();
	  }
	}

	var objToString_1 = objToString;

	function sleep() {
	  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  return new Promise(function (resolve) {
	    return setTimeout(resolve, ms);
	  });
	}
	function query(el) {
	  var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	  return doc.querySelector(el);
	}
	function getActiveTab() {
	  return new Promise(function (resolve) {
	    chrome.tabs.query({
	      active: true,
	      currentWindow: true
	    }, function (tabs) {
	      resolve(tabs[0]);
	    });
	  });
	}
	function setStorage(key, value) {
	  return new Promise(function (resolve) {
	    chrome.storage.local.set(defineProperty({}, key, value), function () {
	      resolve(value);
	    });
	  });
	}
	function getStorage(key, defaultValue) {
	  return new Promise(function (resolve) {
	    chrome.storage.local.get([key], function (result) {
	      if (result[key]) {
	        resolve(result[key]);
	      } else if (defaultValue) {
	        setStorage(key, defaultValue).then(function (value) {
	          resolve(value);
	        });
	      } else {
	        resolve();
	      }
	    });
	  });
	}
	function storageChange(callback) {
	  chrome.storage.onChanged.addListener(callback);
	}
	function openTab(url) {
	  var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  return new Promise(function (resolve) {
	    chrome.tabs.query({}, function (tabs) {
	      var findTab = tabs.find(function (tab) {
	        return tab.url === url;
	      });

	      if (findTab) {
	        chrome.tabs.update(findTab.id, {
	          active: active,
	          url: url
	        }, function (tab) {
	          resolve(tab);
	        });
	      } else {
	        chrome.tabs.create({
	          url: url,
	          active: active
	        }, function (tab) {
	          resolve(tab);
	        });
	      }
	    });
	  });
	}
	var debug = {
	  log: function log(msg) {
	    var logs;
	    return regenerator.async(function log$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return regenerator.awrap(getStorage('debug'));

	          case 2:
	            _context.t0 = _context.sent;

	            if (_context.t0) {
	              _context.next = 5;
	              break;
	            }

	            _context.t0 = [];

	          case 5:
	            logs = _context.t0;
	            logs.push({
	              type: 'log',
	              data: objToString_1(msg)
	            });
	            _context.next = 9;
	            return regenerator.awrap(setStorage('debug', logs));

	          case 9:
	          case "end":
	            return _context.stop();
	        }
	      }
	    });
	  },
	  err: function err(msg) {
	    var logs;
	    return regenerator.async(function err$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return regenerator.awrap(getStorage('debug'));

	          case 2:
	            _context2.t0 = _context2.sent;

	            if (_context2.t0) {
	              _context2.next = 5;
	              break;
	            }

	            _context2.t0 = [];

	          case 5:
	            logs = _context2.t0;
	            logs.push({
	              type: 'error',
	              data: objToString_1(msg)
	            });
	            _context2.next = 9;
	            return regenerator.awrap(setStorage('debug', logs));

	          case 9:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    });
	  },
	  clean: function clean() {
	    return regenerator.async(function clean$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return regenerator.awrap(setStorage('debug', []));

	          case 2:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    });
	  }
	};
	function sendMessage(type, data) {
	  chrome.runtime.sendMessage({
	    type: type,
	    data: data
	  });
	}

	var Popup =
	/*#__PURE__*/
	function () {
	  function Popup() {
	    var _this = this;

	    classCallCheck(this, Popup);

	    this.manifest = chrome.runtime.getManifest();
	    this.$container = query('.container');
	    this.$name = query('.name');
	    this.$feedback = query('.feedback');
	    this.$name.textContent = "".concat(this.manifest.name, " ").concat(this.manifest.version);
	    this.$rtmp = query('.rtmp');
	    this.$streamname = query('.streamname');
	    this.$socket = query('.socket');
	    this.$resolution = query('.resolution');
	    this.$videoBitsPerSecond = query('.videoBitsPerSecond');
	    this.$debug = query('.debug');
	    this.$start = query('.start');
	    this.$stop = query('.stop');
	    this.bindEvent();
	    this.updateConfig();
	    this.updateDebug();
	    this.updateRecording();
	    storageChange(function (changes) {
	      if (changes.debug) {
	        _this.updateDebug();
	      }

	      if (changes.recording) {
	        _this.updateRecording();
	      }
	    });
	  }

	  createClass(Popup, [{
	    key: "bindEvent",
	    value: function bindEvent() {
	      var _this2 = this;

	      return regenerator.async(function bindEvent$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              this.$name.addEventListener('click', function () {
	                openTab("https://chrome.google.com/webstore/detail/".concat(chrome.runtime.id), true);
	              });
	              this.$feedback.addEventListener('click', function () {
	                openTab('https://github.com/zhw2590582/bilibili-live-hime', true);
	              });
	              this.$rtmp.addEventListener('input', function () {
	                _this2.saveInput('rtmp');
	              });
	              this.$streamname.addEventListener('input', function () {
	                _this2.saveInput('streamname');
	              });
	              this.$socket.addEventListener('input', function () {
	                _this2.saveInput('socket');
	              });
	              this.$start.addEventListener('click', function () {
	                _this2.start();
	              });
	              this.$stop.addEventListener('click', function () {
	                _this2.stop();

	                _this2.close();
	              });
	              chrome.runtime.onMessage.addListener(function (request) {
	                var type = request.type;

	                switch (type) {
	                  case 'close':
	                    _this2.close();

	                    break;
	                }
	              });

	            case 8:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "saveInput",
	    value: function saveInput(name) {
	      var config;
	      return regenerator.async(function saveInput$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              _context2.next = 2;
	              return regenerator.awrap(getStorage('config'));

	            case 2:
	              _context2.t0 = _context2.sent;

	              if (_context2.t0) {
	                _context2.next = 5;
	                break;
	              }

	              _context2.t0 = {};

	            case 5:
	              config = _context2.t0;
	              config[name] = this["$".concat(name)].value.trim();
	              _context2.next = 9;
	              return regenerator.awrap(setStorage('config', config));

	            case 9:
	            case "end":
	              return _context2.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "updateConfig",
	    value: function updateConfig() {
	      var config;
	      return regenerator.async(function updateConfig$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              _context3.next = 2;
	              return regenerator.awrap(getStorage('config'));

	            case 2:
	              config = _context3.sent;

	              if (config) {
	                this.$rtmp.value = config.rtmp || '';
	                this.$streamname.value = config.streamname || '';
	                this.$socket.value = config.socket || '';
	                this.$resolution.value = config.resolution || '1920';
	                this.$videoBitsPerSecond.value = config.videoBitsPerSecond || '2500000';
	              }

	            case 4:
	            case "end":
	              return _context3.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "updateDebug",
	    value: function updateDebug() {
	      var logs;
	      return regenerator.async(function updateDebug$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              _context4.next = 2;
	              return regenerator.awrap(getStorage('debug'));

	            case 2:
	              _context4.t0 = _context4.sent;

	              if (_context4.t0) {
	                _context4.next = 5;
	                break;
	              }

	              _context4.t0 = [];

	            case 5:
	              logs = _context4.t0;
	              this.$debug.innerHTML = logs.map(function (item) {
	                return "<p class=\"".concat(item.type, "\">").concat(item.data, "</p>");
	              }).join('');
	              this.$debug.scrollTo(0, this.$debug.scrollHeight);

	            case 8:
	            case "end":
	              return _context4.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "updateRecording",
	    value: function updateRecording() {
	      var recording;
	      return regenerator.async(function updateRecording$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              _context5.next = 2;
	              return regenerator.awrap(getStorage('recording'));

	            case 2:
	              recording = _context5.sent;

	              if (!recording) {
	                _context5.next = 12;
	                break;
	              }

	              this.$container.classList.add('recording');
	              this.$rtmp.disabled = true;
	              this.$streamname.disabled = true;
	              this.$socket.disabled = true;
	              this.$resolution.disabled = true;
	              this.$videoBitsPerSecond.disabled = true;
	              _context5.next = 14;
	              break;

	            case 12:
	              _context5.next = 14;
	              return regenerator.awrap(debug.clean());

	            case 14:
	            case "end":
	              return _context5.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var activeTab, config;
	      return regenerator.async(function start$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              _context6.next = 2;
	              return regenerator.awrap(getActiveTab());

	            case 2:
	              activeTab = _context6.sent;

	              if (activeTab) {
	                _context6.next = 7;
	                break;
	              }

	              _context6.next = 6;
	              return regenerator.awrap(debug.err('未获取到当前激活的标签'));

	            case 6:
	              return _context6.abrupt("return");

	            case 7:
	              config = {
	                tab: activeTab.id,
	                rtmp: this.$rtmp.value.trim(),
	                streamname: this.$streamname.value.trim(),
	                socket: this.$socket.value.trim(),
	                resolution: Number(this.$resolution.value),
	                videoBitsPerSecond: Number(this.$videoBitsPerSecond.value)
	              };

	              if (!(!config.rtmp || !/^rtmp:\/\/.+/i.test(config.rtmp))) {
	                _context6.next = 12;
	                break;
	              }

	              _context6.next = 11;
	              return regenerator.awrap(debug.err('请输入正确的rtmp推流地址'));

	            case 11:
	              return _context6.abrupt("return");

	            case 12:
	              if (config.streamname) {
	                _context6.next = 16;
	                break;
	              }

	              _context6.next = 15;
	              return regenerator.awrap(debug.err('请输入正确的直播码'));

	            case 15:
	              return _context6.abrupt("return");

	            case 16:
	              if (!(!config.socket || !/^https?:\/\/.+/i.test(config.socket))) {
	                _context6.next = 20;
	                break;
	              }

	              _context6.next = 19;
	              return regenerator.awrap(debug.err('请输入正确的中转地址'));

	            case 19:
	              return _context6.abrupt("return");

	            case 20:
	              _context6.next = 22;
	              return regenerator.awrap(setStorage('recording', true));

	            case 22:
	              _context6.next = 24;
	              return regenerator.awrap(setStorage('config', config));

	            case 24:
	              sendMessage('start', config);

	            case 25:
	            case "end":
	              return _context6.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      return regenerator.async(function stop$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              sendMessage('stop');

	            case 1:
	            case "end":
	              return _context7.stop();
	          }
	        }
	      });
	    }
	  }, {
	    key: "close",
	    value: function close() {
	      return regenerator.async(function close$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              _context8.next = 2;
	              return regenerator.awrap(setStorage('recording', false));

	            case 2:
	              _context8.next = 4;
	              return regenerator.awrap(debug.log('3秒后关闭连接...'));

	            case 4:
	              _context8.next = 6;
	              return regenerator.awrap(sleep(3000));

	            case 6:
	              _context8.next = 8;
	              return regenerator.awrap(debug.clean());

	            case 8:
	              chrome.runtime.reload();
	              window.close();

	            case 10:
	            case "end":
	              return _context8.stop();
	          }
	        }
	      });
	    }
	  }]);

	  return Popup;
	}();

	var index = new Popup();

	return index;

}());
//# sourceMappingURL=index.js.map
