if(localStorage.getItem('tasks') == null){
    var tasks = {};
    var t_id = 1;
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

function AddTask() {
    if (jQuery.isEmptyObject(tasks)) {
        t_id = 1;
    }
    else {
        for (task in tasks) {
            t_id = tasks[task][0];
        }
        t_id++;
    }
    var title = document.getElementById('title').value;
    var priority = document.querySelector('input[name="priority"]:checked').value;
    var category = document.querySelector('#category').value;
    var parent = document.querySelector('#parent').value;
    if (category == "Choose Category") {
        category = 'none';
    }
    if (parent == "Choose Parent Task") {
        parent = null;
    }
    status = "incomplete"
    var task_name = 'task'+t_id.toString();

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    console.log(t_id, title, priority, category, parent);               //console
    tasks[task_name] = [t_id, title, priority, category, parent, status, dateTime];
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    console.log(localStorage);                                       //console
    document.form.reset();
    AddParentList();
    DisplayTask(tasks);
}

function RemoveTask(id) {
    for (task in tasks) {
        parent = tasks[task][4];
        if (parent == id) {
            delete tasks[task]
        }
    }
    delete tasks[id];
    localStorage.clear();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    DisplayTask(tasks);
}

function CompleteTask(id) {
    tasks[id][5] = "complete"
    localStorage.clear();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    DisplayTask(tasks);
}

function EditTask(id) {
    console.log(tasks[id])
    document.getElementById('title').value = tasks[id][1]
    if (tasks[id][2] == 'high') {
        document.getElementById('high').checked = true;
    }
    else {
        document.getElementById('low').checked = true;
    }
    document.getElementById('category').value = tasks[task][3];
    $('#submitbtn').empty();
    str = `<button type="submit" class="btn btn-primary btn-sm btn-block" onclick="ChangeTask(this.id)" id=${id}>SAVE</button>`;
    $('#submitbtn').append(str);
}

function ChangeTask(id) {
    var title = document.getElementById('title').value;
    var priority = document.querySelector('input[name="priority"]:checked').value;
    var category = document.querySelector('#category').value;
    var parent = document.querySelector('#parent').value;
    if (category == "Choose Category") {
        category = 'none';
    }
    if (parent == "Choose Parent Task") {
        parent = null;
    }
    tasks[id][1] = title;
    tasks[id][2] = priority;
    tasks[id][3] = category
    tasks[id][4] = parent;
    localStorage.clear();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    $('#submitbtn').empty();
    str = `<button type="submit" class="btn btn-primary btn-sm btn-block" onclick="AddTask()">SUBMIT</button>`;
    $('#submitbtn').append(str);
    document.form.reset();
    DisplayTask(tasks);
}

if(localStorage.getItem('sorted') == null){
    var sorted = {};
}
else {
    sorted = JSON.parse(localStorage.getItem('sorted'));
}

function SortPriority() {
    localStorage.removeItem('sorted');
    sorted = {};
    for (task in tasks) {
        console.log(tasks[task][2]);                                     //console
        priority = tasks[task][2];
        parent = tasks[task][4];
        console.log(tasks[task][4]);  
        if (priority == 'high' && parent == null) {
            sorted[task] = tasks[task];
        }
    }
    for (task in tasks) {
        console.log(tasks[task][2]);                                     //console
        priority = tasks[task][2];
        parent = tasks[task][4];
        console.log(tasks[task][4]);  
        if (priority == 'low' && parent == null) {
            sorted[task] = tasks[task];
        }
    }
    for (task in tasks) {
        console.log(tasks[task][2]);                                     //console
        priority = tasks[task][2];
        parent = tasks[task][4];
        console.log(tasks[task][4]);  
        if (priority == 'high' && parent != null) {
            sorted[task] = tasks[task];
        }
    }
    for (task in tasks) {
        console.log(tasks[task][2]);                                     //console
        priority = tasks[task][2];
        parent = tasks[task][4];
        console.log(tasks[task][4]);  
        if (priority == 'low' && parent != null) {
            sorted[task] = tasks[task];
        }
    }
    DisplayTask(sorted);
}

function SortDate() {
    location.reload();
}

if(localStorage.getItem('filter') == null){
    var filter = {};
}
else {
    filter = JSON.parse(localStorage.getItem('filter'));
}

function FilterPriorityHigh() {
    localStorage.removeItem('filter');
    filter = {};
    for (task in tasks) {
        console.log(tasks[task][2]);                                             //console
        priority = tasks[task][2];
        if (priority == 'high') {
            filter[task] = tasks[task];
        }
    }
    DisplayTask(filter);
}

function FilterPriorityLow() {
    localStorage.removeItem('filter');
    filter = {};
    for (task in tasks) {
        console.log(tasks[task][2]);                                             //console
        priority = tasks[task][2];
        if (priority == 'low') {
            filter[task] = tasks[task];
        }
    }
    DisplayTask(filter);
}

if(localStorage.getItem('StatusFilter') == null){
    var StatusFilter = {};
}
else {
    StatusFilter = JSON.parse(localStorage.getItem('StatusFilter'));
}

function FilterStatusIncompleted() {
    localStorage.removeItem('StatusFilter');
    StatusFilter = {};
    for (task in tasks) {
        console.log(tasks[task][5]);                                             //console
        status = tasks[task][5];
        if (status == 'incomplete') {
            StatusFilter[task] = tasks[task];
        }
    }
    localStorage.setItem('StatusFilter', JSON.stringify(StatusFilter));
    DisplaySearch(StatusFilter);
}

function FilterStatusCompleted() {
    localStorage.removeItem('StatusFilter');
    StatusFilter = {};
    for (task in tasks) {
        console.log(tasks[task][2]);                                             //console
        status = tasks[task][5];
        if (status == 'complete') {
            StatusFilter[task] = tasks[task];
        }
    }
    localStorage.setItem('StatusFilter', JSON.stringify(StatusFilter));
    DisplaySearch(StatusFilter);
}

if(localStorage.getItem('search') == null){
    var search = {};
}
else {
    filter = JSON.parse(localStorage.getItem('search'));
}

function Search() {
    localStorage.removeItem('search');
    search = {};
    var string = document.getElementById('search').value;
    if (string != ''){
        for (task in tasks) {
            title = tasks[task][1];
            if (title.toLowerCase().includes(string)) {
                search[task] = tasks[task];
            }
        }
        DisplaySearch(search);
    }
    else {
        DisplayTask(tasks);
    }
}

AddParentList();
function AddParentList() {
    $('#parent').empty();
    $('#parent').append("<option selected>Choose Parent Task</option>");
    for (task in tasks) {
        title = tasks[task][1]; 
        parent = tasks[task][4];
        if (parent == null) {
            console.log('hey');                                            //console
            str = `<option id="${task}" value=${task}>${title}</option>`;
            $('#parent').append(str);
        }
    }
}

//display tasks
DisplayTask(tasks);
function DisplayTask(Task) {
    $('#tasks_display').empty();
    if (jQuery.isEmptyObject(Task) == false) {
        console.log(Task)                                                      //console
        for (task in Task) {
            title = Task[task][1];
            priority = Task[task][2];
            category = Task[task][3];
            parent = Task[task][4];
            status = Task[task][5];
            datetime = Task[task][6];

            if (parent == null) {
                strpriority = `<div class="card text-wrap task${priority}"> <div class="card-body"><b>${title}</b><button type="button" class="close" id="${task}" onclick="RemoveTask(this.id)"><span>&times;</span></button><button type="button" class="close" id="${task}" onclick="EditTask(this.id)"><span>&#8801;</span></button><button type="button" class="close" id="${task}" onclick="CompleteTask(this.id)"><span>&#10003;</span></button></div><div class="taskbody${task}" style="padding:10px 0px 0px 10px;"></div><div class="card-body left"><i><small>${datetime} &nbsp;&nbsp;|&nbsp;&nbsp; status: ${status} &nbsp;&nbsp;|&nbsp;&nbsp; priority: ${priority} &nbsp;&nbsp;|&nbsp;&nbsp; category: ${category}</small></i></div></div>` 
                
                $('#tasks_display').append(strpriority);
            }
            else {
                strparent = `<div class="card text-wrap task${priority}"> <div class="card-body"><b>${title}</b><button type="button" class="close" id="${task}" onclick="RemoveTask(this.id)"><span>&times;</span></button><button type="button" class="close" id="${task}" onclick="EditTask(this.id)"><span>&#8801;</span></button><button type="button" class="close" id="${task}" onclick="CompleteTask(this.id)"><span>&#10003;</span></button></div><div class="card-body left"><i><small>${datetime} &nbsp;&nbsp;|&nbsp;&nbsp; status: ${status} &nbsp;&nbsp;|&nbsp;&nbsp; priority: ${priority} &nbsp;&nbsp;|&nbsp;&nbsp; category: ${category}</small></i></div></div>` 

                $(`.taskbody${parent}`).append(strparent);
            }

            if(status == 'incomplete') {
                if (priority=='high') {
                    $('.taskhigh').addClass("border border-danger");
                }
                else{
                    $('.tasklow').addClass("border border-primary");
                }
            }
            else if(status == 'complete'){
                if (priority=='high') {
                    $('.taskhigh').addClass("border border-success");
                }
                else{
                    $('.tasklow').addClass("border border-success");
                }
            }
        }
    }
    else {
        str = `<div class="text-wrap text-center"><small>No tasks to show</small></div>`
        $('#tasks_display').append(str);
    }
}

function DisplaySearch(Task) {
    $('#tasks_display').empty();
    if (jQuery.isEmptyObject(Task) == false) {
        console.log(Task)                                                      //console
        for (task in Task) {
            title = Task[task][1];
            priority = Task[task][2];
            category = Task[task][3];
            parent = Task[task][4];
            status = Task[task][5];
            datetime = Task[task][6];

            strsearch = `<div class="card text-wrap task${priority}"> <div class="card-body"><b>${title}</b><button type="button" class="close" id="${task}" onclick="RemoveTask(this.id)"><span>&times;</span></button><button type="button" class="close" id="${task}" onclick="EditTask(this.id)"><span>&#8801;</span></button><button type="button" class="close" id="${task}" onclick="CompleteTask(this.id)"><span>&#10003;</span></button></div><div class="taskbody${task}" style="padding:10px 0px 0px 10px;"></div><div class="card-body left"><i><small>${datetime} &nbsp;&nbsp;|&nbsp;&nbsp; status: ${status} &nbsp;&nbsp;|&nbsp;&nbsp; priority: ${priority} &nbsp;&nbsp;|&nbsp;&nbsp; category: ${category}</small></i></div></div>` 
                
            $('#tasks_display').append(strsearch);

            if(status == 'incomplete') {
                if (priority=='high') {
                    $('.taskhigh').addClass("border border-danger");
                }
                else{
                    $('.tasklow').addClass("border border-primary");
                }
            }
            else if(status == 'complete'){
                if (priority=='high') {
                    $('.taskhigh').addClass("border border-success");
                }
                else{
                    $('.tasklow').addClass("border border-success");
                }
            }
        }
    }
    else {
        str = `<div class="text-wrap text-center"><small>No tasks to show</small></div>`
        $('#tasks_display').append(str);
    }
}
