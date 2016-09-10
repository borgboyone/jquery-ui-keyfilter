# jQuery-ui-keyFilter
Adaptable key filter with intuitive key categories, chainable filters, user filter extension via regular expressions and both allow and deny chain processing.

## Filters
There are four types of filters available in jQuery UI keyFilter: Exclusive/Inclusive, Non Printable Keys and their aggregated Key Categories, user supplied named regular expression patterns, and inline functions.  These filters allow for coverage of many types of key filtering scenarios and in combination can provide complex input control.

### Exclusive and Inclusive
The main purpose of these filters is to provide catch-all's in the filter chain(s).  They are '\*' and 'none' and take on different functionality depending on their usage in the *allow* chain verses the *deny*' chain.  In an *allow* filter, '\*' will pass any key stroke where 'none' will block all keystrokes.  In a *deny* filter they function opposite, '\*' will block all keystrokes and 'none' will allow all keystrokes.  Not using them as a terminal will most likely result in unhandled key press events and corresponding console warnings to that effect.

### Non Printable Keys and Key Categories

Most developers make the mistake of filtering cursor key events on filtered inputs which can cause user frustration especially when they attempt to edit their input.
The first of these are categorical and key code based.  These allow developers to easily target specific groups of characters while at the same time not disturbing the user experience by interfering with cursor or edit actions.

### Named Regular Expressions
Since every developer has their own notion of alphabetic and numeric classification, I decided against including such filters as part of the base framework.  Instead developers can declare their own filters using standard regular expressions and pass those in as a parameter to the widget.  Each regular expression must be assigned to a non-conflicting name (eg. an Ojbect: {'numeric': '[0-9]'}) and the corresponding expression should be JavaScript compatible.

### Function Handlers
A conduit is provided for developers to pass in their own keypress event evaluation function.  It should return true if the condition is satisfied; any other value is ignored.

## Chaining and Order Processing

## Examples
This example adds a base set of regexp filters to the underlying widget and then sets-up a filter on an input where only non printable key strokes (ie. cursor and edit keys) and number keys are allowed.

    $.widget( "aw.keyFilter", $.aw.keyFilter, {
		'options': {
			'filters': {
				'NUMERIC': '[0-9]',
				'ALPHABETIC': '[a-zA-Z]',
				'ALPHANUMERIC': '[a-zA-Z0-9]',
				'HEXADECIMAL': '[a-fA-F0-9]'
			}
		}
	});
	$('.color-input').keyFilter({
		'allow': [$.aw.keyFilter.NON_PRINTABLE, 'NUMERIC'], 
		'deny': '*',
		'order': 'allow,deny'
	});

This example is a condensed variant of the previous example with a cheeky addition to the underlying widget.

	$.aw.keyFilter['NUMERIC'] = 'NUMERIC';
	$('.color-input').keyFilter({
		'allow': [$.aw.keyFilter.NON_PRINTABLE, $.aw.keyFilter.NUMERIC, 'none'],
		'order': 'allow'
	});

