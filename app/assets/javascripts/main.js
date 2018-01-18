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
	*	Scheduler
	*/
	const scheduler = new Scheduler();
	$('td').click( (evt) => {
		if (evt.target !== evt.currentTarget) return;

		let $tr = $(evt.target).parent();
		let day = scheduler.utils.weekdayByIndex( $tr.find("td").index(evt.target) );
		let hour = $tr.find(".hour").text();

		scheduler.dialog.write({day, hour});
		scheduler.dialog.show(evt);
	});

	$('table').on('click', 'td div', (evt) => {
		scheduler.show(evt);
	});

	$('.remove-schedule').click( (evt) => {
		scheduler.remove(evt);
	});
});

const Scheduler = function () {
	const $schedule = $("#schedule");
	const $reminder = $("#reminder");
	const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
	const dao = new DAO();
	const dialog = new mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog'));
	const dialogForShow = new mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog-show'));

	/*
	*	Dialog
	*/
	dialog.listen('MDCDialog:accept', () => {
		console.info("accept");
		save();
	});

	dialog.listen('MDCDialog:cancel', () => {
		console.info("cancel");
		clearDialog();
	});

	let clearDialog = () => {
		writeDialog({});
		$schedule.html("");
	};

	let writeDialog = (params, dialog) => {
		if (dialog) {
			$("#show-dialog-title").html(params.reminder);
			$("#show-dialog-day").html(`
				<i class="material-icons">event</i>&nbsp;&nbsp;${params.day}
			`);
			$("#show-dialog-hour").html(`
				<i class="material-icons">hourglass_empty</i>&nbsp;&nbsp;${params.hour}
			`);

			return;
		}

		$schedule.html(`${params.day} - ${params.hour}`);
		$schedule.data("day", params.day);
		$schedule.data("hour", params.hour);

		$reminder.val(params.reminder);
		$reminder.focus();
	};

	let showDialog = (evt, modal = dialog) => {
		modal.lastFocusedTarget = evt.target;
		modal.show();
	};

	/*
	*	Schedule
	*/
	let show = (evt) => {
		let $el = $(evt.target);
		let day = $el.data("day");
		let hour = $el.data("hour");
		let reminder = $el.html();

		writeDialog({day, hour, reminder}, dialogForShow);
		showDialog(evt, dialogForShow);
	};

	let remove = (evt) => {
		let $el = $(dialogForShow.lastFocusedTarget);
		let id = $el.data("id");
		dao.remove(id);

		$el.fadeOut( () => $el.remove() );
	};

	let save = () => {
		let reminder = $reminder.val();
		let day = $schedule.data("day");
		let hour = $schedule.data("hour");
		let timestamp = Date.now();

		dao.save({ reminder, day, hour }, (id) => {
			$(dialog.lastFocusedTarget).find(`div[data-id=${timestamp}]`).data("id", id);
		});

		$(dialog.lastFocusedTarget).append(
			`<div data-id="${timestamp}" data-day="${day}" data-hour="${hour}">${reminder}</div>`
		);

		clearDialog();
	};

	/*
	* Utils
	*/
	let weekdayByIndex = (index) => week[index];

	return {
		show,
		remove,
		save,
		dialog: {
			clear: clearDialog,
			write: writeDialog,
			show: showDialog
		},
		utils: {
			weekdayByIndex
		}
	};

};

const DAO = function() {
	return {
		all: function(callback) {
			$.get("/schedules", (data) => {
				callback(data);
			});
		},

		remove: function(id) {
			$.post(`/schedule/${id}`, { "_method": "delete" });
		},

		save: function(params, callback) {
			$.post(`/schedules`, params, callback);
		}
	};
};
