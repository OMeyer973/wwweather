import Color from "color";

export class Gradient {
  public colors: Color[];

  constructor(...colors: Color[]) {
    this.colors = colors;
  }

  eval(t: number) {
    if (t == undefined || Object.is(t, NaN)) {
      console.error("tried to evaluate gradient at " + t);
      return Color.rgb(0, 0, 0);
    }
    const l = this.colors.length;
    if (l === 0) {
      console.error("tried to evaluate empty gradient");
      return Color.rgb(0, 0, 0);
    }
    const id1 = Math.floor(t * l);
    const id2 = id1 + 1;
    if (id2 <= 0) return this.colors[0];
    if (id2 >= l) return this.colors[l - 1];
    return this.colors[id1].mix(this.colors[id2], t * l - id1);
  }
}
