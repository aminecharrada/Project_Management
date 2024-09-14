import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact, IContactDialogData } from '../../interface/contact';
import { Methods } from '../../enums/enums';
import { PoleService } from '../../services/pole.service';
import { Pole } from 'src/app/models/pole';
import { PersonneService } from '../../services/personne.service';

@Component({
  selector: 'app-mat-contact-dialog',
  templateUrl: './mat-contact-dialog.component.html',
  styleUrls: ['./mat-contact-dialog.component.scss']
})
export class MatContactDialogComponent implements OnInit {

  newContactForm!: FormGroup;
  avatarSrc: string | null = null; // Set avatarSrc to null initially
  poles: Pole[] = []; // Array to hold poles

  methods = Methods;

  constructor(
    public dialogRef: MatDialogRef<MatContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IContactDialogData,
    private poleService: PoleService,
    private personneService: PersonneService
  ) {}

  ngOnInit() {
    this.newContactForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      role: new FormControl('', [
        Validators.required
      ]),
      poleId: new FormControl('', [
        Validators.required
      ]),
      poleName: new FormControl(''), // Control for pole name
      image: new FormControl('') // Control for image
    });

    // Fetch poles when the component initializes
    this.poleService.getAllPoles().subscribe(
      (data: Pole[]) => {
        this.poles = data;
        if (this.data.contact && this.data.contact.poleId) {
          this.setSelectedPoleName(this.data.contact.poleId);
        }
      },
      error => console.error('Error fetching poles', error)
    );
  }

  // Method to set the selected pole name based on poleId
  setSelectedPoleName(poleId: number) {
    const selectedPole = this.poles.find(pole => pole.id === poleId);
    if (selectedPole) {
      this.newContactForm.get('poleName')?.setValue(selectedPole.poleName);
    }
  }

  // Method to handle changes in the selected pole
  onPoleChange(event: any) {
    const selectedPoleId = event.value;
    const selectedPole = this.poles.find(pole => pole.id === selectedPoleId);
    if (selectedPole) {
      this.newContactForm.get('poleName')?.setValue(selectedPole.poleName);
    }
  }

  // Method to handle form submission
  save() {
    if (this.newContactForm.valid) {
      const contact: Contact = {
        name: this.newContactForm.get('name')?.value,
        role: this.newContactForm.get('role')?.value,
        poleName: this.newContactForm.get('poleName')?.value,
        image: this.newContactForm.get('image')?.value 
      };

      this.personneService.createPersonne(contact).subscribe(
        response => {
          console.log('Personne created:', response);
          this.dialogRef.close({
            method: Methods.POST,
            contact: response
          });
        },
        error => console.error('Error creating personne:', error)
      );
    }
  }
  openFileDialog() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

// Method to handle file changes
onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    this.newContactForm.patchValue({
      image: file
    });

    // Update the avatar preview
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarSrc = reader.result as string; // Set the avatarSrc to the selected image
    };
    reader.readAsDataURL(file);
  }
}

}
