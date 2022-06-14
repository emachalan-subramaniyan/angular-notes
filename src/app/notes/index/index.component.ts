import { Component, OnInit } from '@angular/core';
import { Note, NoteResponse } from '../note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  notes: Note[] = [];
  defaultnotes: Note[] = [];

  selectedSore = '0';

  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
    this.getNotes(); 
  }

  getNotes() {
    this.notesService.getNotes().subscribe((data: NoteResponse | any)=>{
      this.notes = data?.data;
      this.defaultnotes = data?.data;
    })  
  }

  deleteNote(id: string | undefined | null){
    this.notesService.deleteNote(id).subscribe((res: any) => {
         this.notes = this.notes.filter(item => item.id !== id);
         this.getNotes(); 
    })
  }

  onFilterChange(e: any, reset = false) {
    let value = e?.target?.value ?? null;    
    if (value === '0' || reset) {
      this.getNotes(); 
    } else if (value === '1') {
      this.notes.sort((a: Note | any, b: Note) => a.title.localeCompare(b.title))
    } else if (value === '2') {
      this.notes.sort((a: Note | any, b: Note | any) => Date.parse(b.created_at) - Date.parse(a.created_at))
    }
  }

}
