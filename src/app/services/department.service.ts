import { Injectable } from '@angular/core';
import {Departments} from "../models/Departments";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private _isLoaded: boolean=false;
  private _departments: Departments[]=[];

  constructor() { }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }

  public set isLoaded(value: boolean) {
    this._isLoaded = value;
  }

  public get departments(): Departments[] {
    return this._departments;
  }

  public set departments(value: Departments[]) {
    this._departments = value;
  }
}
