import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ISession, restrictedWords } from "../shared";

@Component({
    selector: "create-session",
    templateUrl: "./create-session.component.html",
    styles: [`
    em { float: right; color: #E05C65; padding-left: 10px; }
    .error input, .error select, .error textarea { backgroud-color:#E3C3C5 }
    .error ::-webkit-input-placeholder { color: #99; }
  `]
})

export class CreateSessionComponent implements OnInit {
    @Output() saveNewSession = new EventEmitter();
    @Output() cancelAddSession = new EventEmitter();
    newSessionForm: FormGroup;
    name: FormControl;
    presenter: FormControl;
    duration: FormControl;
    level: FormControl;
    abstract: FormControl;

    ngOnInit() {
        this.name = new FormControl("", Validators.required);
        this.presenter = new FormControl("", Validators.required);
        this.duration = new FormControl("", Validators.required);
        this.level = new FormControl("", Validators.required);
        this.abstract = new FormControl("", [Validators.required, Validators.maxLength(400)]);

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }


    saveSession(formValue) {
        let session: ISession = {
            id: undefined,
            name: formValue.name,
            duration: Number(formValue.duration),
            level: formValue.level,
            presenter: formValue.presenter,
            abstract: formValue.abstract,
            voters: []
        }
        this.saveNewSession.emit(session)
    }

    cancel() {
        this.cancelAddSession.emit();
    }
}