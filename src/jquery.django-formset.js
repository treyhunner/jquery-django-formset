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

  $.djangoFormset = function (element, options) {
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
        form.on('click', options.deleteSelector, function () {
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
        templateForm = this.getForms().filter(':last').clone(false);
        clearForm(templateForm);
      }
    };

    this.createForm = function () {
      var form = templateForm.clone(false),
          formCount = formset.totalForms();
      form.find(':input').each(function () {
        updateFieldIndex($(this), options.prefix, formCount);
      });
      return form;
    };

    this.getForms = function () {
      var selector = options.tagName;
      if (options.className) selector += '.' + options.className;
      return element.children(selector);
    };

    this.totalForms = function (num) {
      var totalField = $('#id_' + options.prefix + '-TOTAL_FORMS');
      if (typeof num === "undefined") {
        return parseInt(totalField.val(), 10);
      } else {
        return totalField.val(num);
      }
    };

    this.totalVisibleForms = function () {
      return this.getForms().filter(':visible').length;
    };

    this.maxNumForms = function (num) {
      var maxNumField = $('#id_' + options.prefix + '-MAX_NUM_FORMS');
      if (typeof num === "undefined") {
        return parseInt(maxNumField.val(), 10);
      } else {
        return maxNumField.val(num);
      }
    };

    this.addForm = function (parentElement, form) {
      if (options.addForm) {
        options.addForm.call(this, parentElement, form);
      }
      parentElement.append(form);
    };

    this.deleteForm = function (form) {
      form.find(':input[id$="-DELETE"]').prop('checked', true);
      form.hide();
      formset.totalForms(formset.getForms().length);
      if (options.deleted) options.deleted.call(formset, form);
    };

    this.canAddForm = function () {
      return this.totalVisibleForms() < formset.maxNumForms();
    };

    this._addHandler = function () {
      var form = formset.createForm();
      if (!formset.canAddForm()) return;  // Don't make more than maximum
      formset.totalForms(formset.totalForms() + 1);
      formset.addForm.call(formset, formset.element, form);
      prepareForm(form);
      if (options.added) options.added.call(formset, form);
      return false;
    };

    this.init();
    this.element = element;
    this.options = options;

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
