  const readline = require('readline');


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let taskList = [];

    function addTask (taskList, taskDescription) {
        taskList.push({done: false, description: taskDescription});
    }

    addTask(taskList, 'Sacar la basura');
    addTask(taskList, 'Lavar los platos');

    
    function printTaskList(taskList) {
        for (let i = 0; i < taskList.length; ++i) {
            if (taskList[i].done) {
                console.log((i + 1) + '--> [x] ' + taskList[i].description);
            } else {
                console.log((i + 1) + '--> [ ] ' + taskList[i].description);
            }
        }
    }

    printTaskList(taskList);

    function mode1() {
        rl.question('Introduce una nueva tarea (escribir "fin" si terminas la tarea)', function(taskDescription) {
            switch(taskDescription) {
                case 'fin':
                    console.log('No se introducen ya más tareas.');
                    mode2(taskList);
                    break;
                case 'exit':
                    rl.close();
                default:
                    addTask(taskList, taskDescription);
                    console.log('La lista actual de tareas es:');
                    printTaskList(taskList);
                    mode1(taskList);        
            }
        });
    }
    function markTaskAsDone(taskList, index) {
        if (index >= 0 && index < taskList.length) {
        taskList[index].done = true;
        } else {
            console.log('Invalid task number.')
        }
    }

    function checkAllDone(taskList) {
        for (let task of taskList) {
            if (!task.done) return false;
        }
        return true;
    }

    function mode2(taskList) {
        printTaskList(taskList);
        rl.question('¿Qué tarea has realizado?(1-N)', function(taskNumber) {
            switch(taskNumber) {
                case 'fin':
                case 'exit':
                    console.log('Bye, bye.')
                    rl.close();
                default:
                markTaskAsDone(taskList, taskNumber - 1);
                if (checkAllDone(taskList)) {
                    console.log('¡Muy bien! Has completado todas las tareas.');
                    rl.close();
                } else {
                mode2(taskList);
                }     
            }
        });
    }

    mode1(taskList);
