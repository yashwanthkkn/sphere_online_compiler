import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as ace from 'ace-builds';
import { SubmissionService } from 'src/app/services/submission.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss'],
})
export class CompilerComponent implements OnInit {
  @ViewChild('editor')
  private editor!: ElementRef<HTMLElement>;
  user: any;
  submissions: any = [];
  submitted: boolean = false;
  saving: boolean = false;
  output: any;
  outputTitle: string = 'Output';
  hasError: boolean = false;
  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );

    let aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue(
      `class Main{
    public static void main(String args[]){
      System.out.print("Hello world");
    }
}`
    );

    aceEditor.setTheme('ace/theme/monokai');
    aceEditor.session.setMode('ace/mode/java');
  }
  constructor(
    public userService: UserService,
    private submission: SubmissionService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    (async () => {
      this.submission.getSubmissions().subscribe(
        (data) => {
          this.submissions = data;
        },
        (err) => {
          console.log(err);
        }
      );
    })();
  }

  runCode() {
    this.submitted = true;
    let aceEditor = ace.edit(this.editor.nativeElement);
    let srcCode = aceEditor.getSession().getValue();
    let stdin = (<HTMLInputElement>document.getElementById('src')).value;
    let stdout = document.getElementById('output-card');
    console.log(srcCode, stdin);
    this.submission.runCode({ code: srcCode, input: stdin }).subscribe(
      (data) => {
        this.output = data.output;
        this.submitted = false;
        this.hasError = false;
        this.outputTitle = 'Output';
      },
      (err) => {
        this.outputTitle = err.error.statusText;
        this.output = err.error.output;
        this.hasError = true;
        this.submitted = false;
      }
    );
  }

  saveSubmission() {
    this.saving = true;
    let aceEditor = ace.edit(this.editor.nativeElement);
    let srcCode = aceEditor.getSession().getValue();
    this.submission.saveSubmission(srcCode).subscribe(
      (data) => {
        this.saving = false;
        this.submissions.push(data);
      },
      (err) => {
        console.log(err);
        this.saving = false;
      }
    );
  }
}
