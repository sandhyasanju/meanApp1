import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../../task';

@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.components.html'
})

export class TasksComponent {
    tasks: Task[];
    title: string;

    constructor(private taskService:TasksService){
        this.taskService.getTasks()
            .subscribe(tasks => {
                // console.log(tasks);
                this.tasks = tasks;
            });
    }

    addTask(event:any){
        event.preventDefault();
        console.log(this.title);
        var newTask = {
            title: this.title,
            doneStatus: false,
        }

        // this.tasks.push(newTask);
        this.taskService.addTask(newTask).subscribe(task => {
            this.tasks.push(task);
            this.title = '';
        })
    }

    deleteTask(id){
        var tasks = this.tasks;

        this.taskService.deleteTask(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0; i < tasks.length ; i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i,1);
                    }
                }
            }
        })
    }

    updateStatus(task){
        var _task = {
            _id: task._id,
            title:task.title,
            doneStatus: !task.doneStatus
        };

        this.taskService.updateStatus(_task).subscribe(data => {
            task.doneStatus =!task.doneStatus;
        })
    }
}