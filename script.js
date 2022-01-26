//check the console for date click event

function CalendarControl() {
    const calendar = new Date();
    const calendarControl = {
      localDate: new Date(),
      calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      calMonthName: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      daysInMonth: function(month, year) {
        return new Date(year, month, 0).getDate();
      },
      firstDay: function() {
        return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
      },
      lastDay: function() {
        return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
      },
      firstDayNumber: function() {
        return calendarControl.firstDay().getDay() + 1;
      },
      lastDayNumber: function() {
        return calendarControl.lastDay().getDay() + 1;
      },
      getPreviousMonthLastDate: function() {
        let lastDate = new Date(
          calendar.getFullYear(),
          calendar.getMonth(),
          0
        ).getDate();
        return lastDate;
      },
      navigateToPreviousMonth: function() {
        calendar.setMonth(calendar.getMonth() - 1);
        calendarControl.attachEventsOnNextPrev();
      },
      navigateToNextMonth: function() {
        calendar.setMonth(calendar.getMonth() + 1);
        calendarControl.attachEventsOnNextPrev();
      },
      navigateToCurrentMonth: function() {
        let currentMonth = calendarControl.localDate.getMonth();
        let currentYear = calendarControl.localDate.getFullYear();
        calendar.setMonth(currentMonth);
        calendar.setYear(currentYear);
        calendarControl.attachEventsOnNextPrev();
      },
      displayYear: function() {
        let yearLabel = document.querySelector(".calendar .calendar-year-label");
        yearLabel.innerHTML = calendar.getFullYear();
      },
      displayMonth: function() {
        let monthLabel = document.querySelector(
          ".calendar .calendar-month-label"
        );
        monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
      },
      selectDate: function(e) {
        console.log(
          `${e.target.textContent} ${
            calendarControl.calMonthName[calendar.getMonth()]
          } ${calendar.getFullYear()}`
        );
      },
      plotSelectors: function() {
        document.querySelector(
          ".calendar"
        ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
        <div class="calendar-prev"><a href="#"><</a></div>
        <div class="calendar-year-month">
        <div class="calendar-month-label"></div>
        <div>-</div>
        <div class="calendar-year-label"></div>
        </div>
        <div class="calendar-next"><a href="#">></a></div>
        </div>
        <div class="calendar-today-date">Today: 
          ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
          ${calendarControl.localDate.getDate()}, 
          ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
          ${calendarControl.localDate.getFullYear()}
        </div>
        <div class="calendar-body"></div></div>`;
      },
      plotDayNames: function() {
        for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
          document.querySelector(".calendar .calendar-body").innerHTML += `<div>${
            calendarControl.calWeekDays[i]
          }</div>`;
        }
      },
      plotDates: function() {
        document.querySelector(".calendar .calendar-body").innerHTML = "";
        calendarControl.plotDayNames();
        calendarControl.displayMonth();
        calendarControl.displayYear();
        let count = 1;
        let prevDateCount = 0;
       
        //let prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
        let calendarDays = calendarControl.daysInMonth(
          calendar.getMonth() + 1,
          calendar.getFullYear()
        );
        // dates of current month
        for (let i = 1; i < calendarDays; i++) {
          if (i < calendarControl.firstDayNumber()) {
            prevDateCount += 1;
            document.querySelector(
              ".calendar .calendar-body"
            ).innerHTML += `<div class="empty-dates"></div>`;
          } else {
              document.querySelector(
                ".calendar .calendar-body"
              ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
          }
        }
        //remaining dates after month dates
        for (let j = 0; j < prevDateCount + 1; j++) {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
        //highlight today
        setTimeout(function(){
            calendarControl.highlightToday();
        }, 300);        
      },
      attachEvents: function() {
        let prevBtn = document.querySelector(".calendar .calendar-prev a");
        let nextBtn = document.querySelector(".calendar .calendar-next a");
        let todayDate = document.querySelector(".calendar .calendar-today-date");
        let dateNumber = document.querySelectorAll(".calendar .dateNumber");
        prevBtn.addEventListener(
          "click",
          calendarControl.navigateToPreviousMonth
        );
        nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
        todayDate.addEventListener(
          "click",
          calendarControl.navigateToCurrentMonth
        );
        for (var i = 0; i < dateNumber.length; i++) {
          dateNumber[i].addEventListener(
            "click",
            calendarControl.selectDate,
            false
          );
        }
      },
      attachEventsOnNextPrev: function() {
        calendarControl.plotDates();
        calendarControl.attachEvents();
      },
      init: function() {
        calendarControl.plotSelectors();
        calendarControl.plotDates();
        calendarControl.attachEvents();
      },
      highlightToday: function() {
        let currentMonth = calendarControl.localDate.getMonth() + 1;
        let changedMonth = calendar.getMonth() + 1;
        let currentYear = calendarControl.localDate.getFullYear();
        let changedYear = calendar.getFullYear();
        if(currentYear === changedYear && currentMonth === changedMonth && document.querySelectorAll('.number-item')) {
            document.querySelectorAll('.number-item')[calendar.getDate() - 1].classList.add('calendar-today');
        }
      }
    };
    calendarControl.init();
  }
  
  const calendarControl = new CalendarControl();
  
