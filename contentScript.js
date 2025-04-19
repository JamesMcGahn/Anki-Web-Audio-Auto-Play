let playFailed = false;

if (
  document.readyState == "complete" ||
  document.readyState == "loaded" ||
  document.readyState == "interactive"
) {
  // HTMLCollection -> Null
  // plays each audio file in collection until no audio files remain

  function playNext(playList) {
    if (playList.length === 0) return;

    // check to see if play back already failed
    if (!playFailed) {
      playList[0]
        .play()
        .then(() => {
          // continue playing through the audio elements on the card

          playList[0].addEventListener("ended", function () {
            playNext(playList.slice(1));
          });
        })
        .catch((e) => {
          // playback failed - add button so user interacts with page to start autoplaying
          // starts playing from the first audio element
          console.log(e);
          console.log();
          playFailed = true;

          // add button so user interacts with the page
          const div = document.querySelector("main");
          const newButton = document.createElement("button");
          newButton.textContent = "Click to Start Audio";
          newButton.className = "btn btn-primary btn-lg";

          // waits for user to click button to try playing again
          newButton.addEventListener("click", () => {
            playFailed = false;
            playNext(playList);
            div.removeChild(newButton);
          });
          div.appendChild(newButton);
        });
    }
  }

  // observes changes to the document. Calls playNext to play files when detected a change in the card area. (new card or back of the card)
  const observer = new MutationObserver((mutation) => {
    mutation.forEach((mut) => {
      // if the mutation is in the card display area, play the audio elements
      if (mut.target?.matches("div#qa")) {
        const audioPL = Array.from(document.getElementsByTagName("audio"));
        playNext(audioPL);
      }
    });
  });

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  };
  observer.observe(document.body, config);
}
