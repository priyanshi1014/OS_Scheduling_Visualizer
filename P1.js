// Define global variables
let processes = [];
let time = 0;

let PROCESS_ID_COUNTER = 1;
// Define function to add a new process to the table
function addProcess() {
  // const processId = parseInt(document.getElementById("process-id-input").value);
  const arrivalTime = parseInt(document.getElementById("arrival-time-input").value);
  const burstTime = parseInt(document.getElementById("burst-time-input").value);

  if (arrivalTime < 0) {
    alert("Arrival Time can't be negative");
    return false;
  } else if (burstTime <= 0) {
    alert("Burst Time can't be 0 or negative");
    return false;
  }

  const newProcess = {
    id: 'P' + PROCESS_ID_COUNTER,
    arrivalTime: arrivalTime,
    burstTime: burstTime,
    completionTime: 0,
    turnaroundTime: 0,
    waitingTime: 0,
  };
  PROCESS_ID_COUNTER++;
  processes.push(newProcess);
  updateTable();

  document.getElementById("arrival-time-input").value = null;
  document.getElementById("burst-time-input").value = null;

  const x = parseInt(processes.arrivalTime);
  console.log(x);
}

// Define function to update the table with the current process data
function updateTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  for (let i = 0; i < processes.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${processes[i].id}</td>
      <td>${processes[i].arrivalTime}</td>
      <td>${processes[i].burstTime}</td>
      <td>${processes[i].completionTime}</td>
      <td>${processes[i].turnaroundTime}</td>
      <td>${processes[i].waitingTime}</td>
      <td><button onclick="deleteProcess(${i})">Delete</button></td>

    `;
    tableBody.appendChild(row);
  }
}

// Define function to delete a process from the table
function deleteProcess(index) {
  processes.splice(index, 1);
  updateTable();
}

// Define function to reset the simulation
function reset() {
  location.reload();
}

// Define function to run the SJF algorithm
// Define function to run the SJF algorithm
function runSJF() {
  // Sort the processes by their arrival time (shortest first) and burst time (in case of a tie)
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime);

  // Initialize variables for calculating metrics and tracking completion times of processes
  let totalCompletionTime = 0;
  let totalTurnaroundTime = 0;
  let totalWaitingTime = 0;
  let completedProcesses = 0;
  let completionTimes = [];
  let arr_ct = [];
  let arr_pi = [];

  // Iterate through the sorted processes and calculate their metrics
  while (completedProcesses < processes.length) {
    let minBurstTime = Number.MAX_SAFE_INTEGER;
    let selectedProcessIndex = -1;

    for (let i = 0; i < processes.length; i++) {
      const process = processes[i];
      if (process.arrivalTime <= time && process.burstTime < minBurstTime && completionTimes.indexOf(process.id) === -1) {
        minBurstTime = process.burstTime;
        selectedProcessIndex = i;
      }
    }

    if (selectedProcessIndex !== -1) {
      const process = processes[selectedProcessIndex];
      process.completionTime = time + process.burstTime;
      process.turnaroundTime = process.completionTime - process.arrivalTime;
      process.waitingTime = process.turnaroundTime - process.burstTime;
      totalCompletionTime += process.completionTime;
      totalTurnaroundTime += process.turnaroundTime;
      totalWaitingTime += process.waitingTime;
      time = process.completionTime;
      completionTimes.push(process.id);
      arr_ct.push(process.completionTime);
      arr_pi.push(process.id);
      completedProcesses++;
    } else {
      time++;
    }
  }

  // Calculate the average metrics and update the table
  const numProcesses = processes.length;
  const avgCompletionTime = (totalCompletionTime / numProcesses).toFixed(2);
  const avgTurnaroundTime = (totalTurnaroundTime / numProcesses).toFixed(2);
  const avgWaitingTime = (totalWaitingTime / numProcesses).toFixed(2);
  updateTable();

  document.getElementById("output1").innerHTML = "The Average Completion time is: " + avgCompletionTime;
  document.getElementById("output2").innerHTML = "The Average Turn-around time is: " + avgTurnaroundTime;
  document.getElementById("output3").innerHTML = "The Average Waiting time is: " + avgWaitingTime;

  var colors = [
    "#d3e1b5",
    "#9bcfe0",
    "#e09bd2",
    "#e87777",
    "#d3e1b5",
    "#a8f796",
    "#b0f287",
    "#f49381",
    "#b2ffda",
  ];

  var pidlabel = row1.insertCell(0);
  var ctlabel = row2.insertCell(0);
  pidlabel.id = "cell1";
  ctlabel.id = "cell2";
  document.getElementById("cell1").style.width = "80px";
  document.getElementById("cell2").style.width = "80px";
  pidlabel.innerHTML = "Process ID";
  ctlabel.innerHTML = "Completion Time";
  document.getElementById("cell1").style.border = "none";
  document.getElementById("cell2").style.border = "none";
  document.getElementById("cell1").style.background =

    "#e0e0e0";
  document.getElementById("cell2").style.background =
    "#e0e0e0";
  document.getElementById("cell1").style.textAlign = "center";
  document.getElementById("cell2").style.textAlign = "center";
  for (let i = 0; i < arr_ct.length; i++) {
    var c_count = i % 9;
    var pidvalue = row1.insertCell(i + 1);
    var ctvalue = row2.insertCell(i + 1);
    pidvalue.id = "pid" + i;
    ctvalue.id = "ctid" + i;
    pidvalue.innerHTML = arr_pi[i];
    ctvalue.innerHTML = arr_ct[i];
    document.getElementById("pid" + i).style.width = "50px";
    document.getElementById("ctid" + i).style.width = "50px";
    document.getElementById("pid" + i).style.height = "35px";
    document.getElementById("ctid" + i).style.height = "35px";
    document.getElementById("am").style.margin = "20px";
    document.getElementById("am").style.padding = "20px";
    document.getElementById("pid" + i).style.backgroundColor =
      colors[c_count];
    document.getElementById("ctid" + i).style.backgroundColor =
      colors[c_count];
    document.getElementById("pid" + i).style.textAlign =
      "center";
    document.getElementById("ctid" + i).style.textAlign =
      "center";
    document.getElementById("pid" + i).style.border = "none";
    document.getElementById("ctid" + i).style.border = "none";
  }
}

  // // Print the completion times of each process
  // const tableBody = document.getElementById("table-body");
  // const row = document.createElement("tr");
  // let completionTimeCell = document.createElement("td");
  // completionTimeCell.innerText = "Completion Times:";
  // completionTimeCell.setAttribute("colspan", 4);
  // row.appendChild(completionTimeCell);
  // for (let i = 0; i < processes.length; i++) {
  //   let completionTimeCell = document.createElement("td");
  //   completionTimeCell.innerText = processes[i].completionTime;
  //   row.appendChild(completionTimeCell);
  // }
  // tableBody.appendChild(row);