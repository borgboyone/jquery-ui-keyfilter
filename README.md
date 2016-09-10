# jQuery-ui-keyFilter
Adaptable key filter with intuitive key categories, chainable filters, user filter extension via regular expressions and both allow and deny chain processing.

## Key Categories
Most developers make the mistake of filtering cursor key events on filtered inputs which can cause user frustration especially when they attempt to edit their input.

## Filters
There are three types of filters available in jQuery UI keyFilter.

The first of these are categorical and key code based.  These allow developers to easily target specific groups of characters while at the same time not disturbing the user experience by interfering with cursor or edit actions.

Since every developer has their own notion of alphabetic and numeric classification, I decided against including such filters as part of the base framework.  Instead, I allow developers to declare their own filters using standard regular expressions and pass those in as an option parameter.


## Chaining and Order Processing

## Examples

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
