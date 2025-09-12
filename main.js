// Your JSON data
const activityData = [
  {
    title: "Work",
    timeframes: {
      daily: {
        current: 5,
        previous: 7,
      },
      weekly: {
        current: 32,
        previous: 36,
      },
      monthly: {
        current: 103,
        previous: 128,
      },
    },
  },
  {
    title: "Play",
    timeframes: {
      daily: {
        current: 1,
        previous: 2,
      },
      weekly: {
        current: 10,
        previous: 8,
      },
      monthly: {
        current: 23,
        previous: 29,
      },
    },
  },
  {
    title: "Study",
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 7,
      },
      monthly: {
        current: 13,
        previous: 19,
      },
    },
  },
  {
    title: "Exercise",
    timeframes: {
      daily: {
        current: 1,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 5,
      },
      monthly: {
        current: 11,
        previous: 18,
      },
    },
  },
  {
    title: "Social",
    timeframes: {
      daily: {
        current: 1,
        previous: 3,
      },
      weekly: {
        current: 5,
        previous: 10,
      },
      monthly: {
        current: 21,
        previous: 23,
      },
    },
  },
  {
    title: "Self Care",
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 2,
        previous: 2,
      },
      monthly: {
        current: 7,
        previous: 11,
      },
    },
  },
];

let currentTimeframe = "weekly";

// Function to get the background class for each activity
function getActivityClass(title) {
  return title.toLowerCase().replace(" ", "-") + "-bg";
}
function getIconName(title) {
  return title.toLowerCase().replace(" ", "-");
}

// Function to get the previous period text
function getPreviousText(timeframe) {
  switch (timeframe) {
    case "daily":
      return "Yesterday";
    case "weekly":
      return "Last Week";
    case "monthly":
      return "Last Month";
    default:
      return "Previous";
  }
}

// Function to render activity cards
function renderActivities(timeframe) {
  const container = document.getElementById("activity-container");
  container.innerHTML = "";

  activityData.forEach((activity) => {
    const data = activity.timeframes[timeframe];
    const currentHours = data.current;
    const previousHours = data.previous;
    const previousText = getPreviousText(timeframe);

    // const cardHTML = `
    //         <div class="col-4">
    //           <div class="activity-card">
    //             <div class="activity-bg ${getActivityClass(
    //               activity.title
    //             )}"></div>
    //             <div class="activity-content">
    //               <div class="activity-header">
    //                 <h3 class="activity-title">${activity.title}</h3>
    //                 <span class="activity-menu">⋯</span>
    //               </div>
    //               <div>
    //                 <div class="activity-time">${currentHours}hrs</div>
    //                 <div class="activity-previous">${previousText} - ${previousHours}hrs</div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       `;
    const cardHTML = `
      <div class="col-4">
              <div class="activity-card position-relative">
                <div class="activity-bg ${getActivityClass(
                  activity.title
                )} d-flex">
                  <img src="./images/icon-${getIconName(
                    activity.title
                  )}.svg" alt="" class="ms-auto" />
                </div>
                <div class="activity-content rounded-4 position-absolute">
                  <div
                    class="activity-header d-flex align-items-center justify-content-between"
                  >
                    <h3 class="activity-title text-white">${activity.title}</h3>
                    <span class="activity-menu text-white">⋯</span>
                  </div>
                  <div class="mt-4">
                    <div class="activity-time">${currentHours}hrs</div>
                    <div class="activity-previous">${previousText} - ${previousHours}hrs</div>
                  </div>
                </div>
              </div>
            </div>
    `;
    container.innerHTML += cardHTML;
  });
}

// Function to handle timeframe switching
function switchTimeframe(newTimeframe) {
  if (newTimeframe === currentTimeframe) return;

  // Update active state in navigation
  document.querySelectorAll(".tracker-active__link a").forEach((link) => {
    link.classList.remove("tracker-active__link--act");
  });
  // Add active class to the clicked link
  const activeLink = document.querySelector(
    `[data-timeframe="${newTimeframe}"] a`
  );
  activeLink.classList.add("tracker-active__link--act");
  // Update current timeframe and render
  currentTimeframe = newTimeframe;
  renderActivities(currentTimeframe);
}

// Add event listeners to navigation links
document.querySelectorAll(".tracker-active__link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const timeframe = link.getAttribute("data-timeframe");
    switchTimeframe(timeframe);
  });
});

// Initial render
renderActivities(currentTimeframe);
