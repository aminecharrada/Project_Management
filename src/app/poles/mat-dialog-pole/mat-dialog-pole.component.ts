import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { PoleService } from '../../services/pole.service';
import { PersonneService } from '../../services/personne.service';
import { Methods } from '../../enums/enums';
import { Contact } from '../../interface/contact';

@Component({
  selector: 'app-mat-dialog-pole',
  templateUrl: './mat-dialog-pole.component.html',
  styleUrls: ['./mat-dialog-pole.component.scss']
})
export class MatDialogPoleComponent implements OnInit {

  newContactForm!: FormGroup;
  personnes: Contact[] = []; 
  selectedImageSrc: string | null = null;
  selectedPersonImage: File | null = null; // Store the selected person's image as a File
  private baseUrl = 'http://localhost:8080/api/personnes/images/'; // Adjust this to your image base URL

  // Method to generate the correct image URL
  getImageUrl(imageName: string | null): string {
    return imageName ? `${this.baseUrl}${imageName}` : 'assets/default-avatar.png';
  }
  constructor(
    public dialogRef: MatDialogRef<MatDialogPoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private poleService: PoleService,
    private personneService: PersonneService
  ) {}

  ngOnInit() {
    this.newContactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      personneId: new FormControl('', [Validators.required]),
    });

    this.personneService.getAllPersonnes().subscribe(
      (data: Contact[]) => {
        this.personnes = data;
      },
      error => console.error('Error fetching personnes', error)
    );
  }

  onPersonChange(event: any) {
    const selectedPerson = this.personnes.find(person => person.id === event.value);

    if (selectedPerson) {
      if (typeof selectedPerson.image === 'string') {
        this.selectedImageSrc = selectedPerson.image;
      } else if (selectedPerson.image instanceof File) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImageSrc = reader.result as string;
        };
        reader.readAsDataURL(selectedPerson.image);
      } else {
        this.selectedImageSrc = null;
      }
    }
  }

  save() {
    if (this.newContactForm.valid) {
      const pole = {
        poleName: this.newContactForm.get('name')?.value,
        personId: this.newContactForm.get('personneId')?.value,
        elemPoleImage: this.selectedImageSrc // Assuming this holds the image URL or path
      };
  
      this.poleService.createPole(pole).subscribe(
        response => {
          console.log('Pole created:', response);
          this.dialogRef.close({
            method: Methods.POST,
            pole: response
          });
        },
        error => console.error('Error creating pole:', error)
      );
    }
  }
  
  
}
