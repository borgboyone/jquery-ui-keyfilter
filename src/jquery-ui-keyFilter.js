(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

/*!
 * jQuery UI KeyFilter 0.9.0
 * https://github.com/borgboyone/jquery-ui-keyfilter
 *
 * Copyright 2016 Anthony Wells
 * Released under the MIT license.
 * https://raw.githubusercontent.com/borgboyone/jquery-ui-showmore/master/LICENSE
 *
 * http://borgboyone.github.io/jquery-ui-keyfilter/
 */

function isModifier(e) {
	return e.ctrlKey || e.altKey || e.metaKey;
}
function isCursor(e) {
	var k = e.which || e.keyCode;
	return (k && ([$.ui.keyCode.TAB, $.ui.keyCode.PAGE_UP, $.ui.keyCode.PAGE_DOWN, $.ui.keyCode.END, $.ui.keyCode.HOME, $.ui.keyCode.LEFT, $.ui.keyCode.UP, $.ui.keyCode.RIGHT, $.ui.keyCode.DOWN].indexOf(k) !== -1));
}
function isEdit(e) {
	var k = e.which || e.keyCode;
	return (k && ([$.ui.keyCode.BACKSPACE, $.ui.keyCode.DELETE].indexOf(k) !== -1));
}
function isEscape(e) {
	var k = e.which || e.keyCode;
	return (k && k === $.ui.keyCode.ESCAPE);
}
function isEnter(e) {
	var k = e.which || e.keyCode;
	return (k && k === $.ui.keyCode.ENTER);
}
/*for(var keyCodeName in $.ui.keyCode) {
	keyCodeName.lowercase.replace('_', ' ').uppercasefirst.replace(' ', '').lowercasefirst
	keyFilter['is' + keyCodeName] = (function(keyCodeName) {
		return function(e) {
			var k = e.which || e.keyCode;
			return (k && k === $.ui.keyCode[keyCodeName]);
		}
	})(keyCodeName);
}*/
/*function isPunctuation(e) {
	var k = e.which || e.keyCode;
	// FIXME: this is incomplete,,.,",',?,!,:,;,-,?,(,)
	return (k && ([$.ui.keyCode.COMMA, $.ui.keyCode.PERIOD].indexOf(k) !== -1));
}*/
function isNonPrintable(e) {
	return isModifier(e) || isCursor(e) || isEdit(e) || isEscape(e) || isEnter(e);
}

// TODO: Add support for iPhone k = 127 (escape)
// TODO: Add support for Android anomalies
// TODO: Add support for paste events
// TODO: validate options order and filters on create and option update
var keyFilter = $.widget('aw.keyFilter', {
	version: '0.9.0',
	options: {
		allow: '*',
		deny: 'none',
		order: 'allow,deny',
		filters: {}
	},
	_create: function() {
		this._super();
		var $element = $(this.element);
		this._on(this._events);
		this.regexps = {};
		for (var name in this.options.filters) {
			this.regexps[name] = new RegExp(this.options.filters[name]);
		}
	},
	_events: {
		'keypress': function(event) {
			function filter(event, filters) {
				var c = undefined;
				for (var i = 0; i < filters.length; i++) {
					var filter = filters[i];
					if (filter === '*') {
						return true;
					} else if (filter === 'none') {
						return false;
					} else if (filter === $.aw.keyFilter.NON_PRINTABLE) {
						if (isNonPrintable(event)) return true;
					} else if (filter === $.aw.keyFilter.CURSOR) {
						if (isCursor(event)) return true;
					} else if (filter === $.aw.keyFilter.EDIT) {
						if (isEdit(event)) return true;
					// $.ui.keyCode iteration would go here: if (filter in $.ui.keyCode)
					} else if (filter === $.aw.keyFilter.ENTER) {
						if (isEnter(event)) return true;
					} else if (filter === $.aw.keyFilter.ESCAPE) {
						if (isEscape(event)) return true;
					} else if ($.isFunction(filter)) {
						if (filter.call(this.element[0], event)) return true;
					} else if (filter in this.options.filters) {
							// might only need to do event.keyCode here
							// we should only do this once but only if we enter this code
							if (typeof c === "undefined") c = String.fromCharCode(event.which || event.keyCode);
							if (this.regexps[filter].exec(c) !== null) return true;
					}
					// TODO: Should we Error on unknown filter name?
					/* else throw new Error("Unknown filter name '" + filter + '.");*/
				}
				return undefined;
			}

			var allowFilters = $.isArray(this.options.allow) ? this.options.allow : [this.options.allow],
				denyFilters = $.isArray(this.options.deny) ? this.options.deny : [this.options.deny];

			for (var directive of this.options.order.split(',')) {
				if (directive == 'allow') {
					var allowed = filter.call(this, event, allowFilters);
					if (allowed === true) {
						return;
					} else if (allowed === false) {
						event.preventDefault();
						return;
					}
				} else {
					var denied = filter.call(this, event, denyFilters);
					if (denied === true) {
						event.preventDefault();
						return;
					} else if (denied === false) {
						return;
					}
				}
			}
			console.warn("Unhandled keypress event in jquery-ui-keyFilter. A catch all is needed as the last entry in the filter chain.");
		}
	}
});

// CONSIDER: object merge on keyFilter
keyFilter['NON_PRINTABLE'] = 'NON_PRINTABLE';
keyFilter['EDIT'] = 'EDIT';
keyFilter['CURSOR'] = 'CURSOR';
// CONSIDER: allow individual keycodes (see code above)
keyFilter['ESCAPE'] = 'ESCAPE';
keyFilter['ENTER'] = 'ENTER';

}));
