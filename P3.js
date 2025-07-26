let head, direction, queue;

function runSimulation() {
    queue = document.getElementById("queue").value;
    queue = queue.split(",").map(num => parseInt(num));

    document.getElementById("output1").innerHTML = "The array entered by the user is: " + queue;

    head = parseInt(document.getElementById("head").value);
    direction = parseInt(document.getElementById("direction").value);

    if (head < 0) {
        alert("!! Please enter a valid head value !!")
        return false;
    }

    if (direction === 1) {
        // For the left direction, the elements smaller than the head value are arranged in the descending order followed by the remaining elements in the descending order.
        queue = queue.filter(q => q < head).sort((a, b) => b - a).concat(queue.filter(q => q >= head).sort((a, b) => b - a));
    } else {
        // For the right direction, the elements greater than the head value are arranged in the ascending order followed by the remaining elements in the ascending order.
        queue = queue.filter(q => q >= head).sort((a, b) => a - b).concat(queue.filter(q => q < head).sort((a, b) => a - b));
    }

    console.log(queue);

    let maxNumber = Math.max(...queue);
    let minNumber = Math.min(...queue);

    const closest = queue.reduce((prev, curr) => Math.abs(curr - head) < Math.abs(prev - head) ? curr : prev);

    let a1 = maxNumber - head;
    let a2 = maxNumber - minNumber;
    let a3 = closest - minNumber;
    let final = a1 + a2 + a3;

    console.log(final);

    document.getElementById("output2").innerHTML = "The seek sequence is: " + queue + "<br> The total number of seek operations is: " + final;
}

function printGraph() {
    let labels = queue.map((_, i) => i + 1);
    let data = queue;

    let config = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Seek sequence",
                    data: data,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Look"
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Position"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "value"
                    },
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    };

    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, config);
}
