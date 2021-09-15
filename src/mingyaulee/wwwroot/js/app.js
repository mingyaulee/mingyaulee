function intersectionListener(entries) {
    for (const entry of entries) {
        if (entry.intersectionRatio == 0) {
            entry.target.classList.remove("animate-in");
            continue;
        }
        let intersectionThresholdRatio = 0.5;
        const percentageOfScreen = entry.target.clientHeight / window.innerHeight;
        if (percentageOfScreen > 1) {
            intersectionThresholdRatio = 0.1;
        } else if (percentageOfScreen > 0.9) {
            intersectionThresholdRatio = 0.25;
        } else if (percentageOfScreen > 0.8) {
            intersectionThresholdRatio = 0.3;
        } else if (percentageOfScreen > 0.7) {
            intersectionThresholdRatio = 0.35;
        } else if (percentageOfScreen > 0.6) {
            intersectionThresholdRatio = 0.4;
        }
        if (entry.intersectionRatio >= intersectionThresholdRatio) {
            entry.target.classList.add("animate-in");
        }
    }
}

let intersectionObserver;

window.initializeIntersectionOberver = function () {
    if (intersectionObserver) {
        intersectionObserver.disconnect();
    }

    intersectionObserver = new IntersectionObserver(intersectionListener, {
        threshold: [0, 0.1, 0.25, 0.3, 0.35, 0.4, 0.5]
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
    // Assume that by default we see at least 95% of this component
    let previousRatio = 0.95;
    heroIntersectionObserver = new IntersectionObserver(entries => {
        const [entry] = entries;
        const currentRatio = window.scrollY === 0 ? 0.95 : Math.min(0.95, entry.intersectionRatio);
        const isMovingDown = currentRatio < previousRatio;

        if (currentRatio === 0) {
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
        threshold: [0, 0.05, 0.2, 0.4, 0.6, 0.8, 0.95]
    });
    heroIntersectionObserver.observe(heroElement);
    document.body.classList.add("hero-shown");
};

window.scrollHero = function () {
    window.scrollTo({
        top: window.innerHeight / 2 + 10
    });
};
