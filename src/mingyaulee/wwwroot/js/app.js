function intersectionListener(entries) {
    for (const entry of entries) {
        if (entry.intersectionRatio > 0.5) {
            entry.target.classList.add("animate-in");
        } else if (entry.intersectionRatio == 0) {
            entry.target.classList.remove("animate-in");
        }
    }
}

let intersectionObserver;

window.initializeIntersectionOberver = function () {
    if (intersectionObserver) {
        intersectionObserver.disconnect();
    }

    intersectionObserver = new IntersectionObserver(intersectionListener, {
        threshold: [0, 0.5]
    });

    const elements = document.querySelectorAll(".animate");
    elements.forEach(element => intersectionObserver.observe(element));
};

let heroIntersectionObserver;
window.initializeHeroIntersectionOberver = function () {
    if (heroIntersectionObserver) {
        heroIntersectionObserver.disconnect();
    }

    const heroElement = document.getElementById("hero");
    const contentElement = document.getElementById("content");
    let previousRatio = 1;
    heroIntersectionObserver = new IntersectionObserver(entries => {
        const [entry] = entries;
        const currentRatio = entry.intersectionRatio;
        const isMovingDown = currentRatio < previousRatio;

        if (currentRatio < 0.05) {
            document.body.classList.remove("hero-shown");
        } else {
            document.body.classList.add("hero-shown");
        }

        if (isMovingDown && !heroElement.classList.contains("scrolled")) {
            heroElement.classList.add("scrolled");
            contentElement.classList.add("scrolled");
            if (currentRatio > 0) {
                window.scrollTo({
                    top: window.innerHeight / 2 + 10
                });
            }
        } else if (!isMovingDown && currentRatio > 0.4 && heroElement.classList.contains("scrolled")) {
            heroElement.classList.remove("scrolled");
            contentElement.classList.remove("scrolled");
            window.scrollTo({
                top: 0
            });
        }

        previousRatio = currentRatio;
    }, {
        threshold: [0, 0.05, 0.2, 0.4, 0.6, 0.8, 1]
    });
    heroIntersectionObserver.observe(heroElement);
    document.body.classList.add("hero-shown");
};
