import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact, IContactDialogData } from '../../interface/contact';
import { Methods } from '../../enums/enums';
import { PersonneService } from '../../services/personne.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-mat-dialog-project',
  templateUrl: './mat-dialog-project.component.html',
  styleUrls: ['./mat-dialog-project.component.scss']
})
export class MatDialogProjectComponent implements OnInit {

  newContactForm!: FormGroup;
  persons: Contact[] = []; // List of persons
  selectedImageSrc: string | null = null;

  private baseUrl = 'http://localhost:8080/api/personnes/images/'; // Adjust this to your image base URL

  constructor(
    public dialogRef: MatDialogRef<MatDialogProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IContactDialogData,
    private personneService: PersonneService,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    this.newContactForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      responsableId: new FormControl('', [Validators.required])
    });

    // Fetch persons to populate the dropdown
    this.personneService.getAllPersonnes().subscribe(
      (persons: Contact[]) => {
        this.persons = persons;
      },
      error => console.error('Error fetching persons', error)
    );
  }

  // Update the image when a person is selected
  onPersonChange(event: any) {
    const selectedPerson = this.persons.find(person => person.id === event.value);
  
    if (selectedPerson) {
      if (typeof selectedPerson.image === 'string') {
        // If the image is already a string (e.g., a URL or path)
        this.selectedImageSrc = selectedPerson.image;
      } else if (selectedPerson.image instanceof File) {
        // If the image is a File object, convert it to a URL
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImageSrc = reader.result as string;
        };
        reader.readAsDataURL(selectedPerson.image);
      } else {
        this.selectedImageSrc = null; // Handle case where there is no image
      }
    }
  }
  
  

  // Method to generate the correct image URL
  getImageUrl(imageName: string | null): string {
    return imageName ? `${this.baseUrl}${imageName}` : 'assets/default-avatar.png';
  }
  

  save() {
    if (this.newContactForm.valid) {
      const project = {
        title: this.newContactForm.get('title')?.value,
        description: this.newContactForm.get('description')?.value,
        responsableId: this.newContactForm.get('responsableId')?.value,
        progress: 0,
        retardPercent: 0
      };

      this.projectService.createProject(project).subscribe(
        response => {
          console.log('Project created:', response);
          this.dialogRef.close({
            method: Methods.POST,
            project: response
          });
        },
        error => console.error('Error creating project:', error)
      );
    }
  }
}
