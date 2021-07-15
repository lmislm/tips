async function test() {
  const img = await fetch('tiger.jpg');
}

// babel
'use strict';

var test = function() {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var img;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return fetch('tiger.jpg');

                    case 2:
                        img = _context.sent;

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function test() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) {
	return function() {
		var gen = fn.apply(this, arguments);
		return new Promise(function(resolve, reject) {
			function step(key, arg) {
				try {
					var info = gen[key](arg);
					var value = info.value;
				} catch (error) {
					reject(error);
					return;
				}
				if (info.done) {
					resolve(value);
				} else {
					return Promise.resolve(value).then(function(value) {
						step("next", value);
					}, function(err) {
						step("throw", err);
					});
				}
			}
			return step("next");
		});
	};
}