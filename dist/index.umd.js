(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('dotenv')) :
	typeof define === 'function' && define.amd ? define(['exports', 'lodash', 'dotenv'], factory) :
	(global = global || self, factory(global.Utils = {}, global.lodash, global.dotenv));
}(this, (function (exports, lodash, dotenv) {
	dotenv = dotenv && Object.prototype.hasOwnProperty.call(dotenv, 'default') ? dotenv['default'] : dotenv;

	/**
	 * @render utils
	 * @name toBool
	 * @param val
	 * @returns {boolean}
	 * @description Convert value to a boolean.
	 * @example
	 * toBool(true); // -> true
	 * toBool(null); // -> false
	 * toBool(1); // -> true
	 * toBool(0); // -> false
	 * toBool('0'); // -> false
	 * toBool('1'); // -> true
	 * toBool('false'); // -> false
	 */

	function toBool(val) {
	  if (lodash.isString(val)) {
	    val = val.toLowerCase();
	    return val !== '0' && val !== '' && val !== 'false';
	  }

	  return !!val;
	}

	/**
	 * @static
	 * @description Gets the value of an environment variable.
	 * @param {string} key
	 * @param {mixed} _default
	 * @return {mixed}
	 */

	function env(key, _default) {
	  if (_default === void 0) {
	    _default = null;
	  }

	  var result = dotenv.config();

	  if (result.error) {
	    throw result.error;
	  }

	  return lodash.get(lodash.map(result.parsed).map(function (v) {
	    switch (lodash.toLower(v)) {
	      case 'true':
	      case '(true)':
	        return true;

	      case 'false':
	      case '(false)':
	        return false;

	      case 'empty':
	      case '(empty)':
	        return '';

	      case 'null':
	      case '(null)':
	        return;
	    }

	    return v;
	  }), key, _default);
	}

	/**
	 * @render utils
	 * @name toRoman
	 * @param num
	 * @returns {string}
	 * @description Convert number to roman.
	 * https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-roman-numeral-converter/16044
	 * @example
	 * toRoman(1); // -> I
	 * toRoman(2); // -> II
	 */

	function toRoman(num, isLowercase) {
	  if (typeof num !== 'number') return false;
	  var digits = String(+num).split(''),
	      key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
	      roman_num = '',
	      i = 3;

	  while (i--) {
	    roman_num = (key[+digits.pop() + i * 10] || '') + roman_num;
	  }

	  var romanStr = Array(+digits.join('') + 1).join('M') + roman_num;
	  return isLowercase ? lodash.lowerCase(romanStr) : romanStr;
	}

	/**
	 * @render utils
	 * @name toLetter
	 * @param int
	 * @param uppercase
	 * @returns {string}
	 * @example
	 * toLetter(1); // -> a
	 * toLetter(1, true); // -> A
	 */

	function toLetter(_int, isLowercase) {
	  if (isLowercase === void 0) {
	    isLowercase = false;
	  }

	  var letter = String.fromCharCode(_int - 1 + 65);
	  return isLowercase ? lodash.lowerCase(letter) : letter;
	}

	exports.env = env;
	exports.toBool = toBool;
	exports.toLetter = toLetter;
	exports.toRoman = toRoman;

})));
//# sourceMappingURL=index.umd.js.map
