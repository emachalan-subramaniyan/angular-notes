import { Component } from '@angular/core';

import { Hero, Note } from '../hero';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})

export class HeroFormComponent {

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getNotes();
  }

  model = new Hero(null, null, null);

  notes: any = [];
  defaultnotes: any = [];

  update = false;

  submitted = false;

  selectedSore = '0';

  onSubmit() {
    this.submitted = true;
    this.api.createNote(this.model)
      .subscribe((data: any) => {
        if (data && data.message === 'note created successfully') {
          this.selectedSore = '0';
          this.getNotes();
        }
      });
    this.model = new Hero(null, null, null);
  }

  onUpdate() {
    let objIndex = this.notes.findIndex(((obj: any) => obj.id == this.model.id));

    this.api.updateNote(this.model)
      .subscribe((data: any) => {
        if (data && data.message === 'note updated successfully') {
          this.getNotes();
        }
      });
    this.notes[objIndex] = this.model;
    this.model = new Hero(this.notes.length, '', '');
    this.update = false;
  }


  newHero() {
    this.model = new Hero(this.notes.length, null, null);
    this.update = false;
  }

  onEditPress(data: { id: string, title: string, content: string }) {
    this.model = data
    this.update = true;
  }

  getNotes() {
    this.api.getNotes()
      .subscribe((data: any) => {
        if (data && data.message === 'notes get successfully') {
          this.notes = data?.data;
          this.defaultnotes = data?.data;
          this.onFilterChange(null, true);
        }
      });
  }

  onDeletePress(id: string) {
    this.api.deleteNote(id)
      .subscribe((data: any) => {
        if (data && data.message === 'note delete successfully') {
          this.getNotes();
        }
      });
  }

  onFilterChange(e: any, reset = false) {
    let value = e?.target?.value ?? null;
    if (value === '0' || reset) {
      this.notes = [...this.defaultnotes];
    } else if (value === '1') {
      this.notes.sort((a: Note, b: Note) => a.title.localeCompare(b.title))
    } else if (value === '2') {
      this.notes.sort((a: Note, b: Note) => Date.parse(b.created_at) - Date.parse(a.created_at))
    }
  }
}
