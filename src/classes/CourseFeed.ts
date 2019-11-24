/* handlebar template */
import * as courseResults from '../templates/courseResults.hbs';

/* interfaces */
import { ICourseData, ICourseResponse } from './../interfaces/all';

// tslint:disable: no-console

/**
 * course feed class - loads feed data once & renders any detected feeds on the
 * current page, data attributes can be used to filter the course list / set default
 * sorting conditions
 */
export class CourseFeed {
    /**
     * css selector to identify course feed output
     */
    private _selector = '[data-course-feed]';
    /**
     * source url of course feed information
     */
    private _feedUrl = 'https://chris.merry.earth/cgi-bin/data-feed.pl';
    /**
     * loaded courses stored locally for repeat rendering
     */
    private _courses: ICourseData[];

    /**
     * creates an instance of course feed
     */
    constructor() {
        const targets = document.querySelectorAll<HTMLElement>(this._selector);
        this.load().then(() => {
            targets.forEach(target => {
                this.render(target);
            });
        });
    }

    /**
     * filters courses containing supplied string
     *
     * @returns index into string -1 will be returned in the case of no match
     */
    filter(course: ICourseData, filter: string): number {
        const filterStr = [course.no, course.title, course.county, course.town, course.venue].join(':');
        return filterStr.toLowerCase().indexOf(filter);
    }

    /**
     * sorts courses on specified key
     *
     * @returns sort index
     */
    stringSort(a: ICourseData, b: ICourseData, key: keyof ICourseData): number {
        // string sorting
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    }

    sorter(courses: ICourseData[], sort: keyof ICourseData, direction: 'ASC' | 'DESC') {
        switch (sort) {
            // numeric sorting
            case 'no':
            case 'price':
            case 'duration':
            case 'availability':
                if (direction === 'ASC') {
                    courses.sort((a, b) => a[sort] - b[sort]);
                } else {
                    courses.sort((a, b) => b[sort] - a[sort]);
                }
                break;

            // string sorting
            default:
                if (direction === 'ASC') {
                    courses.sort((a, b) => this.stringSort(a, b, sort));
                } else {
                    courses.sort((a, b) => this.stringSort(b, a, sort));
                }
        }
    }

    /**
     * renders course feed
     *
     * @returns true if rendered successfully
     */
    render(target: HTMLElement): boolean {
        // perform filtering / default sorting
        // setup events to allow sorting after load
        const sort = target.dataset.sort as keyof ICourseData;
        const direction =
            !target.dataset.direction || (target.dataset.direction !== 'ASC' && target.dataset.direction !== 'DESC')
                ? 'ASC'
                : target.dataset.direction;
        const filter = target.dataset.filter ? target.dataset.filter.toLowerCase() : '';
        console.log('sort:', sort, 'direction:', direction, 'filter:', filter);

        // filtering
        const courses = filter ? this._courses.filter(item => this.filter(item, filter) !== -1) : this._courses;

        // sorting
        if (sort) {
            this.sorter(courses, sort, direction);
        }

        target.innerHTML = courseResults({ courses });
        return true;
    }

    /**
     * loads course feed data
     */
    load(): Promise<ICourseData[]> {
        return new Promise<ICourseData[]>((resolve, reject) => {
            if (typeof this._courses !== 'undefined') {
                resolve(this._courses);
            } else {
                jQuery
                    .get(this._feedUrl)
                    .then((response: ICourseResponse) => {
                        if (response.success) {
                            this._courses = response.courses;
                            resolve(response.courses);
                        } else {
                            reject(response.reason);
                        }
                    })
                    .fail((err: any) => {
                        reject(err);
                    });
            }
        });
    }
}
