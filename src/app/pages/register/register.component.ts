import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job'; // GET
import { RegisterService } from '../../services/register.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Colonist } from '../../models/colonist'; // POST
import { ColonistService } from '../../services/colonist.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value === value ? { 'Can\'t be this value': value } : null;
  };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService, ColonistService]
})
export class RegisterComponent implements OnInit {
  public listJobs: Job[] = [];
  public colonist: Colonist;
  public registerForm: FormGroup;
  public NO_JOB_SELECTED = 'default';

  constructor(
    private registerService: RegisterService,
    private colonistService: ColonistService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      colName: new FormControl('', [
        Validators.required,
        Validators.maxLength(35),
        Validators.minLength(2)]),
      colAge: new FormControl('', [
        Validators.required,
        Validators.maxLength(2)]),
      colJob: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)])
    });

    this.registerService.getData()
      .subscribe((jobs) => {
        this.listJobs = jobs;
      });
  }

  postColonist(e) {
    e.preventDefault();
    const name = this.registerForm.get('colName').value;
    const age = this.registerForm.get('colAge').value;
    const job_id = this.registerForm.get('colJob').value;
    const colonist = new Colonist(name, age, job_id);
    this.colonistService
      .postData(colonist)
      .subscribe((newColonist) => {
        localStorage.setItem('colonistIdNum', (newColonist.colonist.id).toString());
        console.log('Successfully posted colonist as colonist number: ', localStorage.getItem('colonistIdNum'));
        this.router.navigate(['/encounters']);
      });
  }
}
