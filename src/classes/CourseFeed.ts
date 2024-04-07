/* handlebar template */
import * as courseResults from "../templates/courseResults.hbs";

/* interfaces */
import { ICourseData, ICourseResponse } from "./../interfaces/all";

/* types */
import { TSortDir } from "./../typings/types";

/**
 * course feed class - loads feed data once & renders any detected feeds on the
 * current page, data attributes can be used to filter the course list / set default
 * sorting conditions
 */
export class CourseFeed {
  /**
   * css selector to identify course feed output
   */
  private _selector = "[data-course-feed]";

  /**
   * source url of course feed information
   */
  private _feedUrl = "https://mediaid.co.uk/cgi-bin/data-feed.pl";

  /**
   * loaded courses stored locally for repeat rendering
   */
  private _courses: ICourseData[];

  /**
   * creates an instance of CourseFeed
   */
  constructor() {
    const targets = document.querySelectorAll<HTMLElement>(this._selector);
    this.load().then(() => {
      targets.forEach((target) => {
        this.render(target);
      });
    });
  }

  /**
   * filters courses containing supplied string, the following control characters
   * can affect the filtering process "|" means OR "+" means AND the filtering is
   * case insensitive
   *
   * @example
   * "'LocationA|LocationB' - will match if data contains LocationA OR LocationB"
   * "'LocationA+CourseB' - will match if data contains LocationA AND CourseB"
   *
   * @param course course data structure
   * @param filter string to filter course data
   *
   * @returns boolean to indicate weither the filter expression matched
   */
  filter(course: ICourseData, filter: string): boolean {
    let match = false;
    const filterStr = [
      course.no,
      course.venuecode,
      course.title,
      course.county,
      course.town,
      course.venue,
    ]
      .join(":")
      .toLowerCase();

    const ors: string[] = filter.split("|");
    ors.forEach((or) => {
      let andMatch = true;
      const ands: string[] = or.split("+");
      ands.forEach((and) => {
        andMatch = andMatch && filterStr.indexOf(and) !== -1;
      });
      match = match || andMatch;
    });

    return match;
  }

  /**
   * sorts courses on specified key
   *
   * @param sortA course data element
   * @param sortB course data element
   * @param sortKey course data property to sort by
   *
   * @returns sort index
   */
  stringSort(
    sortA: ICourseData,
    sortB: ICourseData,
    sortKey: keyof ICourseData
  ): number {
    if (sortA[sortKey] < sortB[sortKey]) {
      return -1;
    }
    if (sortA[sortKey] > sortB[sortKey]) {
      return 1;
    }
    return 0;
  }

  /**
   * sorts course feed data
   *
   * @param courses course data structure
   * @param sort column to sort by
   * @param direction sort direction
   */
  sorter(
    courses: ICourseData[],
    sort: keyof ICourseData,
    direction: TSortDir
  ): void {
    switch (sort) {
      // numeric sorting
      case "no":
      case "price":
      case "duration":
      case "availability":
      case "start_date_sort":
        courses.sort((a, b) =>
          direction === "ASC" ? a[sort] - b[sort] : b[sort] - a[sort]
        );
        break;

      // string sorting
      default:
        courses.sort((a, b) =>
          direction === "ASC"
            ? this.stringSort(a, b, sort)
            : this.stringSort(b, a, sort)
        );
    }
  }

  /**
   * renders course feed
   *
   * @param target DOM element to render compiled output into
   * @param sort course data property to search
   * @param direction sort direction
   *
   * @returns true if rendered successfully
   */
  render(
    target: HTMLElement,
    sort?: keyof ICourseData,
    direction?: TSortDir
  ): boolean {
    // perform filtering / default sorting
    sort = sort ? sort : (target.dataset.sort as keyof ICourseData);
    direction = direction
      ? direction
      : !target.dataset.direction ||
          (target.dataset.direction !== "ASC" &&
            target.dataset.direction !== "DESC")
        ? "ASC"
        : target.dataset.direction;

    // limit input
    const limit = target.dataset.limit
      ? parseInt(target.dataset.limit, 10)
      : 10000;

    // filter input
    const filter = target.dataset.filter
      ? target.dataset.filter.toLowerCase()
      : "";

    // apply filtering
    const courses = filter
      ? this._courses.filter((item) => this.filter(item, filter))
      : this._courses.filter(() => 1);

    // apply sorting
    if (sort) {
      this.sorter(courses, sort, direction);
    }

    // apply limiting
    if (courses.length > limit) {
      courses.length = limit;
    }

    // write compiled template into the DOM
    target.innerHTML = courseResults({ courses });

    // setup events to allow sorting after load
    this.bindSortEvents(target, direction);

    return true;
  }

  /**
   * binds sort events to the course data table
   *
   * @param target DOM element to render compiled output into
   * @param direction sort direction
   */
  bindSortEvents(target: HTMLElement, direction?: TSortDir): void {
    const sortColumns =
      target.querySelectorAll<HTMLTableCellElement>("[data-sort]");
    sortColumns.forEach((sortColumn) => {
      // reverse the sort direction if sorting by the same column as previous sort
      const newSort = sortColumn.dataset.sort as keyof ICourseData;
      const newDirection =
        target.dataset.sort === newSort
          ? direction === "ASC"
            ? "DESC"
            : "ASC"
          : direction;

      sortColumn.style.cursor = "pointer";
      sortColumn.title =
        "sort by " + sortColumn.innerText.toLowerCase() + " " + newDirection;

      sortColumn.addEventListener("click", () => {
        // update the target element with the new sort information
        target.dataset.sort = newSort;
        target.dataset.direction = newDirection;
        // re-render the output
        this.render(target, newSort, newDirection);
      });
    });
  }

  /**
   * loads course feed data
   */
  async load(): Promise<ICourseData[]> {
    if (typeof this._courses !== "undefined") {
      return this._courses;
    } else {
      const response = await fetch(this._feedUrl);
      try {
        const json: ICourseResponse = await response.json();
        if (json.success) {
          this._courses = json.courses;
        } else {
          throw new Error("Failed to load course data");
        }
        return this._courses;
      } catch (error: unknown) {
        console.error(error);
        throw new Error("Failed to load course data");
      }
    }
  }
}
