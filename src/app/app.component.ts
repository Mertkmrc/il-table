import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DataServiceService, ilDto } from './data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './modal.component';

interface tableDto {
  id: number;
  il_id: number;
  il_name?: string;
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ColumnMode = ColumnMode;
  data: tableDto[] = [];
  saveData: tableDto[] = [];
  ilData: ilDto[] = [];
  ilSearchText = '';
  editing: any = {};
  changedIndexes: number[] = [];
  constructor(
    private dataService: DataServiceService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataService.readIlData().subscribe((res) => {
      this.ilData = res;
      this.getIlce();
    });
  }
  getIlce() {
    this.dataService.readIlceData().subscribe((res) => {
      this.data = res.reduce<tableDto[]>((acc, obj1) => {
        const obj2 = this.ilData.find((obj2) => obj2.id === obj1.il_id);
        acc.push({
          id: obj1.id,
          il_id: obj1.il_id,
          il_name: obj2 ? obj2.name : '',
          name: obj1.name,
        });
        return acc;
      }, []);
      this.saveData = JSON.parse(JSON.stringify(this.data));
      this.data = [...this.data];
    });
  }

  disableEdit(rowIdx: any) {
    this.data = [...this.data];
    this.editing[rowIdx] = false;
  }

  onCancel(rowIdx: any) {
    this.changedIndexes = this.changedIndexes.filter((o) => o !== rowIdx);
    this.data[rowIdx] = this.saveData[rowIdx];
    this.disableEdit(rowIdx);
  }
  onSave(row: any, rowIdx: any) {
    this.changedIndexes = this.changedIndexes.filter((o) => o !== rowIdx);
    this.openModal([row]);
    this.disableEdit(rowIdx);
  }

  onSaveAll() {
    const out = this.changedIndexes
      .map((index) => {
        if (
          JSON.stringify(this.data[index]) ===
          JSON.stringify(this.saveData[index])
        ) {
          return null;
        } else {
          return this.data[index];
        }
      })
      .filter((o) => o !== null);
    this.openModal(out);
    this.editing = {};
  }

  enableEdit(row: any, rowIdx: any, value?: any) {
    this.changedIndexes.push(rowIdx);
    this.editing[rowIdx] = true;
  }

  closeSelectIl(event: any) {
    this.ilSearchText = '';
  }

  openModal(data: any[]) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.data = data.map(({ il_name, ...rest }) => rest);
  }

  ilChangeSelected(event: any, rowIdx: any) {
    const selectedIl = this.ilData.find((o: any) => o.id === event);
    this.data[rowIdx].il_id = selectedIl?.id ? selectedIl.id : -1;
    this.data[rowIdx].il_name = selectedIl?.name ? selectedIl.name : '';
  }

  onKeyIl(event: any) {
    this.ilSearchText = event.value;
  }
}
