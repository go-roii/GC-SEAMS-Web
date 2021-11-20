

export class RequestParams{
  endPoint: string;
  body: any;
  requestType: number;
  authToken: any;

  constructor(){
    this.endPoint='';
    this.body={};
    this.requestType=0;
    this.authToken='';
  }

  public set AuthToken(token: any){
    this.authToken=token;
  }

  public set EndPoint(endPoint: string){
    this.endPoint=endPoint;
  }

  public set Body(body: any){
    this.body=body;
  }

  public set RequestType(requestType: number){
    this.requestType=requestType;
  }

  public get AuthToken(){
    return this.authToken;
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
