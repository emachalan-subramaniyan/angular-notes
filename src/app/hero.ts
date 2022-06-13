export class Hero {

  constructor(
    public id: string | null,
    public title: string | null,
    public content: string | null
  ) {  }

}

export interface Smartphone {
  message: string;
  data: any;
}
