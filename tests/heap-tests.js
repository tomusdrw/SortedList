QUnit.specify("eu.blacksoft.js.heap", function() {

    describe("With default comparator", function() {
        var cut = null;
        before(function() {
            cut = SimpleHeap.create();
        });

        describe("intial state", function() {
            it("should be empty", function() {
                // given
                // when

                // then
                assert(cut.isEmpty()).isTrue();
                assert(cut.size()).isEqualTo(0);
            });
            given('peekMin', 'popMin', 'peekMax', 'popMax').//
            it('invocation should return null', function(funcName) {
                // when
                var actual = cut[funcName]();

                // then
                assert(actual).isNull();
            });
            it('should return empty array', function() {
                // given

                // when
                var arr = cut.getArray();

                // then
                assert(arr).isSameAs([]);
            });
        });

        describe("with one element", function() {
            var element = "a";

            before(function() {
                cut.push(element);
            });

            it("should increase size", function() {
                // given
                // when

                // then
                assert(cut.isEmpty()).isFalse();
                assert(cut.size()).isEqualTo(1);
            });

            given('peekMin', 'popMin', 'peekMax', 'popMax').//
            it('invocation should return same element', function(funcName) {
                // when
                var actual = cut[funcName]();

                // then
                assert(actual).isEqualTo(element);
            });

            it('should contain pushed element', function() {
                // when
                var actual = cut.contains(element);

                // then
                assert(actual).isTrue();
            });

            given(5, 'b', 'c', [1], {}, 0).//
            it('should not contain element', function(element) {
                // when
                var actual = cut.contains(element);

                // then
                assert(actual).isFalse();
            });

            it('should clear and become empty', function() {
                // when
                cut.clear();
                // then
                assert(cut.isEmpty()).isTrue();
                assert(cut.size()).isEqualTo(0);
            });

            it('should remove element', function() {
                // when
                var actual = cut.remove(element);
                // then
                assert(actual).isTrue();
                assert(cut.isEmpty());
            });

            it('should return array with element', function() {
                // when
                var arr = cut.getArray();
                // then
                assert(arr).isSameAs([element]);
            });
        });

        describe("empty values", function() {
            given("pushAll", "push", "contains", "remove").//
            it('invocation should throw exception', function(func) {
                // given
                var empty = null;
                // when
                assert(function() {
                    cut[func](empty);
                }).throwsException();
            });

            given("pushAll", "push", "contains", "remove").//
            it('invocation should throw exception', function(func) {
                // given
                var empty = undefined;
                // when
                assert(function() {
                    cut[func](empty);
                }).throwsException();
            });
        });

        describe("pushing multiple elements", function() {
            given([[6, 2, 3, 41, 3]], [[1, 2, 3]], [[3, 2, 1]], [["a", "f", "d", "b"]],
                    [["2", 1, 3]]).//
            it('should push all elements', function(elements) {
                // given
                var sorted = elements.slice(0).sort(cut._cmp);

                // when
                cut.pushAll(elements);

                // then
                assert(cut.size()).isEqualTo(elements.length);
                assert(cut.peekMin()).isEqualTo(sorted[0]);
                assert(cut.peekMax()).isEqualTo(sorted[sorted.length - 1]);
                assert(cut.getArray()).isSameAs(sorted);
                elements.forEach(function(e) {
                    assert(cut.contains(e)).isTrue("Contains " + e);
                });
            });
        });

        describe("Removing elements", function() {
            var elements = [5, 3, 4, 2, 1, 15];
            before(function() {
                cut.pushAll(elements);
            });

            it('should not remove non-existing element', function() {
                // given
                var sorted = elements.slice(0).sort(cut._cmp);

                // when
                var actual = cut.remove(12345);

                // then
                assert(actual).isFalse();
                assert(cut.getArray()).isSameAs(sorted);
            });

            given(5, 3, 4, 2, 1, 15).//
            it('should remove element', function(toRemove2) {
                var toRemove = toRemove2 + 0; // some weird pavlov conversion?

                // given
                var sortedAndRemoved = elements.slice(0).sort(cut._cmp);
                sortedAndRemoved.splice(sortedAndRemoved.indexOf(toRemove), 1);
                // when
                var actual = cut.remove(toRemove);

                // then
                assert(actual).isTrue();
                assert(cut.contains(toRemove)).isFalse();
                assert(cut.getArray()).isSameAs(sortedAndRemoved);
            });
        });

    });

});
