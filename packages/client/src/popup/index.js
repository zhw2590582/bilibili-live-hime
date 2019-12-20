var BilibiliLiveHimePopup = (function () {
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

	var START = 'start';
	var STOP = 'stop';
	var CONFIG = 'config';
	var RECORDING = 'recording';
	var DEBUG = 'debug';
	var LOG = 'log';
	var ERROR = 'error';
	var DANMU_OPTION = 'danmu_option';
	var CAN_NOT_FIND_TAB = '未获取到当前激活的标签';
	var RTMP_ERROR = '请输入正确的rtmp推流地址';
	var STREAM_NAME_ERROR = '请输入正确的直播码';
	var SOCKET_ERROR = '请输入正确的中转地址';
	var LIVE_ROOM_ERROR = '不是有效的 Bilibili 直播间地址';
	var OPEN_SUCCESS = '打开直播间页面成功';
	var CURRENT_PAGE = '当前页面';
	var PUSH_STREAM_END = '已停止推流...';
	var INJECTED_SUCCESS = '注入文件：';
	var DEFAULT_SOCKET = 'http://localhost:8080';
	var DEFAULT_RESOLUTION = 720;
	var DEFAULT_VIDEO_BITSPER = 2500000;
	var REG_RTMP = /^rtmp:\/\/.+/i;
	var REG_HTTP = /^https?:\/\/.+/i;
	var REG_LIVE = /^https?:\/\/live\.bilibili\.com/i;

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
	function has(result, key) {
	  return Object.prototype.hasOwnProperty.call(result, key);
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
	      if (has(result, key)) {
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
	  var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  return new Promise(function (resolve) {
	    chrome.tabs.create({
	      url: url,
	      active: active
	    }, function (tab) {
	      resolve(tab);
	    });
	  });
	}
	function getCapturedTab() {
	  return new Promise(function (resolve) {
	    chrome.tabCapture.getCapturedTabs(function (tabs) {
	      resolve(tabs[0]);
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
	            return regenerator.awrap(getStorage(DEBUG));

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
	              type: LOG,
	              data: objToString_1(msg)
	            });
	            _context.next = 9;
	            return regenerator.awrap(setStorage(DEBUG, logs));

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
	            return regenerator.awrap(getStorage(DEBUG));

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
	              type: ERROR,
	              data: objToString_1(msg)
	            });
	            _context2.next = 9;
	            return regenerator.awrap(setStorage(DEBUG, logs));

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
	            return regenerator.awrap(setStorage(DEBUG, []));

	          case 2:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    });
	  }
	};
	function sendMessage(data) {
	  chrome.runtime.sendMessage(data);
	}
	function sendMessageToTab(tabId, data) {
	  chrome.tabs.sendMessage(tabId, data);
	}
	function injectedScript(tabId, file) {
	  return new Promise(function (resolve) {
	    chrome.tabs.executeScript(tabId, {
	      file: file,
	      runAt: 'document_start'
	    }, function () {
	      resolve();
	    });
	  });
	}
	function runScript(code) {
	  return new Promise(function (resolve) {
	    chrome.tabs.executeScript({
	      code: code
	    }, function () {
	      resolve();
	    });
	  });
	}
	function insertCSS(tabId, file) {
	  return new Promise(function (resolve) {
	    chrome.tabs.insertCSS(tabId, {
	      file: file
	    }, function () {
	      resolve();
	    });
	  });
	}
	function runCss(code) {
	  return new Promise(function (resolve) {
	    chrome.tabs.insertCSS({
	      code: code
	    }, function () {
	      resolve();
	    });
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
	    this.$liveSetting = query('.liveSetting');
	    this.$socketSetting = query('.socketSetting');
	    this.$name.textContent = "".concat(this.manifest.name, " ").concat(this.manifest.version);
	    this.$rtmp = query('.rtmp');
	    this.$streamname = query('.streamname');
	    this.$socket = query('.socket');
	    this.$live = query('.live');
	    this.$resolution = query('.resolution');
	    this.$videoBitsPerSecond = query('.videoBitsPerSecond');
	    this.$debug = query('.debug');
	    this.$start = query('.start');
	    this.$stop = query('.stop');
	    this.init();
	    this.bindEvent();
	    this.updateDebug();
	    this.updateRecording();
	    storageChange(function (changes) {
	      if (changes[DEBUG]) {
	        _this.updateDebug();
	      }

	      if (changes[RECORDING]) {
	        _this.updateRecording();
	      }
	    });
	  }

	  createClass(Popup, [{
	    key: "bindEvent",
	    value: function bindEvent() {
	      var _this2 = this;

	      return regenerator.async(function bindEvent$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              this.$name.addEventListener('click', function () {
	                openTab("https://chrome.google.com/webstore/detail/".concat(chrome.runtime.id));
	              });
	              this.$feedback.addEventListener('click', function () {
	                openTab('https://github.com/zhw2590582/bilibili-live-hime');
	              });
	              this.$liveSetting.addEventListener('click', function () {
	                openTab('https://link.bilibili.com/p/center/index#/my-room/start-live');
	              });
	              this.$socketSetting.addEventListener('click', function () {
	                openTab('https://github.com/zhw2590582/bilibili-live-hime#%E6%9C%8D%E5%8A%A1%E7%AB%AF');
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
	              this.$live.addEventListener('input', function () {
	                _this2.saveInput('live');
	              });
	              this.$resolution.addEventListener('change', function () {
	                _this2.saveInput('resolution');
	              });
	              this.$videoBitsPerSecond.addEventListener('change', function () {
	                _this2.saveInput('videoBitsPerSecond');
	              });
	              this.$start.addEventListener('click', function () {
	                _this2.start();
	              });
	              this.$stop.addEventListener('click', function () {
	                _this2.stop();
	              });
	              this.$container.addEventListener('dragover', function (event) {
	                event.preventDefault();
	              });
	              this.$container.addEventListener('drop', function _callee(event) {
	                return regenerator.async(function _callee$(_context) {
	                  while (1) {
	                    switch (_context.prev = _context.next) {
	                      case 0:
	                        _this2.inject(event);

	                      case 1:
	                      case "end":
	                        return _context.stop();
	                    }
	                  }
	                });
	              });

	            case 14:
	            case "end":
	              return _context2.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "inject",
	    value: function inject(event) {
	      var files;
	      return regenerator.async(function inject$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              event.preventDefault();
	              files = Array.from(event.dataTransfer.files);
	              _context3.next = 4;
	              return regenerator.awrap(debug.log(INJECTED_SUCCESS + files.map(function (f) {
	                return f.name;
	              }).join(',')));

	            case 4:
	              files.forEach(function (file) {
	                var reader = new FileReader();
	                reader.addEventListener('load', function () {
	                  var code = reader.result;

	                  switch (file.type) {
	                    case 'text/javascript':
	                      runScript(code);
	                      break;

	                    case 'text/css':
	                      runCss(code);
	                      break;
	                  }
	                });
	                reader.readAsText(file);
	              });

	            case 5:
	            case "end":
	              return _context3.stop();
	          }
	        }
	      });
	    }
	  }, {
	    key: "saveInput",
	    value: function saveInput(name) {
	      var config;
	      return regenerator.async(function saveInput$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              _context4.next = 2;
	              return regenerator.awrap(getStorage(CONFIG));

	            case 2:
	              _context4.t0 = _context4.sent;

	              if (_context4.t0) {
	                _context4.next = 5;
	                break;
	              }

	              _context4.t0 = {};

	            case 5:
	              config = _context4.t0;
	              config[name] = this["$".concat(name)].value.trim();
	              _context4.next = 9;
	              return regenerator.awrap(setStorage(CONFIG, config));

	            case 9:
	            case "end":
	              return _context4.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      var recording, config, danmu_option, capturedTab;
	      return regenerator.async(function init$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              _context5.next = 2;
	              return regenerator.awrap(getStorage(RECORDING));

	            case 2:
	              recording = _context5.sent;
	              _context5.next = 5;
	              return regenerator.awrap(getStorage(CONFIG));

	            case 5:
	              _context5.t0 = _context5.sent;

	              if (_context5.t0) {
	                _context5.next = 8;
	                break;
	              }

	              _context5.t0 = {};

	            case 8:
	              config = _context5.t0;
	              _context5.next = 11;
	              return regenerator.awrap(getStorage(DANMU_OPTION));

	            case 11:
	              danmu_option = _context5.sent;
	              _context5.next = 14;
	              return regenerator.awrap(getCapturedTab());

	            case 14:
	              capturedTab = _context5.sent;

	              if (config) {
	                this.$rtmp.value = config.rtmp || '';
	                this.$live.value = config.live || '';
	                this.$streamname.value = config.streamname || '';
	                this.$socket.value = config.socket || DEFAULT_SOCKET;
	                this.$resolution.value = config.resolution || DEFAULT_RESOLUTION;
	                this.$videoBitsPerSecond.value = config.videoBitsPerSecond || DEFAULT_VIDEO_BITSPER;
	              }

	              if (!(recording && capturedTab)) {
	                _context5.next = 25;
	                break;
	              }

	              if (!(danmu_option && config.activeTab)) {
	                _context5.next = 23;
	                break;
	              }

	              _context5.next = 20;
	              return regenerator.awrap(injectedScript(config.activeTab, 'active/index.js'));

	            case 20:
	              _context5.next = 22;
	              return regenerator.awrap(insertCSS(config.activeTab, 'active/index.css'));

	            case 22:
	              sendMessageToTab(config.activeTab, danmu_option);

	            case 23:
	              _context5.next = 27;
	              break;

	            case 25:
	              debug.clean();
	              sendMessage({
	                type: STOP
	              });

	            case 27:
	            case "end":
	              return _context5.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "updateDebug",
	    value: function updateDebug() {
	      var logs;
	      return regenerator.async(function updateDebug$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              _context6.next = 2;
	              return regenerator.awrap(getStorage(DEBUG));

	            case 2:
	              _context6.t0 = _context6.sent;

	              if (_context6.t0) {
	                _context6.next = 5;
	                break;
	              }

	              _context6.t0 = [];

	            case 5:
	              logs = _context6.t0;
	              this.$debug.innerHTML = logs.map(function (item) {
	                return "<p class=\"".concat(item.type, "\">").concat(item.data, "</p>");
	              }).join('');
	              this.$debug.scrollTo(0, this.$debug.scrollHeight);

	            case 8:
	            case "end":
	              return _context6.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "updateRecording",
	    value: function updateRecording() {
	      var recording, capturedTab;
	      return regenerator.async(function updateRecording$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              _context7.next = 2;
	              return regenerator.awrap(getStorage(RECORDING));

	            case 2:
	              recording = _context7.sent;
	              _context7.next = 5;
	              return regenerator.awrap(getCapturedTab());

	            case 5:
	              capturedTab = _context7.sent;

	              if (recording && capturedTab) {
	                this.$container.classList.add(RECORDING);
	                this.$rtmp.disabled = true;
	                this.$streamname.disabled = true;
	                this.$socket.disabled = true;
	                this.$live.disabled = true;
	                this.$resolution.disabled = true;
	                this.$videoBitsPerSecond.disabled = true;
	              } else {
	                this.$container.classList.remove(RECORDING);
	                this.$rtmp.disabled = false;
	                this.$streamname.disabled = false;
	                this.$socket.disabled = false;
	                this.$live.disabled = false;
	                this.$resolution.disabled = false;
	                this.$videoBitsPerSecond.disabled = false;
	              }

	            case 7:
	            case "end":
	              return _context7.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var activeTab, config, liveTab;
	      return regenerator.async(function start$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              _context8.next = 2;
	              return regenerator.awrap(getActiveTab());

	            case 2:
	              activeTab = _context8.sent;

	              if (activeTab) {
	                _context8.next = 7;
	                break;
	              }

	              _context8.next = 6;
	              return regenerator.awrap(debug.err(CAN_NOT_FIND_TAB));

	            case 6:
	              return _context8.abrupt("return");

	            case 7:
	              config = {
	                activeTab: activeTab.id,
	                rtmp: this.$rtmp.value.trim(),
	                streamname: this.$streamname.value.trim(),
	                socket: this.$socket.value.trim(),
	                live: this.$live.value.trim(),
	                resolution: Number(this.$resolution.value),
	                videoBitsPerSecond: Number(this.$videoBitsPerSecond.value)
	              };

	              if (!(!config.rtmp || !REG_RTMP.test(config.rtmp))) {
	                _context8.next = 12;
	                break;
	              }

	              _context8.next = 11;
	              return regenerator.awrap(debug.err(RTMP_ERROR));

	            case 11:
	              return _context8.abrupt("return");

	            case 12:
	              if (config.streamname) {
	                _context8.next = 16;
	                break;
	              }

	              _context8.next = 15;
	              return regenerator.awrap(debug.err(STREAM_NAME_ERROR));

	            case 15:
	              return _context8.abrupt("return");

	            case 16:
	              if (!(!config.socket || !REG_HTTP.test(config.socket))) {
	                _context8.next = 20;
	                break;
	              }

	              _context8.next = 19;
	              return regenerator.awrap(debug.err(SOCKET_ERROR));

	            case 19:
	              return _context8.abrupt("return");

	            case 20:
	              if (!config.live) {
	                _context8.next = 37;
	                break;
	              }

	              if (!REG_LIVE.test(config.live)) {
	                _context8.next = 34;
	                break;
	              }

	              _context8.next = 24;
	              return regenerator.awrap(injectedScript(config.activeTab, 'active/index.js'));

	            case 24:
	              _context8.next = 26;
	              return regenerator.awrap(insertCSS(config.activeTab, 'active/index.css'));

	            case 26:
	              _context8.next = 28;
	              return regenerator.awrap(openTab(config.live, false));

	            case 28:
	              liveTab = _context8.sent;
	              config.liveTab = liveTab.id;
	              _context8.next = 32;
	              return regenerator.awrap(debug.log(OPEN_SUCCESS));

	            case 32:
	              _context8.next = 37;
	              break;

	            case 34:
	              _context8.next = 36;
	              return regenerator.awrap(debug.err(LIVE_ROOM_ERROR));

	            case 36:
	              return _context8.abrupt("return");

	            case 37:
	              _context8.next = 39;
	              return regenerator.awrap(debug.log("".concat(CURRENT_PAGE, "\uFF1A").concat(activeTab.title)));

	            case 39:
	              _context8.next = 41;
	              return regenerator.awrap(setStorage(CONFIG, config));

	            case 41:
	              sendMessage({
	                type: START,
	                data: config
	              });

	            case 42:
	            case "end":
	              return _context8.stop();
	          }
	        }
	      }, null, this);
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      return regenerator.async(function stop$(_context9) {
	        while (1) {
	          switch (_context9.prev = _context9.next) {
	            case 0:
	              _context9.next = 2;
	              return regenerator.awrap(debug.log(PUSH_STREAM_END));

	            case 2:
	              sendMessage({
	                type: STOP
	              });

	            case 3:
	            case "end":
	              return _context9.stop();
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
