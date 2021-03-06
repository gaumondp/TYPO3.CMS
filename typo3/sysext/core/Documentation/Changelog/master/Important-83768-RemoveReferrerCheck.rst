.. include:: ../../Includes.txt

=========================================
Important: #83768 - Remove referrer check
=========================================

See :issue:`83768`

Description
===========

Browser vendors are considering or have already announced **not** to send the referrer URL/path in HTTP requests when
links are followed or forms are submitted due to privacy reasons. TYPO3 used the referrer as a meagre CSRF protection
for the backend. However, this has been replaced by proper CSRF protection tokens for every backend action and therefore,
the referrer check became obsolete and has been removed.

The configuration option :php:`[SYS][doNotCheckReferer]` has been also removed as this is not needed anymore.


Impact
======

Backend users will not notice any differences.

TYPO3 extensions will not longer be able to use :php:`[SYS][doNotCheckReferer]`.


Affected Installations
======================

All installations are affected.


Migration
=========

TYPO3 extensions that use option :php:`[SYS][doNotCheckReferer]` to implement a kind of CSRF protection, should use
proper CSRF protection tokens provided by the core.

.. index:: Backend, FullyScanned
