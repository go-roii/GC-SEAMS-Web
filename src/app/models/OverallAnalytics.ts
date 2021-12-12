import {RegistrationAnalyticsCount} from "./RegistrationAnalyticsCount";
import {ViewsAnalyticsCount} from "./ViewsAnalyticsCount";

export interface OverallAnalytics{

  registration_count: RegistrationAnalyticsCount[];
  view_count: ViewsAnalyticsCount[];

}
