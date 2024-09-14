import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { PoleService } from '../services/pole.service';
import { Pole } from '../models/pole';
import { Methods } from '../enums/enums';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogPoleComponent } from './mat-dialog-pole/mat-dialog-pole.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-poles',
  templateUrl: './poles.component.html',
  styleUrls: ['./poles.component.scss']
})
export class PolesComponent implements OnInit, AfterViewInit {
  contactsDataSource!: MatTableDataSource<Pole>;
  pole: Pole[] = [];
  poles: Pole[] = [];
  @Input() readonly!: boolean;
  methods = Methods;
  private baseUrl = 'http://localhost:8080/api/personnes/images/'; // Adjust this to your image base URL

  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;

  constructor(
    private poleService: PoleService,
    public dialog: MatDialog
  ) { }
  getImageUrl(imageName: string | null): string {
    return imageName ? `${this.baseUrl}${imageName}` : 'assets/default-avatar.png';
  }
  ngOnInit(): void {
    this.loadAllPoles();
    this.contactsDataSource = new MatTableDataSource<Pole>(this.pole);
  }

  ngAfterViewInit(): void {
    if (this.table) {
      this.table.renderRows();
    }
  }

  @Output() onPoleAdded: EventEmitter<Pole> = new EventEmitter<Pole>();
  @Output() onAddingNewContactCanceled: EventEmitter<void> = new EventEmitter<void>();

  loadAllPoles(): void {
    this.poleService.getAllPoles().subscribe(
      data => {
        this.poles = data;
      },
      error => {
        console.error('Error fetching poles', error);
      }
    );
  }

  add(pole: Pole) {
    if (this.table) {
      this.contactsDataSource.data.unshift(pole);
      this.onPoleAdded.emit(pole);
      this.table.renderRows();
    } 
  }

  openAddpoleDialogContainer(method: Methods): void {
    console.log('Dialog button clicked');
    const dialogRef = this.dialog.open(MatDialogPoleComponent, {
      data: { method: method }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        const methodFromResult: Methods = result.method;
        const poleFromResult: Pole = result.pole;
        if (methodFromResult === Methods.POST) {
          this.add(poleFromResult);
        } else {
          this.onAddingNewContactCanceled.emit();
        }
      }
    });
  }
}
