export class Hero {

  constructor(
    public id: string | null,
    public title: string | null,
    public content: string | null
  ) {  }

}

export interface Note {
  content: string;
  created_at: string;
  id: string;
  title: string;
  updated_at: string;
}
