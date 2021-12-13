import {Departments} from "./Departments";
import {Speaker} from "./Speaker";
import {OverallAnalytics} from "./OverallAnalytics";

export interface EventSummary{
  event_id: number;
  event_uuid:string;
  event_title: string;
  event_description: string;
  event_start_date: string;
  event_end_date: string;
  seminar_hours: number;
  is_attendance_strict: boolean;
  timezone_id: string;
  registration_link: string;
  departments: Departments[];
  speakers: Speaker[];
  overallAnalytics: OverallAnalytics
}
