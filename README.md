# MediAid — Course Feed

## Introduction

A little component I setup for my friend to assist with a website he's been building. The site in question needed display training course information which is sourced from a legacy back office system.

## Usage instructions

The following code snippet can be included in any page you wish to display available course information.

### Default behaviour

This will display all available course information without sorting or filtering.

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

You can also filter the course list output by including this attribute `data-filter="maidstone"` the resulting output will only include rows which include the word "maidstone".

> Only the following columns are filterable `no`, `venuecode`, `title`, `venue`, `town`, `county`.

```
<div data-course-feed data-filter="maidstone"></div>
```

You can also include advanced conditional filtering logic. _This is useful if your want to show courses from say multiple locations, or include all courses of a particular type in a particular location._

#### This location or that location

The filter `maidstone|tunbridge` will include courses from `maidstone` or `tunbridge`.

```
<div data-course-feed data-filter="maidstone|tunbridge"></div>
```

#### This location and that course

The filter `maidstone+paediatric` will include `paediatric` courses in `maidstone`.

```
<div data-course-feed data-filter="maidstone+paediatric"></div>
```

#### This location and that course or this location and that course

You can even combine this logic to create even more complicated filtering such as `maidstone+paediatric|medway+requalification` which will include `paediatric` courses in `maidstone` or `requalification` courses in `medway`.

```
<div data-course-feed data-filter="maidstone+paediatric|medway+requalification"></div>
```

### Limits

The default limit is 10000, but this can be altered by including this data attribute `data-limit="10"`.

```
<div data-course-feed data-limit="10"></div>
```

### Placement

You can include as many of these as you like per page, if you're using wordpress you'll need to include these within code blocks.

> They don't need to be in the same code block & can be arranged throughout the page as required.

### Support script

This should only be included once per page & should be included within the page as late as possible. Alternatively if you wish, it could be added to the footer element so it's present within every page.

> This means you don't have to include it within each page.

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

### Development instructions

**Installation**

```
pnpm install
```

**Development**

```
# run webpack compiler in watch mode
pnpm run dev

# then open index.html test page in browser
```

**Production**

```
# run webpack compiler in production mode
pnpm run build
```
