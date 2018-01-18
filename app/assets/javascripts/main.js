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
	document.querySelector('.menu').addEventListener('click', () => drawer.open = true );
	drawerEl.addEventListener('MDCTemporaryDrawer:open', () => console.log('Received MDCTemporaryDrawer:open') );
	drawerEl.addEventListener('MDCTemporaryDrawer:close', () => console.log('Received MDCTemporaryDrawer:close') );

	// Demonstrate application of --activated modifier to drawer menu items
	const activatedClass = 'mdc-list-item--selected';
	document.querySelector('.mdc-drawer__drawer').addEventListener('click', (event) => {
		let el = event.target;
		while (el && !el.classList.contains('mdc-list-item')) {
			el = el.parentElement;
		}

		if (el) {
			let activatedItem = document.querySelector('.' + activatedClass);
			if (activatedItem) {
				activatedItem.classList.remove(activatedClass);
			}
			event.target.classList.add(activatedClass);
		}
	});

	/**
	*	DIALOG
	*/
	const scheduler = new Scheduler();
	$('td').click(function (evt) {
		let $tr = $(this).parent();
		let day = scheduler.week[ $tr.find("td").index(this) ];
		let hour = $tr.find(".hour").text();

		scheduler.write(day, hour);
		scheduler.showDialog(evt);
	});
});

const Scheduler = function () {
	const $schedule = $("#schedule");
	const $reminder = $("#reminder");
	const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
	const dialog = new mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog'));

	dialog.listen('MDCDialog:accept', () => {
		console.info("accept");
		save();
	});

	dialog.listen('MDCDialog:cancel', () => {
		console.info("cancel");
		clear();
	});

	let all = () => {};

	let show = () => {};

	let save = () => {
		alert($reminder.val());
		alert($schedule.html());

		clear();
	};

	let clear = () => {
		$schedule.html("");
		$schedule.data("day", "");
		$schedule.data("hour", "");

		$reminder.val("");
	};

	let write = (day, hour) => {
		$schedule.html(`${day} - ${hour}`);
		$schedule.data("day", day);
		$schedule.data("hour", hour);
	};

	let showDialog = (evt) => {
		dialog.lastFocusedTarget = evt.target;
		dialog.show();
	};

	return {
		week,
		all,
		show,
		save,
		clear,
		write,
		showDialog
	};

};
