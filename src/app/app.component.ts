import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DataServiceService, ilDto } from './data.service';

interface tableDto {
  id: number;
  il_id: number;
  il_name: string;
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ColumnMode = ColumnMode;
  data: any[] = [];
  ilData: ilDto[] = [];
  ilSearchText = ''
  editing: any = {};
  constructor(
    private dataService: DataServiceService,

  ) {

  }
  ngOnInit(): void {
    this.getData()
  }

  getData() {

    this.dataService.readIlData().subscribe(res => {
      this.ilData = res
      this.getIlce()
    })

  }
  getIlce() {
    this.dataService.readIlceData().subscribe(res => {
      this.data = res.reduce<tableDto[]>((acc, obj1) => {
        const obj2 = this.ilData.find(obj2 => obj2.id === obj1.il_id);
          acc.push({
            id: obj1.id,
            il_id: obj1.il_id,
            il_name: obj2 ? obj2.name : '',
            name: obj1.name
          });
        return acc;
      }, []);
      this.data = [...this.data]
      console.log(this.data);
    })
  }

  enableEdit(row: any, rowIdx: any, value?: any) {
    this.editing[rowIdx] = true
  }

  closeSelectIl(event: any) {
    this.ilSearchText = ''
  }

  ilChangeSelected(event: any,row:any, value: any) {
    // const idx = this.postNightShift.findIndex((o: any) => o.fullName === row.fullName)
    // if (event === undefined) {
    //   row.workTemplate.id = 0
    //   this.postNightShift[idx].workTemplate.id = 0
    //   return
    // }
    // this.postNightShift[idx].workTemplate = row.workTemplate

  }
  onKeyIl(event:any) {
    this.ilSearchText = event.value
  }

}
