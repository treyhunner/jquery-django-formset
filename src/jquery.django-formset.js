/* jQuery Django Formset v0.2 | http://th.mit-license.org/2013 */
(function ($) {

  'use strict';

  var updateFieldIndex = function (field, prefix, index) {
    var regex = new RegExp(prefix + '-(\\d+|__prefix__)-'),
        replacement = prefix + '-' + index + '-';
    $.each(['for', 'id', 'name'], function (i, attr) {
      var value = field.prop(attr);
      if (value) {
        field.prop(attr, value.replace(regex, replacement));
      }
    });
  };

  $.djangoFormset = function (parent, options) {
    var formset = this, templateForm;

    function clearForm(form) {
      form.find(':input').each(function () {
        var field = $(this);
        if (field.is(':checkbox') || field.is(':radio')) {
          field.prop('checked', false);
        } else {
          field.val('');
        }
      });
      form.find('.errorlist').remove();
    }

    function prepareForm(form) {
      if (options.deleteSelector) {
        form.find(options.deleteSelector).click(function () {
          formset.deleteForm(form);
          return false;
        });
      }
    }

    this.init = function () {
      // Listen to delete button click events for each form
      this.getForms().each(function () { prepareForm($(this)); });

      // Listen to add button click event
      if (options.addSelector) {
        $(options.addSelector).click(function () {
          return formset._addHandler();
        });
      }

      // Set teplate form
      if (options.emptyFormSelector) {
        templateForm = $('<' + options.tagName + '>');
        templateForm.html($(options.emptyFormSelector).html());
        if (options.className) templateForm.addClass(options.className);
      } else {
        templateForm = this.getForms().filter(':last').clone(true);
        clearForm(templateForm);
      }
    };

    this.createForm = function () {
      var form = templateForm.clone(true);
      form.find(':input').each(function () {
        updateFieldIndex($(this), options.prefix, formset.totalForms());
      });
      prepareForm(form);
      return form;
    };

    this.getForms = function () {
      var selector = options.tagName;
      if (options.className) selector += '.' + options.className;
      return parent.find(selector);
    };

    this.totalForms = function (num) {
      var totalField = $('#id_' + options.prefix + '-TOTAL_FORMS');
      if (typeof num === "undefined") {
        return parseInt(totalField.val(), 10);
      } else {
        return totalField.val(num);
      }
    };

    this.maxNumForms = function (num) {
      var maxNumField = $('#id_' + options.prefix + '-MAX_NUM_FORMS');
      if (typeof num === "undefined") {
        return parseInt(maxNumField.val(), 10);
      } else {
        return maxNumField.val(num);
      }
    };

    this.addForm = function (parent, form) {
      if (options.addForm) {
        options.addForm.call(this, parent, form);
      }
      parent.append(form);
    };

    this.deleteForm = function (form) {
      form.find(':input[id$="-DELETE"]').prop('checked', true);
      form.hide();
      formset.totalForms(formset.getForms().length);
      if (options.deleted) options.deleted.call(formset, form);
    };

    this._addHandler = function () {
      var form = formset.createForm(),
          formCount = formset.totalForms();
      if (formCount >= formset.maxNumForms()) {
        return;  // Don't make more than maximum
      }
      formset.totalForms(formCount + 1);
      formset.addForm.call(formset, parent, form);
      if (options.added) options.added.call(formset, form);
      return false;
    };

    this.init();

  };

  $.fn.djangoFormset = function (opts) {
    var options = $.extend({}, $.fn.djangoFormset.defaults, opts);
    this.data('djangoFormset', new $.djangoFormset(this, options));
    return this;
  };

  $.fn.djangoFormset.defaults = {
    prefix: 'form',
    tagName: 'div',
    className: '',
    emptyFormSelector: null,
    deleteSelector: null,
    addSelector: null,
    addForm: null,
    added: null,
    deleted: null
  };

}(jQuery));
