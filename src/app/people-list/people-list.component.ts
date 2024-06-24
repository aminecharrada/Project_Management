import { Component } from '@angular/core';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  peopleList = [
    {
      id: 1,
      Tache: "Tâche 1",
      Employe: "Employé A",
      Datededebut: "20/06/2024",
      Datedefin: "24/06/2024",
      Heuresallouees: "40",
      Avancement: "20%",
      Etat:"En retard",
      MessageduChef:"Attention, retard de 3 jours",

    },
    {
      id: 2,
      Tache: "Tâche 2",
      Employe: "Employé B",
      Datededebut: "20/06/2024",
      Datedefin: "24/06/2024",
      Heuresallouees: "40",
      Avancement: "60%",
      Etat:"Dans les temps",
      MessageduChef:"Bon travail",

    },
  ]
  peopleList2 = [
    {
      id: 1,
      Tache: "Tâche 1",
      Employe: "Employé A",
      Datededebut: "20/06/2024",
      Datedefin: "24/06/2024",
      Heuresallouees: "40",
      Avancement: "20%",
      Etat:"En retard",
      MessageduChef:"Attention, retard de 3 jours",

    },
    {
      id: 2,
      Tache: "Tâche 2",
      Employe: "Employé B",
      Datededebut: "20/06/2024",
      Datedefin: "24/06/2024",
      Heuresallouees: "40",
      Avancement: "60%",
      Etat:"Dans les temps",
      MessageduChef:"Bon travail",

    },
  ]

}
