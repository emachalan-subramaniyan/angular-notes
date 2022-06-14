import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note, NoteResponse } from '../note';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: string;
  note!: Note;
   
  constructor(
    public notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['notesId'];
      
    this.notesService.findNote(this.id).subscribe((data: NoteResponse | any)=>{
      this.note = data?.data;
    });
  }

}
