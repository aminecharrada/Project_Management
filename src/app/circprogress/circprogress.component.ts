import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circprogress',
  templateUrl: './circprogress.component.html',
  styleUrls: ['./circprogress.component.scss']
})
export class CircprogressComponent implements AfterViewInit{
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  @Input() innerCircleColor: string = '#78f8ec';
  @Input() dataSize!: number;
  @Input() dataValue!: number;
  @Input() dataArrow!: string;

  private size!: number;
  private strokeWidth!: number;
  private radius!: number;
  private value!: number;
  private direction!: string;
  private svg!: SVGElement;
  private defs!: SVGDefsElement;
  private slice!: SVGPathElement;
  private overlay!: SVGCircleElement;
  private text!: SVGTextElement;
  private arrow!: SVGPathElement;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.chart) {
      this.initChart();
      this.animateStart();
    } else {
      console.error('Chart element is not defined');
    }
  }

  private initChart() {
    const container = this.chart.nativeElement;
    this.size = this.dataSize;
    this.strokeWidth = this.size / 8;
    this.radius = this.size / 2 - this.strokeWidth / 2;
    this.value = this.dataValue;
    this.direction = this.dataArrow;
    this.create();
  }

  private create() {
    this.createSvg();
    this.createDefs();
    this.createSlice();
    this.createOverlay();
    this.createText();
    this.createArrow();
    this.chart.nativeElement.appendChild(this.svg);
  }

  private createSvg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", `${this.size}px`);
    svg.setAttribute("height", `${this.size}px`);
    this.svg = svg;
  }

  private createDefs() {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");

    linearGradient.setAttribute("id", "gradient");
    stop1.setAttribute("stop-color", "#ffa000");
    stop1.setAttribute("offset", "0%");
    linearGradient.appendChild(stop1);

    stop2.setAttribute("stop-color", "#f25767");
    stop2.setAttribute("offset", "100%");
    linearGradient.appendChild(stop2);

    const linearGradientBackground = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradientBackground.setAttribute("id", "gradient-background");

    const bgStop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    bgStop1.setAttribute("stop-color", "rgba(0,0,0,0.2)");
    bgStop1.setAttribute("offset", "0%");
    linearGradientBackground.appendChild(bgStop1);

    const bgStop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    bgStop2.setAttribute("stop-color", "rgba(0,0,0,0.5)");
    bgStop2.setAttribute("offset", "100%");
    linearGradientBackground.appendChild(bgStop2);

    defs.appendChild(linearGradient);
    defs.appendChild(linearGradientBackground);

    this.svg.appendChild(defs);
    this.defs = defs as SVGDefsElement;
  }

  private createSlice() {
    const slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
    slice.setAttribute("fill", "none");
    slice.setAttribute("stroke", "url(#gradient)");
    slice.setAttribute("stroke-width", `${this.strokeWidth}`);
    slice.setAttribute("transform", `translate(${this.strokeWidth / 2},${this.strokeWidth / 2})`);
    slice.setAttribute("class", "animate-draw");
    this.svg.appendChild(slice);
    this.slice = slice as SVGPathElement;
  }

  private createOverlay() {
    const r = this.size / 2 - this.strokeWidth / 2;
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", `${this.size / 2}`);
    circle.setAttribute("cy", `${this.size / 2}`);
    circle.setAttribute("r", `${r}`);
    circle.setAttribute("fill", this.innerCircleColor); // Use the bound color
    circle.setAttribute("class", "animate-draw");
    this.svg.appendChild(circle);
    this.overlay = circle as SVGCircleElement;
  }

  private createText() {
    const fontSize = this.size / 3.5;
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", `${this.size / 2}`);
    text.setAttribute("y", `${this.size / 2 + fontSize / 4}`);
    text.setAttribute("font-family", "Century Gothic, Lato");
    text.setAttribute("font-size", `${fontSize}`);
    text.setAttribute("fill", "#78f8ec");
    text.setAttribute("text-anchor", "middle");
    text.innerHTML = `${0}% `;
    this.svg.appendChild(text);
    this.text = text as SVGTextElement;
  }

  private createArrow() {
    const arrowSize = this.size / 10;
    const mapDir: { [key: string]: [number, number] } = {
      up: [arrowSize / 2, -1],
      down: [0, 1]
    };
    const [arrowYOffset, m] = mapDir[this.direction];
    const arrowPosX = this.size / 2 - arrowSize / 2;
    const arrowPosY = this.size - this.size / 3 + arrowYOffset;
    const arrowDOffset = m * (arrowSize / 1.5);
    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrow.setAttribute("d", `M 0 0 ${arrowSize} 0 ${arrowSize / 2} ${arrowDOffset} 0 0 Z`);
    arrow.setAttribute("fill", "none");
    arrow.setAttribute("opacity", "0.6");
    arrow.setAttribute("transform", `translate(${arrowPosX},${arrowPosY})`);
    this.svg.appendChild(arrow);
    this.arrow = arrow as SVGPathElement;
  }

  private animateStart() {
    let v = 0;
    const intervalOne = setInterval(() => {
      const p = +(v / this.value).toFixed(2);
      const a = p < 0.95 ? 2 - 2 * p : 0.05;
      v += a;
      if (v >= this.value) {
        v = this.value;
        clearInterval(intervalOne);
      }
      this.setValue(v);
    }, 10);
  }

  private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }

  private describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
  }

  private setValue(value: number) {
    let c = (value / 100) * 360;
    if (c === 360) c = 359.99;
    const xy = this.size / 2 - this.strokeWidth / 2;
    const d = this.describeArc(xy, xy, xy, 180, 180 + c);
    this.slice.setAttribute("d", d);
    this.text.innerHTML = `${Math.floor(value)}% `;
  }

  animateReset() {
    this.setValue(0);
  }

}
