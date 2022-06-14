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

  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe((data: NoteResponse | any)=>{
      this.notes = data?.data;
      console.log(this.notes);
    })  
  }

  deleteNote(id: string | undefined | null){
    this.notesService.deleteNote(id).subscribe((res: any) => {
         this.notes = this.notes.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }

}
