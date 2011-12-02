var SortedList = (function() {
    'use strict';
    var SortedList = function sortedList(comparator) {
        this._order = [];
        this._map = {};
        if (comparator) {
            this._cmp = comparator;
        }
    };
    /**
     * Create empty heap. O(1)
     * 
     * @param comparator
     *            (optional)
     * @returns {sortedList}
     */
    SortedList.create = function sortedListCreate(comparator) {
        return new SortedList(comparator);
    };
    SortedList.prototype = {
        _order : null,
        _map : null,
        _cmp : function sortedListCmp(a, b) {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            }
            return 0;
        },
        /**
         * Returns minimal value (does not remove from list) O(1)
         * 
         * @returns minimal value or null
         */
        peekMin : function sortedListPeekMin() {
            return this._order[0] || null;
        },
        /**
         * Returns minimal value and deletes it from list. O(splice)
         * 
         * @returns minimal value or null if empty
         */
        popMin : function sortedListPopMin() {
            var min = this._order.splice(0, 1);
            return min[0] || null;
        },
        /**
         * Returns maximal value without removing from list. O(1)
         * 
         * @returns maximal value or null if empty
         */
        peekMax : function sortedListPeekMax() {
            var o = this._order;
            return o[o.length - 1] || null;
        },
        /**
         * Returns maximal value and removes it from O(splice)
         * 
         * @returns maximal value or null if empty
         */
        popMax : function sortedListPopMax() {
            var o = this._order;
            var max = o.splice(o.length - 1, 1);
            return max[0] || null;
        },
        /**
         * Return current size of structure O(1)
         * 
         * @returns {Integer} size of heap
         */
        size : function sortedListSize() {
            return this._order.length;
        },
        /**
         * Returs true if this heap is empty (size is 0) O(1)
         * 
         * @returns {Boolean}
         */
        isEmpty : function sortedListIsEmpty() {
            return this._order.length === 0;
        },
        /**
         * Clears content of list. O(1)
         */
        clear : function sortedListClear() {
            this._order = [];
        },
        _findPos : function sortedListFindPos(key) {
            // shortcuts
            var o = this._order, f = Math.floor, cmp = this._cmp;
            // vars
            var low = 0, high = o.length - 1, i = 0, comparison = null;

            while (low <= high) {
                i = f((low + high) / 2);
                comparison = cmp(o[i], key);

                if (comparison === 0) {
                    return i;
                }
                if (comparison < 0) {
                    low = i + 1;
                } else {
                    high = i - 1;
                }
            }
            if (comparison !== null && comparison < 0) {
                return low;
            }
            return i;
        },
        _checkEmpty : function sortedListCheckNotEmpty(key) {
            if (key == null) {
                throw {
                    name : "Empty key",
                    message : "Given key is null or undefined."
                };
            }
        },
        /**
         * Adds all elements (values) from iterable (array or object)
         * O(k*(log(n) +splice))
         * 
         * @param {Object}
         *            iterable
         */
        pushAll : function sortedListPushAll(iterable) {
            iterable || this._checkEmpty(iterable);
            if (iterable.forEach) {
                iterable.forEach(this.push.bind(this));
                return;
            }
            for ( var i in iterable) {
                if (iterable.hasOwnProperty(i)) {
                    this.push(iterable[i]);
                }
            }
        },
        /**
         * Adds single element to list. O(log(n) + splice)
         * 
         * @param key
         */
        push : function sortedListPush(key) {
            key || this._checkEmpty(key);
            var pos = this._findPos(key);
            this._order.splice(pos, 0, key);
        },
        /**
         * Checks if key exists in list. O(log(n))
         * 
         * @param key
         * @returns {Boolean}
         */
        contains : function sortedListContains(key) {
            key || this._checkEmpty(key);
            var pos = this._findPos(key);
            return this._order[pos] === key;
        },
        /**
         * Removes element from list. O(log(n) + splice)
         * 
         * @param key
         * @returns {Boolean} true if element was removed, false otherwise
         */
        remove : function sortedListRemove(key) {
            key || this._checkEmpty(key);
            var pos = this._findPos(key);
            if (this._order[pos] === key) {
                this._order.splice(pos, 1);
                return true;
            }
            return false;
        },
        /**
         * Returns array of elements in list. O(slice)
         * 
         * @returns
         */
        getArray : function sortedListGetArray() {
            return this._order.slice(0);
        }
    };

    return SortedList;
}());
