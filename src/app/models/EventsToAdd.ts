import {Departments} from "./Departments";
import {Speaker} from "./Speaker";

export interface EventsToAdd{
  event_title: string;
  event_description: string;
  event_start_date: string;
  event_end_date: string;
  timezone_id: string;
  registration_link: string;
  departments: Departments[];
  speakers: Speaker[];
}
