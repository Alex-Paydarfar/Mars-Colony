export class Report {
  date: string;
  colonist_id: number;
  atype: string;
  action: string;
  constructor(atype, date, action, colonist_id){
    this.atype = atype;
    this.date = date;
    this.action = action;
    this.colonist_id = colonist_id;
  }
}
