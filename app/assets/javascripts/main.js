$(function() {
	/**
	* INIT MATERIAL DESIGN
	*/
	window.mdc.autoInit();

	/**
	*	DRAWER
	*/
	var drawerEl = document.querySelector('.mdc-drawer');
	var MDCTemporaryDrawer = mdc.drawer.MDCTemporaryDrawer;
	var drawer = new MDCTemporaryDrawer(drawerEl);
	document.querySelector('.menu').addEventListener('click', function() {
		drawer.open = true;
	});
	drawerEl.addEventListener('MDCTemporaryDrawer:open', function() {
		console.log('Received MDCTemporaryDrawer:open');
	});
	drawerEl.addEventListener('MDCTemporaryDrawer:close', function() {
		console.log('Received MDCTemporaryDrawer:close');
	});

	// Demonstrate application of --activated modifier to drawer menu items
	var activatedClass = 'mdc-list-item--selected';
	document.querySelector('.mdc-drawer__drawer').addEventListener('click', function(event) {
		var el = event.target;
		while (el && !el.classList.contains('mdc-list-item')) {
			el = el.parentElement;
		}
		if (el) {
			var activatedItem = document.querySelector('.' + activatedClass);
			if (activatedItem) {
				activatedItem.classList.remove(activatedClass);
			}
			event.target.classList.add(activatedClass);
		}
	});

	/**
	*	DIALOG
	*/
	var dialog = new mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog'));

	dialog.listen('MDCDialog:accept', function() {
		console.log('accepted');
	});

	dialog.listen('MDCDialog:cancel', function() {
		console.log('canceled');
	});

	$('td').click(function (evt) {
		var $tr = $(this).parent();
		var index = $tr.find("td").index(this);
		var day = dayByIndex(index);
		var hour = $tr.find(".hour").text();

		$("#selected-hour").html(`${day} - ${hour}`);

		dialog.lastFocusedTarget = evt.target;
		dialog.show();
	});

	function dayByIndex(index) {
		var week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
		return week[index];
	}
});
