import React from 'react';
const CalendarBasic = React.lazy(() => import("../pages/calendars/CalendarBasic"));
const CalendarCultures = React.lazy(() => import("../pages/calendars/CalendarCulture"));
const CalendarPopup = React.lazy(() => import("../pages/calendars/CalendarPopup"));
const CalendarRendering = React.lazy(() => import("../pages/calendars/CalendarRendering"));
const CalendarSelectable = React.lazy(() => import("../pages/calendars/CalendarSelectable"));
const CalendarTimeslots = React.lazy(() => import("../pages/calendars/CalendarTimeslot"));

const calendarRoutes = [
    {
        path: "modules/calendars/basic",
        element: <CalendarBasic/>
    },
    {
        path: "modules/calendars/culture",
        element: <CalendarCultures/>
    },
    {
        path: "modules/calendars/popup",
        element: <CalendarPopup/>
    },
    {
        path: "modules/calendars/rendering",
        element: <CalendarRendering/>
    },
    {
        path: "modules/calendars/selectable",
        element: <CalendarSelectable/>
    },
    {
        path: "modules/calendars/timeslot",
        element: <CalendarTimeslots/>
    },
];

export default calendarRoutes;
