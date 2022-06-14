import { Component, OnInit } from '@angular/core';
import { Note, NoteResponse } from '../note';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: string;
  note!: Note;
  form!: FormGroup;

  constructor(
    public notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['notesId'];
    this.notesService.findNote(this.id).subscribe((data: NoteResponse | any)=>{
      console.log(' data?.data..',  data);
      
      this.note = data?.data;
    });
    
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', Validators.required)
    });
  }
   
  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    this.notesService.updateNote({id: this.id, title: this.form.value.title, content: this.form.value.content}).subscribe(res => {
         console.log('Note updated successfully!');
         this.router.navigateByUrl('notes/index');
    })
  }

}
