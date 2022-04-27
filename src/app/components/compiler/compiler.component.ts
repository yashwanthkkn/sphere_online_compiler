import { Component, OnInit , ElementRef, ViewChild,AfterViewInit} from '@angular/core';
import * as ace from "ace-builds";
import { SubmissionService } from 'src/app/services/submission.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss']
})
export class CompilerComponent implements OnInit {

  @ViewChild("editor")
  private editor!: ElementRef<HTMLElement>;
  user : any;
  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    let aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue(
`class Main{
    public static void main(String args[]){
      // code here
    }
}`
    );

    aceEditor.setTheme('ace/theme/monokai');
    aceEditor.session.setMode('ace/mode/java');
  }
  constructor(public userService : UserService , private submission : SubmissionService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  runCode(){
    let aceEditor = ace.edit(this.editor.nativeElement);
    let srcCode = aceEditor.getSession().getValue();
    let stdin = (<HTMLInputElement>document.getElementById('src')).value;
    console.log(srcCode,stdin);
    this.submission.runCode({src:srcCode,stdin:stdin})
      .subscribe(data=>{
        console.log(data);
      })
  }

}
