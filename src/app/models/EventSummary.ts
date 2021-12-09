import {Departments} from "./Departments";
import {Speaker} from "./Speaker";
import {Analytics} from "./Analytics";

export interface EventSummary{
  event_id: number;
  event_uuid:string;
  event_title: string;
  event_description: string;
  event_start_date: string;
  event_end_date: string;
  seminar_hours: number;
  timezone_id: string;
  registration_link: string;
  departments: Departments[];
  speakers: Speaker[];
  event_analytics: Analytics;
}
