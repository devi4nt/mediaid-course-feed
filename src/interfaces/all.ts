/* eslint-disable @typescript-eslint/camelcase */
export interface ICourseData {
    no: number;
    title: string;
    venue: string;
    venuecode: string;
    town: string;
    county: string;
    availability: number;
    price: number;
    duration: number;
    session_dates: string;
    start_date: string;
    start_date_sort: number;
    start_time: string;
    end_time: string;
    session_date1: string;
    session_start_time1: string;
    session_end_time1: string;
    session_date2: string;
    session_start_time2: string;
    session_end_time2: string;
    session_date3: string;
    session_start_time3: string;
    session_end_time3: string;
    session_date4: string;
    session_start_time4: string;
    session_end_time4: string;
}
export interface ICourseResponse {
    courses?: ICourseData[];
    reason?: string;
    success: boolean;
}
