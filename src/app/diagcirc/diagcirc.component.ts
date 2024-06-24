import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-diagcirc',
  templateUrl: './diagcirc.component.html',
  styleUrls: ['./diagcirc.component.scss']
})
export class DiagcircComponent implements AfterViewInit{
  ngAfterViewInit(): void {

    // Sélection des éléments ayant la classe "getClass"
    const elements = document.querySelectorAll<HTMLElement>(".getClass");

    // Fonction pour afficher la valeur correspondante en gras
    const afficherLegende = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const legende = target.dataset['legende'];
      if (legende) {
        const monElement = document.getElementById(legende);
        if (monElement) {
          monElement.style.fontWeight = "bold";
        }
      }
    };

    // Fonction pour retirer le gras de la valeur correspondante
    const quitterSurvol = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const legende = target.dataset['legende'];
      if (legende) {
        const monElement = document.getElementById(legende);
        if (monElement) {
          monElement.style.fontWeight = "";
        }
      }
    };

    // Ajout d'un écouteur d'événement pour chaque élément pour le survol
    elements.forEach(element => {
      element.addEventListener("mouseover", afficherLegende);
      element.addEventListener("mouseout", quitterSurvol);
    });
  }

}
