const closeBtn = document.querySelectorAll('.close-icon');
const menuBtn = document.querySelector('#menu-icon');
const menu = document.querySelector('aside');

menuBtn.addEventListener('click', () => {
    menu.classList.add("active");
    menuBtn.style.display = "none";

    closeBtn.forEach(button => {
        button.style.display = "block";
    });
});

closeBtn.forEach(button => {
    button.addEventListener('click', () => {
        menu.classList.remove("active");

        closeBtn.forEach(button => {
            button.style.display = "none";
        });

        menuBtn.style.display = "block";

        console.log("done");
    });
});


const schoolNum = document.querySelector('.schools-num');
const studentNum = document.querySelector('.students-num');
const graduationNum = document.querySelector('.graduation-num');
const teacherNum = document.querySelector('.teachers-num');

async function loadNumbers() {
    try {
        const response = await fetch("index.json");

        if (!response.ok) {
            throw new Error("Failed to load index.json");
        }

        const data = await response.json();

        const target1 = data.studentsreached;
        const target2 = data.schoolspartnered;
        const target3 = data.teacherstrained;
        const target4 = data.graduationlift;

        const duration = 2000;
        let startTime = null;

        function animation(timestamp) {
            if (startTime === null) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current1 = target1 * progress;
            const current2 = target2 * progress;
            const current3 = target3 * progress;
            const current4 = target4 * progress;

            console.log(studentNum.textContent);
            console.log(current2.toFixed(1));
            schoolNum.textContent = current2.toFixed(0);
            console.log(studentNum.textContent);
            studentNum.textContent = current1.toFixed(1);
            teacherNum.textContent = current3.toFixed(0);
            graduationNum.textContent = current4.toFixed(1);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);

    } catch (error) {
        console.error("Error loading counter data:", error);
    }
}

loadNumbers();
