import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';
import { gantt } from 'dhtmlx-gantt';
import { Task } from '../models/task';
import { Link } from '../models/link';
import { TaskDto } from '../models/TaskDto';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PoleService } from '../services/pole.service';

import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'gantt',
  styleUrls: ['./gantt.component.scss'],
  providers: [TaskService, LinkService, PoleService],
  template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit, OnDestroy {
  @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
  
  private projectName!: string ;
  private poleName!: string;
  private routeSub!: Subscription;
  private poles: any[] = [];
  private personnes: any[] = [];
  private dpInitialized = false;
  
  constructor(
    private taskService: TaskService,
    private linkService: LinkService,
    private route: ActivatedRoute,
    private router: Router,
    private poleService: PoleService
  ) {}

  private taskSubject = new Subject<Task>();

  ngOnInit() {
      this.routeSub = this.route.paramMap.subscribe(params => {
          const projectNameParam = params.get('projectName');
          const poleNameParam = params.get('poleName'); 
  
          this.projectName = projectNameParam || ''; // Ensure it's initialized properly
          this.poleName = poleNameParam || ''; 
  
          console.log(`Project Name: ${this.projectName}`);
          console.log(`Pole Name: ${this.poleName}`);
  
          this.loadData();
      });
  
      this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
          this.loadData();
      });
  
      this.ganttInit();
  
      // Debounce task creation
      this.taskSubject.pipe(
          debounceTime(300) // Adjust debounce time as needed
      ).subscribe(async (data: Task) => {
          try {
              console.log("Creating Task (Debounced):", data);
              const taskDto = this.convertTaskToDto(data);
              const projectName = this.route.snapshot.paramMap.get('projectName');
  
              if (!projectName) {
                  console.error('Project name is null or undefined!');
                  return;
              }
  
              const response = await this.taskService.createTask(taskDto, projectName).toPromise();
              console.log('Task created successfully', response);
              return response;
          } catch (error) {
              console.error('Error creating task:', error);
              throw error;
          }
      });
  }
  



  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    this.taskSubject.complete(); 
  }

  private ganttInit() {
    console.log('Initializing Gantt chart with Project Name:', this.projectName)
    const gridWidth = this.projectName ? 925 : 881;
    gantt.config.layout = {
      css: "gantt_container",
      cols: [
        {
          width: gridWidth,
          minWidth: 200,
          maxWidth: 930,
          rows: [
            { view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer" },
            { view: "scrollbar", id: "gridScroll" }
          ],
        },
        { resizer: true, width: 1 },
        {
          rows: [
            { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
            { view: "scrollbar", id: "scrollHor" }
          ]
        },
        { view: "scrollbar", id: "scrollVer" }
      ]
    };

    gantt.config.process_resource_assignments = true;
    gantt.config.keep_grid_width = true;
    gantt.templates.progress_text = function (start, end, task) {
      const progress = task.progress ?? 0;
      return "<span style='text-align:left;padding-left: 10px;'>" + Math.round(progress * 100) + "% </span>";
    };
    gantt.config.duration_unit = "day";
    const formatter = gantt.ext.formatters.durationFormatter({
      enter: "hour", 
      store: "minute", 
      format: "hour",
      hoursPerDay: 8,
      hoursPerWeek: 40,
      daysPerMonth: 30
  });
    gantt.config.columns = [
      { name: "text", label: "Task name", tree: true, width: 400, resize: true },
      {
        name: "ressource",
        label: "Ressource",
        align: "center",
        width: 80,
        resize: true,
        template: function (item) {
          // Access ressource dynamically using ['ressource']
          const personneIds = Array.isArray(item['ressource']) ? item['ressource'] : [item['ressource']];
          const personnes = gantt.serverList("personnes");
    
          // Map the person IDs to their labels
          const personneLabels = personneIds.map((id: number) => {
            const personne = personnes.find((p: any) => p.key == id);
            return personne ? personne.label : id; // Return the label or the ID if not found
          });
    
          // Join the labels with a comma separator
          return personneLabels.join(', ');
        }
      },
      {
        name: "poleName",
        label: "Pole",
        align: "center",
        width: 120,
        resize: true,
        template: function (item) {
          // Access poleName dynamically using ['poleName']
          const pole = gantt.serverList("poles").find((pole: any) => pole.key == item['poleName']);
          return pole ? pole.label : item['poleName']; 
        }
      },
      { name: "start_date", label: "Start time", align: "center", width: 80, resize: true },
      { name: "end_date", label: "Finish", width: 80, align: "center", resize: true },
      { name: "duration", label: "Duration (Days)", align: "center", width: 120, resize: true },
      {
        name: "duration",
        label: "Duration (Hours)",
        align: "center",
        width: 120,
        resize: true,
        template: function (task) {
          if (task.duration !== undefined && task.duration !== null) {
            const durationInHours = task.duration * 8; // Assuming 8 hours per day
            return durationInHours ? formatter.format(durationInHours) +'h' : 'N/A';
          } else {
            return 'N/A';
          }
        }
      },
      { 
        name: "progress", 
        label: "Progress", 
        align: "center", 
        width: 80, 
        resize: true,
        template: function (obj) {
          if (obj.progress !== undefined && obj.progress !== null) {
            return (obj.progress * 100).toFixed(0) + '%';
          } else {
            return '0%';
          }
        }
      },
      ...(this.projectName ? [{ name: "add", label: "", width: 44 }] : [])
    ];
    
    gantt.config.lightbox.sections = [
      { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
      {
        name: "type",
        height: 22,
        map_to: "poleName", 
        type: "select",
        options: gantt.serverList("poles")
      },
      { name: "constraint", map_to: "ressource", type: "checkbox", options: gantt.serverList("personnes") },
      { name: "time", height: 72, type: "duration", map_to: "auto" },
    ]; 
    
    
    gantt.locale.labels.section_type = "Pole";
    gantt.locale.labels.section_constraint = "Ressource";

    gantt.config.scale_height = 80;
    gantt.config.min_column_width = 50;
    gantt.config.work_time = true;
    gantt.config.skip_off_time = true;

    const daysStyle = (date: Date) => {
      const dateToStr = gantt.date.date_to_str("%D");
      if (dateToStr(date) === "Sun" || dateToStr(date) === "Sat") {
        return "weekend";
      }
      return "";
    };
    gantt.templates.timeline_cell_class = function(item, date) {
      const dateToStr = gantt.date.date_to_str("%D");
      if (dateToStr(date) === "Sun" || dateToStr(date) === "Sat") {
        return "weekend";
      }
      return "";
    };

    gantt.config.scales = [
      {
        unit: "month",
        step: 1,
        format: "%F, %Y"
      },
      {
        unit: "week",
        step: 1,
        format: function(date) {
          return "Week #" + (gantt.date.getWeek ? gantt.date.getWeek(date) : "Unknown");
        }
      },
      {
        unit: "day",
        step: 1,
        format: "%D",
        css: daysStyle
      }
    ];

    gantt.config.date_format = '%Y-%m-%d %H:%i';
    gantt.init(this.ganttContainer.nativeElement);

    if (!this.dpInitialized) {
      let isCreatingTask = false; 
      const dp = gantt.createDataProcessor({
        task: {
          update: async (data: Task) => {
            
              console.log("Updating Task:", data);
              // Convert task data to DTO
              const taskDto = this.convertTaskToDto(data);
              return this.taskService.update(taskDto, data.id).toPromise();
          },
          create: (data: Task) => {
            this.taskSubject.next(data);
            return new Promise(resolve => {}); 
        },
        
        
          delete: (id: any) => {
              console.log("Deleting Task:", id);
              return this.taskService.remove(id).toPromise();
          },
      },
          link: {
              update: (data: Link) => {
                  console.log("Updating Link:", data);
                  return this.linkService.update(data).toPromise();
              },
              create: (data: Link) => {
                  console.log("Creating Link:", data);
                  return this.linkService.insert(data).toPromise();
              },
              delete: (id: any) => {
                  console.log("Deleting Link:", id);
                  return this.linkService.remove(id).toPromise();
              }
          }
      });
      this.dpInitialized = true;
  }
  
  }

  private loadData() {
    if (this.poleName) {
      this.loadTasksByPoleName();
    } else if (this.projectName) {
      this.loadTasksByProject();
    } else {
      this.loadAllTasks();
    }
  }

  private loadTasksByPoleName() {
    forkJoin([
      this.taskService.getTasksByPoleName(this.poleName),
      this.linkService.getAllLinks(),
      this.poleService.getAllPoles(),
      this.taskService.getAllPersonnes()
    ]).subscribe(([tasks, links, poles, personnes]) => {
      this.poles = poles.map(pole => ({ key: pole.id, label: pole.poleName }));
      this.personnes = personnes  .map(personne => ({ key: personne.id, label: personne.name }));
      gantt.updateCollection("poles", this.poles);
      gantt.updateCollection("personnes", this.personnes);

      tasks.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

      gantt.clearAll();
      gantt.parse({ data: tasks, links });
    });
  }

  private loadTasksByProject() {
    forkJoin([
      this.taskService.getTasksByProjectName(this.projectName),
      this.linkService.getAllLinks(),
      this.poleService.getAllPoles(),
      this.taskService.getAllPersonnes()
    ]).subscribe(([tasks, links, poles, personnes]) => {
      this.poles = poles.map(pole => ({ key: pole.id, label: pole.poleName }));
      this.personnes = personnes.map(personne => ({ key: personne.id, label: personne.name }));
      gantt.updateCollection("poles", this.poles);
      gantt.updateCollection("personnes", this.personnes);

      tasks.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

      gantt.clearAll();
      gantt.parse({ data: tasks, links });
    });
  }
  private loadAllTasks() {
    forkJoin([
      this.taskService.getAllTasks(),
      this.linkService.getAllLinks(),
      this.poleService.getAllPoles(),
      this.taskService.getAllPersonnes()
    ]).subscribe(([tasks, links, poles, personnes]) => {
      this.poles = poles.map(pole => ({ key: pole.id, label: pole.poleName }));
      this.personnes = personnes.map(personne => ({ key: personne.id, label: personne.name }));
      gantt.updateCollection("poles", this.poles);
      gantt.updateCollection("personnes", this.personnes);

      tasks.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

      gantt.clearAll();
      gantt.parse({ data: tasks, links });
    });
  }

  private convertTaskToDto(data: Task): TaskDto {
    console.log("Original Task Data:", data);

    // Find the selected pole by key and get its label
    const selectedPole = this.poles.find(pole => pole.key.toString() === data.poleName); 
    const poleLabel = selectedPole ? selectedPole.label : data.poleName;  // Get label or fallback to poleName
    
    console.log("Pole Label:", poleLabel);

    // Ensure that data.ressource is treated as an array of numbers
    const personnesIds: number[] = Array.isArray(data.ressource) ? data.ressource : [];

    // Map the person IDs to their corresponding names
    const personnesNames: string = personnesIds.map((id: number) => {
        const personne = this.personnes.find(p => p.key === id);
        return personne ? personne.label : '';
    }).filter((name: string) => name).join(', ');

    return {
        id: data.id,
        text: data.text,
        start_date: data.start_date,
        progress: data.progress,
        duration: data.duration,
        parent: data.parent,
        poleName: poleLabel,  
        ressource: personnesNames, // Saving person names as a comma-separated string
        personnes: personnesIds    // Saving person IDs as an array of numbers
    };
}
  
  }
  
  

  

