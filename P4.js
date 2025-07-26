// Initializing these variables outside all the functions so that they can be used by all the functions
let pageFaults, pageHits, pageReferences;

function fifoPageReplacement(pages, capacity) {

    // Initializing the values of page faults, the pageFrame queue and a dynamic output which can be altered according to the needs.
    pageFaults = 0;
    let pageFrame = [];
    let output1 = "";

    // The pages array is the input string
    // The for loop is iterated for the length of the pages array.
    for (let i = 0; i < pages.length; i++) {

        // This code is used to check for the availability of an element in an array
        let pageIndex = pageFrame.indexOf(pages[i]);

        // If the element is not available
        if (pageIndex === -1) {
        
            // Increase the number of page faults
            pageFaults++;

            // If the pageFrame queue has not reached its capacity,
            if (pageFrame.length < capacity) {

                // push the new element
                pageFrame.push(pages[i]);
                // Print that the element has been loaded into the frame by increamenting the value of output
                output1 += `<p class="miss">Page ${pages[i]} loaded into frame: [${pageFrame.join(", ")}] : Miss</p>`;
            } 
            // if the pageFrame queue is full
            else {

                // Remove the first page
                let firstPage = pageFrame.shift();

                // Enter the new page
                pageFrame.push(pages[i]);

                // Increament the output and print that the oldest element in the queue has been replaced
                output1 += `<p class="miss">Page ${firstPage} replaced with page ${pages[i]}</p>`;
            }
            
        
        } 
        
        // if the element is available
        else {
            // Print that the element has been loaded by updating the value of the output
            output1 += `<p class="hit">Page ${pages[i]} already in frame: [${pageFrame.join(", ")}] : Hit</p>`;
        }
    }

    // Calculating the number of hits = total references - misses
    pageHits = pages.length - pageFaults;

    // Printing the number of references
    output1 += `<p>The total references are: ${pages.length}`;

    // Printing the number of misses
    output1 += `<p class="miss">Total page misses: ${pageFaults}</p>`;

    // Printing the number of hits
    output1 += `<p class="hit">Total page hits: ${pageHits}</p>`;

    // Printing the final page frames, which is the last updated value of the output variable
    output1 += `<p>Final page frames: [${pageFrame.join(", ")}]</p>`;

    return output1;
}

function runSimulation() {

    // The following syntax is used to scan the values entered by the user.
    let numFrames = document.getElementById("num-frames").value;
    pageReferences = document.getElementById("page-references").value.split(",");

    if (numFrames <= 0) {
        alert("Number of frames must be greater than 0");
        return;
    }


    
    // This is a secondary code used to print the lines below
    for (var i = 0; i < pageReferences.length; i++) {
        pageReferences[i] = parseInt(pageReferences[i]);
    }
    
    // if (!pageReferences.every(isNumberKey)) {
    //     alert("Please enter a valid reference array");
    //     return;
    // }
    // Printing the frame size and reference array entered by the user
    document.getElementById("output0.0").innerHTML = "The frame size fixed by the user is: " + numFrames;
    document.getElementById("output0").innerHTML = "The reference array entered by the user is: " + pageReferences;

    // The code below is used to print the final output
    let output1Div = document.getElementById("output1");

    // Now, the fifoPageReplacement function described above is called, wherein pages = pageReferences, capacity = numFrames
    output1Div.innerHTML = fifoPageReplacement(pageReferences, numFrames);

}


// This function is associated with the restart button to reset the values which enables the user to use the simulator again.
function Reset(){
    location.reload();
}