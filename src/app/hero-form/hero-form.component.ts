import { Component } from '@angular/core';

import { Hero } from '../hero';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})

export class HeroFormComponent {

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getNotes();
  }


  model = new Hero(null, null, null);

  smartphone: any = [];

  notes:any = [];

  update = false;

  submitted = false;

  onSubmit() { 
    this.submitted = true;
    this.api.createNote(this.model)
      .subscribe((data: any) => {
        console.log('post data...', data)
        if(data && data.message === 'note created successfully') {
        //   this.notes = data.data;
          this.getNotes();
        }
      });
    // this.notes.push(this.model);
    this.model = new Hero(null, null, null);
  }

  onUpdate() {
      let objIndex = this.notes.findIndex(((obj: any) => obj.id == this.model.id));

      this.api.updateNote(this.model)
      .subscribe((data: any) => {
        console.log('get data...', data)
        if(data && data.message === 'note updated successfully') {
          this.getNotes();
        }
      });
  //Log object to Console.

  //Update object's name property.
  this.notes[objIndex] = this.model;
      this.model = new Hero(this.notes.length, '', '');
      this.update = false;
  }


  newHero() {
    this.model = new Hero(this.notes.length, null, null);
    this.update = false;
  }

  onEditPress(data: {id: string, title: string, content: string}) {
    this.model = data
    this.update = true;
  }

  getNotes() {
    this.api.getNotes()
      .subscribe((data: any) => {
        console.log('get data...', data)
        if(data && data.message === 'notes get successfully') {
          this.notes = data.data;
        }
      });
  }

  onDeletePress(id: string) {
    // let dd = this.notes;
    this.api.deleteNote(id)
      .subscribe((data: any) => {
        console.log('get data...', data)
        if(data && data.message === 'note delete successfully') {
          this.getNotes();
        }
      });
    // this.notes = dd.filter((item: any) => item.id != id);
  }

}
