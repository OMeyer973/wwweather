import Color from "color";

export class Gradient {
  public colors: Color[];

  constructor(...colors: Color[]) {
    this.colors = colors;
  }

  eval(t: number) {
    const l = this.colors.length;
    if (l === 0) {
      console.error("tried to evaluate an empty gradient");
      return Color.rgb(0, 0, 0);
    }
    const id1 = Math.floor(t * l);
    const id2 = id1 + 1;
    if (id2 <= 0) return this.colors[0];
    if (id2 >= l) return this.colors[l - 1];
    return this.colors[id1].mix(this.colors[id2], t * l - id1);
  }
}
