/* Flip each research box when it is clicked or activated with the keyboard.
   Reference links stay clickable and do not trigger another flip. */

const researchCards = document.querySelectorAll(".flip-card");

researchCards.forEach(function (card) {
    function toggleFlip() {
        card.classList.toggle("flipped");
    }

    card.addEventListener("click", function (event) {
        if (event.target.closest(".reference")) {
            return;
        }
        toggleFlip();
    });

    card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            if (event.target.closest(".reference")) {
                return;
            }
            event.preventDefault();
            toggleFlip();
        }
    });
});
