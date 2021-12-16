import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {RequestParams} from "../../../models/RequestParams";
import {EventsToAdd} from "../../../models/EventsToAdd";
import {HttpHeaders} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {DataService} from "../../../services/data.service";
import {AnalyticsByDepartment} from "../../../models/AnalyticsByDepartment";
import {AnalyticsByCourse} from "../../../models/AnalyticsByCourse";
import {DepartmentService} from "../../../services/department.service";
import {Departments} from "../../../models/Departments";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: [
    '../../homescreen.component.scss',
    './analytics.component.scss'
  ],
})
export class AnalyticsComponent implements OnInit {

  activeEventUUID!: Subscription;
  uuid!: string;
  activeEvent!: EventsToAdd
  departmentAnalytics!: AnalyticsByDepartment[];
  coursesAnalytics!: AnalyticsByCourse[];
  multi: any[] = [];
  multi2: any[] = [];
  byDepartmentBreakdown: any[] = [];
  departments: string = 'Departments';
  programs: string = 'Programs';

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private dataService: DataService,
              private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.activeEventUUID = this.route.params.subscribe(params => {
      this.uuid = params['uuid'];
    });

    this.getEventDetails(this.uuid)


    console.log(this.uuid);
  }

  getEventDetails(uuid: string){
    const eventDetailsParams=new RequestParams();
    eventDetailsParams.EndPoint='event/'+uuid;
    eventDetailsParams.requestType=5;
    eventDetailsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(eventDetailsParams)
      .subscribe(async (data: EventsToAdd) =>{
        this.activeEvent=data;
        await this.getEventAnalyticsByDepartment(uuid);
        await this.getEventAnalyticsByCourse(uuid)
        await console.log(data)
      });

    this.departments = 'Departments';
    this.programs = 'Programs';
  }

  getEventAnalyticsByDepartment(uuid: string){
    const eventDetailsParams=new RequestParams();
    eventDetailsParams.EndPoint='analytics/department/'+uuid;
    eventDetailsParams.requestType=5;
    eventDetailsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(eventDetailsParams)
      .subscribe(async (data: AnalyticsByDepartment[]) =>{
        await this.setDepartmentAnalytics(data);
        await this.setAnalyticsByDepartmentData(data);
        await console.log(data);
      });
  }

  setDepartmentAnalytics(data: AnalyticsByDepartment[]){
    this.departmentAnalytics = data;
  }

  setAnalyticsByDepartmentData(data: AnalyticsByDepartment[]){

    for(let department of data){
      const deptData = {
        "name": department.department_code,
        "series": [
        {
          "name": "Invited",
          "value": department.invited
        },
        {
          "name": "Viewed",
          "value": department.views
        },
        {
          "name": "Registered",
          "value": department.registered
        },
        {
          "name": "Attended",
          "value": department.attendees
        }
      ]
      }

      this.multi.push(deptData)
    }

    this.multi = [...this.multi]

    console.log('multi value:')
    console.log(this.multi)

  }

  getEventAnalyticsByCourse(uuid: string){
    const eventDetailsParams=new RequestParams();
    eventDetailsParams.EndPoint='analytics/course/'+uuid;
    eventDetailsParams.requestType=5;
    eventDetailsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(eventDetailsParams)
      .subscribe(async (data: AnalyticsByCourse[]) =>{
        await this.setCoursesAnalytics(data);
        await this.setAnalyticsByCourseData(data);
        await this.breakDownPerDepartment();
        await console.log(data);
      });
  }

  setCoursesAnalytics(data: AnalyticsByCourse[]){
    this.coursesAnalytics = data;
  }

  setAnalyticsByCourseData(data: AnalyticsByCourse[]){

    for(let course of data){
      const deptData = {
        "department": course.department_name,
        "name": course.course_code,
        "series": [
          {
            "name": "Invited",
            "value": course.invited
          },
          {
            "name": "Viewed",
            "value": course.views
          },
          {
            "name": "Registered",
            "value": course.registered
          },
          {
            "name": "Attended",
            "value": course.attendees
          }
        ]
      }
      this.multi2.push(deptData)
    }

    this.multi2 = [...this.multi2]

    //console.log('multi value:');
    //console.log(this.multi2)

  }

  breakDownPerDepartment(){
    const departments: Departments[]= this.departmentService.getDepartments();

    for(let dept of departments){
      for(let course of this.coursesAnalytics){
        if(dept.department_code==course.department_code){
          this.byDepartmentBreakdown.push({department: dept.department_name, value: this.getMultiByDepartment(dept.department_name)});
          break;
        }
      }
    }
  }

  getMultiByDepartment(department: string){
    let arr: any[]=[];

    for(let data of this.multi2){
      if(data['department']==department){
        arr.push(data);
      }
    }
    return arr;
  }

  //get the headers to be used in the request
  getHttpOptions(){
    const trimmedHeader=this.userService.getAuthHeader().split(':');
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: trimmedHeader[1]
      })
    };
    return httpOptions;
  }

}
