# Media Aid - Course Display Component

## Introduction

A little component I setup for my friend Iann to assist with a website he has been building. The site in question needed display training course information sourced from a legacy back office system.

## Instructions

Include the following code snippet in each page you want to display the availiable course list.

### Default behaviour

This will display all availaible course information without sorting or filtering.

```
<div data-course-feed></div>
```

### Sorting

You can add the following data attribute `data-price="price"` to the initial element, this will cause the component to order the courses by `price`.

```
<div data-course-feed data-sort="price"></div>
```

### Sort order

The default sorting direction is ascending but you can also alter this by including this data attribute `data-direction="DESC"`.

```
<div data-course-feed data-sort="price" data-direction="DESC"></div>
```

### Filtering

Finaly you can also filter the course list output by including this attribute `data-filter="maidstone"` if defined the resulting course list will only include courses which include the specified keyword in any of the following column's `no`, `title`, `venue`, `town`, `county`.

### Placement

You can include as many of these as you like per page, if you're using wordpress you can include these within code blocks.

_**Note:** they don't need to be in the same code block & can be arranged throughout the page as required._

### Support script

This should only be included once per page & should be included within the page as late as possible. Alternatively if you wish it can be added to all pages as this will avoid the need to include it each page.

```
<script src="/custom-includes/js/bundle.min.js"></script>
```

## Source data structure

You can reference these for sorting the keys on the left of each line are the column names `no`, `title`, `venue`, `etc`.

```
{
    "no": 13551,
    "title": "Emergency First Aid At Work",
    "venue": "Chelmsford Training Centre (Capital Enterprise Centres)",
    "venuecode": "CHELMSFORD",
    "town": "Chelmsford",
    "county": "Essex",
    "price": 75,
    "duration": 1,
    "availability": 11,
    "start_date": "29-NOV-19",
    "start_time": "9:30 am",
    "end_time": "4:30 pm",
    "session_date1": "29-11-2019",
    "session_start_time1": "9:30 am",
    "session_end_time1": "4:30 pm",
    "session_start_time2": "0:00 am",
    "session_date2": "",
    "session_end_time2": "0:00 am",
    "session_date3": "",
    "session_start_time3": "0:00 am",
    "session_end_time3": "0:00 am",
    "session_date4": "",
    "session_start_time4": "0:00 am",
    "session_end_time4": "0:00 am"
}
```
