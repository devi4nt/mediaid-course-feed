export interface ICourseData {
    session_date3: string;
    session_date2: string;
    town: string;
    no: number;
    session_start_time3: string;
    end_time: string;
    availability: number;
    session_end_time3: string;
    session_start_time1: string;
    start_date: string;
    session_end_time1: string;
    session_start_time4: string;
    start_time: string;
    duration: number;
    session_date1: string;
    session_start_time2: string;
    session_date4: string;
    session_end_time2: string;
    venuecode: string;
    session_end_time4: string;
    venue: string;
    title: string;
    county: string;
    price: number;
}
export interface ICourseResponse {
    courses?: ICourseData[];
    reason?: string;
    success: boolean;
}
