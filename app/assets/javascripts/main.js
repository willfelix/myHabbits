$(function() {
	/**
	* INIT MATERIAL DESIGN
	*/
	window.mdc.autoInit();

	/**
	*	DRAWER
	*/
	const drawerEl = document.querySelector('.mdc-drawer');
	const drawer = new mdc.drawer.MDCTemporaryDrawer(drawerEl);
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
	const activatedClass = 'mdc-list-item--selected';
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
	const dialog = new mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog'));
	const scheduler = new Scheduler();

	dialog.listen('MDCDialog:accept', function() {
		scheduler.save();
	});

	dialog.listen('MDCDialog:cancel', function() {
		scheduler.clear();
	});

	$('td').click(function (evt) {
		let $tr = $(this).parent();
		let day = scheduler.week[ $tr.find("td").index(this) ];
		let hour = $tr.find(".hour").text();

		scheduler.$schedule.html(`${day} - ${hour}`);
		scheduler.$schedule.data("day", day);
		scheduler.$schedule.data("hour", hour);

		dialog.lastFocusedTarget = evt.target;
		dialog.show();
	});
});

const Scheduler = function () {
	const $schedule = $("#schedule");
	const $reminder = $("#reminder");
	const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

	return {
		$schedule,
		$reminder,
		week,

		all: function() {

		},

		show: function() {

		},

		save: function() {
			alert(this.$reminder.val());
			alert(this.$schedule.html());

			this.clear();
		},

		clear: function() {
			this.$schedule.html("");
			this.$schedule.data("day", "");
			this.$schedule.data("hour", "");

			this.$reminder.val("");
		}
	};

};
