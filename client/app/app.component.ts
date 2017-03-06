import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [TasksService]
})

export class AppComponent { }