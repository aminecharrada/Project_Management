    export interface TaskDto {
        id?: number;
        text: string;
        start_date: string;
        progress: number;
        duration: number;
        parent?: number;
        poleName: string;
        ressource: string; 
        personnes: number[]; 
    }

