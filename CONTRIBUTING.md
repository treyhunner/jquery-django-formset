Contributing
============

Submitting Issues
-----------------

Issues are often easier to reproduce/resolve when they have:

- A pull request with a failing test demonstrating the issue
- A code example that produces the issue consistently
- A traceback (when applicable)

Pull Requests
-------------

When creating a pull request, try to:

- Write tests if applicable
- Follow the existing code style (see `.jshintrc` and `.editorconfig` files)
- Update the [README.md][] file if needed
- Add yourself to the [AUTHORS.md][] file

Testing
-------

You will need [NodeJS][] installed to run the tests.  You will also need `grunt-cli` installed system-wide:

    sudo npm install -g grunt-cli

First install the dependencies:

    npm install

To run the tests from the command line:

    grunt

**Please note**: Before a pull request can be merged, all tests must pass and code/branch coverage in tests must be 100%.

[README.md]: README.md
[AUTHORS.md]: AUTHORS.md
[NodeJS]: http://nodejs.org/
