document.getElementById("reader-init").addEventListener("click", startRsvp);

document.getElementById("reader-play")
			.setAttribute("disabled", "true")
		var stats = 0;

function pauser() {
    return new Promise(resolve => {
        let playbuttonclick = function () {
            document.getElementById("reader-pause")
                .removeAttribute("disabled")

            document.getElementById("reader-play")
                .setAttribute("disabled", "true")

            document.getElementById("reader-play")
                .removeEventListener("click",
                            playbuttonclick);

            stats = 0;
            resolve("resolved");
        }
        document.getElementById("reader-play")
            .addEventListener("click", playbuttonclick)
    })
}

 document.getElementById("reader-pause")
			.addEventListener("click", function () {

		stats = 1;

			document.getElementById("reader-pause")
				.setAttribute("disabled", "true")
 			document.getElementById("reader-play")
				.removeAttribute("disabled")

 		})


async function startRsvp() {
    let playing = true
    document.getElementById("reader-pause").onclick = () => playing = false;
    document.getElementById("reader-play").onclick = () => playing = true;

    const readerDisplay = document.getElementById("reader-display");
    let WPM = document.getElementById("reader-wpm").value;
    let basePeriod = 60000 / WPM; // Convert words-per-minute to milliseconds-per-word

    // Build the reader frame and UI

    if (document.getElementById("RSVP-container")) { document.getElementById("RSVP-container").remove(); }
    const rsvpContainer = document.createElement("div");
    rsvpContainer.id = "RSVP-container";

    const topBorder = document.createElement("div")
    topBorder.innerHTML = `
    <div class="RSVP-left"></div>
    <div class="RSVP-notch"></div>
    <div class="RSVP-right"></div>
    `

    const wordContainer = document.createElement("div");
    wordContainer.classList.add("RSVP-word")

    const leftSubstr = document.createElement("div");
    leftSubstr.classList.add("RSVP-left");

    const midSubstr = document.createElement("div");
    midSubstr.classList.add("RSVP-mid");

    const rightSubstr = document.createElement("div");
    rightSubstr.classList.add("RSVP-right");

    const controlContainer = document.createElement("div")
    controlContainer.classList.add("RSVP-controls");

    rsvpContainer.append(topBorder, wordContainer);
    wordContainer.append(leftSubstr, midSubstr, rightSubstr);

    readerDisplay.append(rsvpContainer);

    const inputText = document.getElementById("reader-text").value;
    const textArray = inputText.split(" ");

    for (const word of textArray) {
        if (playing == true) {
            const pivot = Math.ceil((word.length - 1) * .25);
            leftSubstr.innerText = word.substring(0, pivot);
            midSubstr.innerText = word.substring(pivot, pivot + 1);
            rightSubstr.innerText = word.substring(pivot + 1);
            // document.querySelector("#aria-test").innerText = word;
            await wait(basePeriod);
        }
        if (stats == 1) await pauser();
    }

}

function rsvpPlay(params) {

}

function rsvpPause(params) {

}

// Returns a Promise that resolves after "ms" Milliseconds
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))