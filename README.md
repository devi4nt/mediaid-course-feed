# Medi Aid - Course Feed

## Introduction

A little component I setup for my friend Iann to assist with a website he's been building. The site in question needed display training course information which is sourced from a legacy back office system.

## Instructions

The following code snippet can be included in any page you wish to display availiable course information.

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

The default sorting direction is ascending, this can be altered by including this data attribute `data-direction="DESC"`.

```
<div data-course-feed data-sort="price" data-direction="DESC"></div>
```

### Filtering

You can also filter the course list output by including this attribute `data-filter="maidstone"` the resulting output will only include rows which include the word "maidstone". _**Note:** only the following columns are filterable `no`, `title`, `venue`, `town`, `county`._

```
<div data-course-feed data-sort="price" data-direction="DESC" data-filter="maidstone"></div>
```

### Limits

The default limit is 10000, but this can be altered by including this data attribute `data-limit="10"`.

```
<div data-course-feed data-sort="price" data-direction="DESC" data-filter="maidstone" data-limit="10"></div>
```

### Placement

You can include as many of these as you like per page, if you're using wordpress you'll need to include these within code blocks. _**Note:** they don't need to be in the same code block & can be arranged throughout the page as required._

### Support script

This should only be included once per page & should be included within the page as late as possible. Alternatively if you wish, it could be added to the footer element so it's present within every page. _**Note:** this means you don't have to include it within each page._

```
<script src="/custom-includes/js/bundle.min.js"></script>
```

## Source data structure

You can reference these for sorting the keywords on the left of each line are the column names eg. `no`, `title`, `venue`, `etc`.

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
    "start_date_sort" : 2019579,
    "start_time": "9:30am",
    "end_time": "4:30pm",
    "session_dates": "29th Nov 2019 9:30am 4:30pm",
    "session_date1": "29-11-2019",
    "session_start_time1": "9:30am",
    "session_end_time1": "4:30pm",
    "session_start_time2": "0:00am",
    "session_date2": "",
    "session_end_time2": "0:00am",
    "session_date3": "",
    "session_start_time3": "0:00am",
    "session_end_time3": "0:00am",
    "session_date4": "",
    "session_start_time4": "0:00am",
    "session_end_time4": "0:00am"
}
```
