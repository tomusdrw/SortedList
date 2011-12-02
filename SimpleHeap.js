var SimpleHeap = (function() {
    'use strict';
    var SimpleHeap = function simpleHeap(comparator) {
        this._order = [];
        this._map = {};
        if (comparator) {
            this._cmp = comparator;
        }
    };
    /**
     * Create empty heap.
     * 
     * @param comparator
     *            (optional)
     * @returns {SimpleHeap}
     */
    SimpleHeap.create = function simpleHeapCreate(comparator) {
        return new SimpleHeap(comparator);
    };
    SimpleHeap.prototype = {
        _order : null,
        _map : null,
        _cmp : function simpleHeapCmp(a, b) {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            }
            return 0;
        },
        /**
         * Returns minimal value (does not remove from heap)
         * 
         * @returns minimal value or null
         */
        peekMin : function simpleHeapPeekMin() {
            return this._order[0] || null;
        },
        /**
         * Returns minimal value and deletes it from heap.
         * 
         * @returns minimal value or null if empty
         */
        popMin : function simpleHeapPopMin() {
            var min = this._order.splice(0, 1);
            return min[0] || null;
        },
        /**
         * Returns maximal value without removing from structure.
         * 
         * @returns maximal value or null if empty
         */
        peekMax : function simpleHeapPeekMax() {
            var o = this._order;
            return o[o.length - 1] || null;
        },
        /**
         * Returns maximal value and removes it from
         * 
         * @returns maximal value or null if empty
         */
        popMax : function simpleHeapPopMax() {
            var o = this._order;
            var max = o.splice(o.length - 1, 1);
            return max[0] || null;
        },
        /**
         * Return size
         * 
         * @returns
         */
        size : function simpleHeapSize() {
            return this._order.length;
        },
        isEmpty : function simpleHeapIsEmpty() {
            return this._order.length === 0;
        },
        clear : function simpleHeapClear() {
            this._order = [];
        },
        _findPos : function simpleHeapFindPos(key) {
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
        _checkEmpty : function simpleHeapCheckNotEmpty(key) {
            if (key == undefined) {
                throw {
                    name : "Empty key",
                    message : "Given key is null or undefined."
                };
            }
        },
        pushAll : function simpleHeapPushAll(iterable) {
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
        push : function simpleHeapPush(key) {
            key || this._checkEmpty(key);
            var pos = this._findPos(key);
            this._order.splice(pos, 0, key);
        },
        contains : function simpleHeapContains(key) {
            key || this._checkEmpty(key);
            var pos = this._findPos(key);
            return this._order[pos] === key;
        },
        remove : function simpleHeapRemove(key) {
            key || this._checkEmpty(key);
            var pos = this._findPos(key);
            if (this._order[pos] === key) {
                this._order.splice(pos, 1);
                return true;
            }
            return false;
        },
        getArray : function simpleHeapGetArray() {
            return this._order.slice(0);
        }
    };

    return SimpleHeap;
}());
