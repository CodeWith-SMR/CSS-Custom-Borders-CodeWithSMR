// 'use strict';
console.log('working...');

// point : all the variables
const calendar = document.querySelector('.calendar');
const date = document.querySelector('.date');
const daysContainer = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const todayBtn = document.querySelector('.today-btn');
const gotoBtn = document.querySelector('.goto-btn');
const dateInput = document.querySelector('.date-input');
const eventDay = document.querySelector('.event-day');
const eventDate = document.querySelector('.event-date');
const eventsContainer = document.querySelector('.events');
const addEventSubmitBtn = document.querySelector('.add-event-btn');

// point : all the initial values
let today = new Date();
// console.log(today);
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

// point : init calendar
// const eventsArr = [
// 	{
// 		day: 7,
// 		month: 5,
// 		year: 2023,
// 		events: [
// 			{
// 				title: 'Event 1 : the weather is nice today',
// 				time: '10:00 AM',
// 			},
// 			{
// 				title: "Event 2 : is'nt the moon beautiful tonight",
// 				time: '11:00 AM',
// 			},
// 		],
// 	},
// 	{
// 		day: 10,
// 		month: 5,
// 		year: 2023,
// 		events: [
// 			{
// 				title: 'Event 1 : the weather is nice today',
// 				time: '10:00 AM',
// 			},
// 		],
// 	},
// ];
// point : set a empty array to store events
let eventsArr = [];
getEvents();
// point : function to add days
function initCalendar(y, m) {
	// to get prev months days and current month all days and next months days
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const prevLastDay = new Date(year, month, 0);
	// const prevDays = prevLastDay.getDate();
	const prevDays = new Date(year, month, 0).getDate();
	const lastDate = lastDay.getDate();
	const day = firstDay.getDay();
	const nextDays = 7 - lastDay.getDay() - 1;

	// point : update date top of the calendar
	date.innerHTML = months[month] + ' ' + year;

	// point : add days on dom

	let days = '';
	// point : add prev months days
	// for (let i = day; i > 0; i--) {
	// 	days += `<div class="day prev-date">${prevDays - i + 1}</div>`;
	// }

	for (let i = day - 1; i >= 0; i--) {
		days += `<div class="day prev-date">${prevDays - i}</div>`;
	}

	// point : add current months days
	for (let i = 1; i <= lastDate; i++) {
		// point : check if event exists on current day

		let event = false;
		eventsArr.forEach((eventObj) => {
			if (
				eventObj.day === i &&
				eventObj.month === month + 1 &&
				eventObj.year === year
			) {
				event = true;
			}
		});

		// point : add active class to current day

		if (
			i === today.getDate() &&
			month === today.getMonth() &&
			year === today.getFullYear()
		) {
			// / days += `<div class="day today ">${i}</div>`;
			// point  : if event found also add event class
			activeDay = i;
			getActiveDay(i);
			updateEvents(i);
			if (event) {
				days += `<div class="day today active  event">${i}</div>`;
			} else {
				days += `<div class="day today active ">${i}</div>`;
			}
		} else {
			if (event) {
				days += `<div class="day event">${i}</div>`;
			} else {
				days += `<div class="day">${i}</div>`;
			}
		}
	}

	// point : add next months days
	for (let i = 1; i <= nextDays; i++) {
		days += `<div class="day next-date">${i}</div>`;
	}

	daysContainer.innerHTML = days;

	// point : add listener to days
	addListener();

	return days;
}

initCalendar();

//  point : add event listener to prev and next button
prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);
// prev month
function prevMonth() {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	initCalendar();
}
// next month
function nextMonth() {
	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	initCalendar();
}

// point : add event listener to days
// daysContainer.addEventListener('click', (e) => {
// 	if (e.target.classList.contains('day')) {
// 		if (activeDay) {
// 			activeDay.classList.remove('active');
// 		}
// 		e.target.classList.add('active');
// 		activeDay = e.target;
// 	}
// });

// point : add event listener to today button
todayBtn.addEventListener('click', () => {
	month = today.getMonth();
	year = today.getFullYear();
	initCalendar();
	// console.log('today');
});

// point : add event listener to goto button
dateInput.addEventListener('input', (e) => {
	// point : allow only numbers
	dateInput.value = dateInput.value.replace(/[^0-9/]/g, '');
	// point : check if date is valid
	if (dateInput.value.length === 2) {
		dateInput.value += '/';
	}
	if (dateInput.value.length > 7) {
		dateInput.value = dateInput.value.slice(0, 7);
	}
	// point : if backspace pressed
	if (e.inputType === 'deleteContentBackward') {
		if (dateInput.value.length === 3) {
			dateInput.value = dateInput.value.slice(0, 2);
		}
	}
});

// point : add event listener to goto button on click on enter
dateInput.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		gotoDate();
	}
});

// point : function to go to date
gotoBtn.addEventListener('click', gotoDate);
function gotoDate() {
	const dateArr = dateInput.value.split('/');

	if (dateArr.length === 2) {
		if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
			month = dateArr[0] - 1;
			year = dateArr[1];
			initCalendar();
			return;
		}
	}
	// if invalid data
	alert('Invalid Date');
}

/// task for right part of the calendar

// point : all the variables
const addEventBtn = document.querySelector('.add-event');
const addEventContainer = document.querySelector('.add-event-wrapper');
const addEventCloseBtn = document.querySelector('.close');
const addEventName = document.querySelector('.event-name');
const addEventFrom = document.querySelector('.event-time-from');
const addEventTo = document.querySelector('.event-time-to');

// point : add event listener to add event button
addEventBtn.addEventListener('click', () => {
	addEventContainer.classList.toggle('active');
});

// point : add event listener to close button
addEventCloseBtn.addEventListener('click', () => {
	addEventContainer.classList.remove('active');
});

// point : add event listener to document (to close add event container when clicked outside)
document.addEventListener('click', (e) => {
	if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
		addEventContainer.classList.remove('active');
	}
});

// allow only 50 chars in event name
addEventName.addEventListener('input', (e) => {
	if (e.target.value.length > 50) {
		e.target.value = e.target.value.slice(0, 50);
	}
});

// time validation
addEventFrom.addEventListener('input', (e) => {
	// point : allow only numbers
	addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '');
	// point : check if time is valid
	if (addEventFrom.value.length === 2) {
		addEventFrom.value += ':';
	}
	// point : don't late the user to enter more than 5 chars
	if (addEventFrom.value.length > 5) {
		addEventFrom.value = addEventFrom.value.slice(0, 5);
	}
	// point : if backspace pressed
	if (e.inputType === 'deleteContentBackward') {
		if (addEventFrom.value.length === 3) {
			addEventFrom.value = addEventFrom.value.slice(0, 2);
		}
	}
});

addEventTo.addEventListener('input', (e) => {
	// point : allow only numbers
	addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '');
	// point : check if time is valid
	if (addEventTo.value.length === 2) {
		addEventTo.value += ':';
	}
	// point : don't late the user to enter more than 5 chars
	if (addEventTo.value.length > 5) {
		addEventTo.value = addEventTo.value.slice(0, 5);
	}
	// point : if backspace pressed
	if (e.inputType === 'deleteContentBackward') {
		if (addEventTo.value.length === 3) {
			addEventTo.value = addEventTo.value.slice(0, 2);
		}
	}
});

//  point : add event listener to add event button

function addListener() {
	const days = document.querySelectorAll('.day');
	days.forEach((day) => {
		day.addEventListener('click', (e) => {
			getActiveDay(e.target.innerHTML);
			updateEvents(Number(e.target.innerHTML));
			activeDay = Number(e.target.innerHTML);
			// point : remove active
			days.forEach((day) => {
				day.classList.remove('active');
			});
			// point : if clicked prev-date or next-date switch to that month
			if (e.target.classList.contains('prev-date')) {
				prevMonth();
				// point : add active to clicked day afte month is change
				setTimeout(() => {
					// point : add active where no prev-date or next-date
					const days = document.querySelectorAll('.day');
					days.forEach((day) => {
						if (
							!day.classList.contains('prev-date') &&
							day.innerHTML === e.target.innerHTML
						) {
							day.classList.add('active');
						}
					});
				}, 100);
			} else if (e.target.classList.contains('next-date')) {
				nextMonth();
				// point : add active to clicked day afte month is changed
				setTimeout(() => {
					const days = document.querySelectorAll('.day');
					days.forEach((day) => {
						if (
							!day.classList.contains('next-date') &&
							day.innerHTML === e.target.innerHTML
						) {
							day.classList.add('active');
						}
					});
				}, 100);
			} else {
				// remaining current month days
				e.target.classList.add('active');
			}
		});
	});
}

// point : function to get active day

function getActiveDay(date) {
	const day = new Date(year, month, date);
	const dayName = day.toString().split(' ')[0];
	eventDay.innerHTML = dayName;
	eventDate.innerHTML = date + ' ' + months[month] + ' ' + year;
}

// point : function to show events of  that day

function updateEvents(date) {
	let events = '';
	eventsArr.forEach((eventObj) => {
		// point : get events of active day only
		if (
			date === eventObj.day &&
			month + 1 === eventObj.month &&
			year === eventObj.year
		) {
			eventObj.events.forEach((event) => {
				events += `<div class="event">
					<div class="title">
						<i class="fas fa-circle"></i>
						<h3 class="event-title">${event.title}</h3>
					</div>
					<div class="event-time">
						${event.time}
					</div>
				</div>`;
			});
		}
	});

	// point : if no events found
	if (events === '') {
		events = `<div class="no-event">No Events ! ADD some...</div>`;
	}

	eventsContainer.innerHTML = events;

	// point : save events in local storage
	saveEvents();
}

// point : creates a function  to add events

addEventSubmitBtn.addEventListener('click', () => {
	const eventTitle = addEventName.value;
	const eventTimeFrom = addEventFrom.value;
	const eventTimeTo = addEventTo.value;

	// point : check if all fields are filled

	if (eventTitle === '' || eventTimeFrom === '' || eventTimeTo === '') {
		alert('Please fill all the fields');
		return;
	}

	const timeFromArr = eventTimeFrom.split(':');
	const timeToArr = eventTimeTo.split(':');

	// point : check if time is valid
	if (
		timeFromArr.length !== 2 ||
		timeToArr.length !== 2 ||
		timeFromArr[0] > 23 ||
		timeFromArr[1] > 59 ||
		timeToArr[0] > 23 ||
		timeToArr[1] > 59
	) {
		alert('Invalid Time Format !');
		return; // / to stop the function
	}

	const timeFrom = convertTime(eventTimeFrom);
	const timeTo = convertTime(eventTimeTo);

	// point : new event object
	const newEvent = {
		title: eventTitle,
		time: timeFrom + ' - ' + timeTo,
	};

	let eventAdded = false;
	// check if event already exists on that day
	if (eventsArr.length > 0) {
		// point  : check if event already exists on that day
		eventsArr.forEach((eventObj) => {
			if (
				eventObj.day === activeDay &&
				eventObj.month === month + 1 &&
				eventObj.year === year
			) {
				eventObj.events.push(newEvent);
				eventAdded = true;
			}
		});
	}

	// point : if no event found on that day
	if (!eventAdded) {
		const newEventObj = {
			day: activeDay,
			month: month + 1,
			year: year,
			events: [newEvent],
		};
		eventsArr.push(newEventObj);
	}

	// point : remove active from add event form
	addEventContainer.classList.remove('active');
	// clear the form
	addEventName.value = '';
	addEventFrom.value = '';
	addEventTo.value = '';

	// point : update events
	updateEvents(activeDay);

	// point:   also add event class to newly added day if not already added
	const activeDayElement = document.querySelector('.day.active');
	if (!activeDayElement.classList.contains('event')) {
		activeDayElement.classList.add('event');
	}
});

// point : function to convert time to 12 hour format
function convertTime(time) {
	let timeArr = time.split(':');
	let timeHours = Number(timeArr[0]);
	let timeMinutes = Number(timeArr[1]);
	// let timeValue;
	let timeFormate = timeHours >= 12 ? 'PM' : 'AM';
	timeHours = timeHours % 12 || 12;
	time = timeHours + ':' + timeMinutes + ' ' + timeFormate;
	return time;
}

// point : function to delete event
eventsContainer.addEventListener('click', (e) => {
	if (e.target.classList.contains('event')) {
		const eventTitle = e.target.children[0].children[1].innerHTML;
		/// get the title of the event than search in array by title and delete it
		eventsArr.forEach((eventObj) => {
			if (
				eventObj.day === activeDay &&
				eventObj.month === month + 1 &&
				eventObj.year === year
			) {
				eventObj.events.forEach((event, index) => {
					if (event.title === eventTitle) {
						eventObj.events.splice(index, 1);
					}
				});

				// / if no events left remove event class from day
				if (eventObj.events.length === 0) {
					eventsArr.splice(eventsArr.indexOf(eventObj), 1);
					// / after remove complete event object check if event class is present on that day

					const activeDayElement = document.querySelector('.day.active');
					activeDayElement.classList.remove('event');
				}
			}
		});

		// point :  after removing from array update events
		updateEvents(activeDay);
	}
});

//  add local storage on the events
// point : function to save events in local storage
function saveEvents() {
	localStorage.setItem('events', JSON.stringify(eventsArr));
}

function getEvents() {
	if (localStorage.getItem('events') === null) {
		return;
	}
	eventsArr.push(...JSON.parse(localStorage.getItem('events')));
}

// Get the year dropdown and year list
const yearDropdown = document.querySelector('.year-dropdown');
const yearList = document.querySelector('#year-list');

// Populate the year dropdown with options
for (let year = 2023; year >= 1900; year--) {
	const option = document.createElement('option');
	option.value = year;
	option.text = year;
	yearList.appendChild(option);
}

// Handle changes to the selected year
yearList.addEventListener('change', function () {
	const selectedYear = yearList.value;
	console.log(`Selected year: ${selectedYear}`);
	// calendar.innerHTML = selectedYear;
	const calendarHTML = initCalendar(selectedYear, 0);
	calendar.innerHTML = calendarHTML;
});

console.log(initCalendar());
