jQuery Django Formset
=====================

[![Build Status](https://secure.travis-ci.org/treyhunner/jquery-django-formset.png?branch=master)](http://travis-ci.org/treyhunner/jquery-django-formset)
[![Coverage Status](https://coveralls.io/repos/treyhunner/jquery-django-formset/badge.png?branch=master)](https://coveralls.io/r/treyhunner/jquery-django-formset)

Usage
-----

Basic Usage:

    $('table.my-formset').djangoFormset({
      tagName: 'tr',
      deleteSelector: '.delete-form',
      addSelector: '.add-form'
    });

Advanced Usage:

    $('table.my-formset').djangoFormset({
      tagName: 'tr',
      className: 'form',
      emptyFormSelector: 'tr.empty-form',
      deleteSelector: '.delete-form',
      addSelector: '.add-form',
      minForms: 1,
      added: function (form) {
        // Code that gets executed when form is added
      },
      deleted: function (form) {
        // Code that gets executed when form is deleted
      }
    });

Contributing
------------

Please read the [CONTRIBUTING.md][] file before submitting an issue or pull request.

License
-------

Distributed under [MIT License][]

[MIT License]: http://th.mit-license.org/2013
[CONTRIBUTING.md]: CONTRIBUTING.md
