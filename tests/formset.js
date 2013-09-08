/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false, ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
/*global jQuery:false*/

(function ($) {

  'use strict';

  module("Test $.djangoFormset#addForm", {
    setup: function () {
      this.element = $('#single-form').djangoFormset({
        formSelector: 'tr',
      });
      this.formset = this.element.data('djangoFormset');
      this.$ = function () { return this.element.find.apply(this.element, arguments); };
    },
    teardown: function () {
    }
  });

  test('form index incrementing', function () {
    expect(6);
    equal(this.$('tr').length, 1, 'one formset');
    equal(this.$('tr:last input').prop('name'), 'form-0-input', 'index 0');
    this.formset.addForm();
    equal(this.$('tr').length, 2, 'two formsets');
    equal(this.$('tr:last input').prop('name'), 'form-1-input', 'index 1');
    this.formset.addForm();
    equal(this.$('tr').length, 3, 'three formsets');
    equal(this.$('tr:last input').prop('name'), 'form-2-input', 'index 2');
  });

}(jQuery));
