import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PersonneService } from '../../services/personne.service';
import { Contact, IContactDialogData } from '../../interface/contact';
import { MatContactDialogComponent } from '../mat-contact-dialog/mat-contact-dialog.component';
import { Filter, Methods } from '../../enums/enums';
import { MatSelectionListChange } from '@angular/material/list';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PeopleListComponent implements OnInit, OnChanges, OnDestroy {
  private baseUrl = 'http://localhost:8080/api/personnes/images/'; // Update this URL if needed

  getImageUrl(imageName: string | null): string {
    return imageName ? `${this.baseUrl}${imageName}` : 'assets/default-avatar.png'; // Fallback to a default image if needed
  }

  contacts: Contact[] = [];
  isLoading = true;

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() title = 'People';
  @Input() readonly!: boolean;
  @Input() enableMenu!: boolean;

  @Output() onContactAdded: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() onContactRemoved: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() onAddingNewContactCanceled: EventEmitter<void> = new EventEmitter<void>();
  selectedFilters: Contact[] = []; // Array to hold selected contacts for deletion

  methods = Methods;
  filter!: Filter;
  contactsDataSource!: MatTableDataSource<Contact>;
  contactsDisplayedColumns = ['photoURL', 'role', 'poleName'];

  selection = new SelectionModel<Contact>(true, []);
  dialogRef!: MatDialogRef<MatContactDialogComponent> | null;
  dialogAfterCloseSubscription: any;

  constructor(
    private personneService: PersonneService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchPersonnes();
    this.contactsDataSource = new MatTableDataSource<Contact>(this.contacts);
    this.contactsDataSource.sort = this.sort;

    if (!this.readonly) {
      this.contactsDisplayedColumns.splice(0, 0, 'select');
      this.contactsDisplayedColumns.push('more');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['contacts'].isFirstChange()) {
      this.table.renderRows();
    }
  }

  ngOnDestroy(): void {
    if (this.dialogAfterCloseSubscription) {
      this.dialogAfterCloseSubscription.unsubscribe();
    }
  }

  fetchPersonnes(): void {
    this.personneService.getAllPersonnes().subscribe(
      (data) => {
        this.contacts = data;
        this.contactsDataSource.data = this.contacts;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching personnes', error);
        this.isLoading = false;
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.contactsDataSource.data.length;
    return numSelected === numRows;
  }
  toggleSelection(row: any): void {
    if (this.selection.isSelected(row)) {
      this.selection.deselect(row); // Deselect if already selected
    } else {
      this.selection.select(row); // Select if not selected
    }
  }
  
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.contactsDataSource.data.forEach((row) => this.selection.select(row));
  }

  // select(row: any) {
  //   if (!this.readonly) {
  //     this.selection.toggle(row);
  //   }
  // }

  openAddDialogContainer(method: Methods) {
    const dialogRef = this.dialog.open(MatContactDialogComponent, {
      data: { method: method }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        if (result) {
          const methodFromResult: Methods = result.method;
          const contactFromResult: Contact = result.contact;

          switch (methodFromResult) {
            case Methods.POST:
              this.add(contactFromResult);
              break;
            case Methods.DELETE:
              this.remove(contactFromResult);
              break;
          }
        } else {
          this.onAddingNewContactCanceled.emit();
        }
      }
    });
  }
  openTaskDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { personId: contact.id, personName: contact.name }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle after dialog close if needed
    });
  }
  
  add(contact: Contact) {
    this.contactsDataSource.data.splice(0, 0, contact);
    this.onContactAdded.emit(contact);
    this.table.renderRows();
  }

  remove(contact: Contact) {
    if (contact.id !== undefined) {
      this.personneService.deletePersonne(contact.id).subscribe(
        () => {
          const index = this.contactsDataSource.data.findIndex(c => c.id === contact.id);
          if (index > -1) {
            this.contactsDataSource.data.splice(index, 1);
            this.selection.clear();
            this.table.renderRows();
            this.onContactRemoved.emit(contact);
          }
        },
        error => {
          console.error('Error deleting personne:', error);
        }
      );
    } else {
      console.error('Contact ID is undefined.');
    }
  }
   

  removeSelected() {
    const selectedContacts = this.selection.selected;
    selectedContacts.forEach((contact) => this.remove(contact));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.contactsDataSource.filter = filterValue;
  }

  deletePersonne(id: number) {
    this.personneService.deletePersonne(id).subscribe(
      () => {
        console.log(`Personne with id ${id} deleted successfully.`);
        // Handle additional UI updates if needed
      },
      error => console.error('Error deleting personne:', error)
    );
  }

  // Method to delete multiple people
  deleteMultiplePersonnes() {
    const ids = this.selectedFilters.map(contact => contact.id).filter(id => id !== undefined) as number[];
    if (ids.length > 0) {
      this.personneService.deleteMultiplePersonnes(ids).subscribe(
        () => {
          console.log(`Multiple personnes deleted successfully.`);
          // Handle additional UI updates if needed
          this.fetchPersonnes(); // Optionally refresh the list
          this.selection.clear(); // Clear selection after deletion
        },
        error => console.error('Error deleting personnes:', error)
      );
    } else {
      console.log('No valid IDs selected for deletion.');
    }
  }

  onSelectedFiltersChange(event: MatSelectionListChange) {
    this.selectedFilters = event.source.selectedOptions.selected.map(option => option.value);
    console.log('Selected contacts for deletion:', this.selectedFilters);
  }
}
