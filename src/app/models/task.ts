   
   export class Task {
        id!: number;
        start_date!: string;
        text!: string;
        progress!: number;
        duration!: number;
        parent!: number;
        poleName!: string;
        ressource!: string; // Add this line
        personnes!: number[]; // array of personne IDs
     
    }
