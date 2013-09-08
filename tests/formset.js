/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false, ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
/*global jQuery:false, sinon:false*/

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

  test('test maximum forms', function () {
    var i;
    expect(4);
    for (i = 0; i < 10; i++) {
      this.formset.addForm();
    }
    equal(this.$('tr').length, 10, 'ten formsets');
    equal(this.$('tr:last input').prop('name'), 'form-9-input', 'index 9');
    this.formset.addForm();
    equal(this.$('tr').length, 10, 'still only ten formsets');
    equal(this.$('tr:last input').prop('name'), 'form-9-input', 'still index 9');
  });

  module("Test $.djangoFormset#init");

  test('test template form fields cleared', function () {
    var element, formset;
    expect(3);
    element = $('#form-with-data').djangoFormset({formSelector: 'tr'});
    formset = element.data('djangoFormset');
    formset.addForm();
    equal(element.find('tr').length, 2, 'two formsets');
    deepEqual(
      element.find('tr:first :input').serialize(),
      'form-0-email=example%40example.com&form-0-checkbox=1&form-0-textarea=',
      'initial form is filled'
    );
    deepEqual(
      element.find('tr:last :input').serialize(),
      'form-1-email=&form-1-textarea=',
      'new form is blank'
    );
  });

  test('test prefix specified', function () {
    var element, formset;
    expect(6);
    element = $('#form-with-custom-prefix').djangoFormset({
      formSelector: 'tr',
      prefix: 'prefix',
    });
    formset = element.data('djangoFormset');
    equal(element.find('tr').length, 1, 'one formset');
    equal(element.find('tr:last input').prop('name'), 'prefix-0-input', 'index 0');
    formset.addForm();
    equal(element.find('tr').length, 2, 'two formsets');
    equal(element.find('tr:last input').prop('name'), 'prefix-1-input', 'index 1');
    formset.addForm();
    equal(element.find('tr').length, 2, 'still only two formsets');
    equal(element.find('tr:last input').prop('name'), 'prefix-1-input', 'index 1 still');
  });

  test('test add button selector', function () {
    var element, formset;
    expect(2);
    element = $('#single-form').djangoFormset({
      formSelector: 'tr',
      addSelector: '.add-form',
    });
    formset = element.data('djangoFormset');
    sinon.spy(formset, "addForm");
    $('.add-form').trigger('click');
    ok(formset.addForm.calledOnce);
    equal(formset.addForm.firstCall.args.length, 0, 'addForm called without argument');
  });

}(jQuery));
