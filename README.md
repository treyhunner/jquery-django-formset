jQuery Django Formset
=====================

[![Build Status](https://secure.travis-ci.org/treyhunner/jquery-django-formset.png?branch=master)](http://travis-ci.org/treyhunner/jquery-django-formset)
[![Coverage Status](https://coveralls.io/repos/treyhunner/jquery-django-formset/badge.png?branch=master)](https://coveralls.io/r/treyhunner/jquery-django-formset)

Usage
-----

    $('table.my-formset').djangoFormset({
      tagName: 'tr',
      className: 'form',
      emptyFormSelector: 'tr.empty-form',
      deleteSelector: '.delete-row',
      addSelector: '.add-row',
      minForms: 1,
      addForm: function (parentElement, form) {
        parentElement.append(form);  // This is the default
      },
      added: function (form) {
        // Code that gets executed when form is added
      },
      deleted: function (form) {
        // Code that gets executed when form is deleted
      }
    });

License
-------

Distributed under [MIT License][]

[MIT License]: http://th.mit-license.org/2013
