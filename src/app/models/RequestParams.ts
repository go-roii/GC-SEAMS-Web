export class RequestParams{
  endPoint: string;
  body: object;
  requestType: number;

  constructor(){
    this.endPoint='';
    this.body={};
    this.requestType=0;
  }

  public set EndPoint(endPoint: string){
    this.endPoint=endPoint;
  }

  public set Body(body: object){
    this.body=body;
  }

  public set RequestType(requestType: number){
    this.requestType=requestType;
  }

  public get EndPoint(){
    return this.endPoint;
  }

  public get Body(){
    return this.body;
  }

  public get RequestType(){
    return this.requestType;
  }
}
