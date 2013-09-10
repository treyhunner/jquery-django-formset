/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false, ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
/*global jQuery:false, sinon:false*/

(function ($) {

  'use strict';

  module("Test $.djangoFormset#init");

  test('test template form fields cleared', function () {
    var element, formset;
    expect(5);
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
    equal(element.find('tr:first .errorlist').length, 1, 'errorlist present');
    equal(element.find('tr:last .errorlist').length, 0, 'error list not present');
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
    sinon.stub(formset, "addForm", function () {});
    $('.add-form').trigger('click');
    ok(formset.addForm.calledOnce);
    equal(formset.addForm.firstCall.args.length, 0, 'addForm called without argument');
  });

  test('test delete button selector', function () {
    var element, formset;
    expect(3);
    element = $('#multiple-forms').djangoFormset({
      formSelector: 'tr',
      deleteSelector: '.delete-form',
    });
    formset = element.data('djangoFormset');
    sinon.stub(formset, "deleteForm", function () {});
    element.find('tr:last .delete-form').trigger('click');
    ok(formset.deleteForm.calledOnce);
    equal(formset.deleteForm.firstCall.args.length, 1, 'deleteForm called with 1 argument');
    ok(formset.deleteForm.firstCall.args[0][0].isEqualNode(element.find('tr')[1]));
  });

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

  module("Test $.djangoFormset#deleteForm", {
    setup: function () {
      this.element = $('#multiple-forms').djangoFormset({
        formSelector: 'tr',
      });
      this.formset = this.element.data('djangoFormset');
      this.$ = function () { return this.element.find.apply(this.element, arguments); };
    },
    teardown: function () {
    }
  });

  test('form deleting checks DELETE checkbox', function () {
    expect(3);
    this.formset.deleteForm(this.$('tr:first'));
    equal(this.$('tr').length, 2, 'two formsets still');
    equal(this.$('tr:first input[id$=DELETE]').prop('checked'), true);
    equal(this.$('tr:last input[id$=DELETE]').prop('checked'), false);
  });

  module("Test add/delete form callbacks");

  test('Test added callback', function () {
    var element, formset, callback;
    expect(4);
    callback = sinon.spy();
    element = $('#multiple-forms').djangoFormset({
      formSelector: 'tr',
      added: callback,
    });
    formset = element.data('djangoFormset');
    formset.addForm();
    equal(element.find('tr').length, 3, 'three formsets');
    ok(callback.calledOnce, 'added callback called exactly once');
    ok(callback.args[0][0][0].isEqualNode(element.find('tr:last')[0]), 'called with new form');
    equal(callback.thisValues[0], formset, 'callback called in context of formset');
  });

  test('Test deleted callback', function () {
    var element, formset, callback;
    expect(5);
    callback = sinon.spy();
    element = $('#multiple-forms').djangoFormset({
      formSelector: 'tr',
      deleted: callback,
    });
    formset = element.data('djangoFormset');
    formset.deleteForm(element.find('tr:first'));
    equal(element.find('tr').length, 2, 'two formsets still');
    equal(element.find('tr:first input[id$=DELETE]').prop('checked'), true);
    ok(callback.calledOnce, 'deleted callback called exactly once');
    ok(callback.args[0][0][0].isEqualNode(element.find('tr:first')[0]), 'called with first form');
    equal(callback.thisValues[0], formset, 'callback called in context of formset');
  });

}(jQuery));
