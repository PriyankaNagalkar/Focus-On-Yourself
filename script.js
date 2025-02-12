const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputVal = document.querySelectorAll(".goal-input");
const errorlabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressVal = document.querySelector(".progress-value")
const progressLabel = document.querySelector(".progress-label");
const addBtn = document.querySelector('.addBtn')
const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill ☺',
]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
progressVal.style.width = `${completedGoalsCount / inputVal.length * 100}%`;
progressVal.firstElementChild.innerText = `${completedGoalsCount}/${inputVal.length} completed`
progressLabel.innerText = allQuotes[completedGoalsCount]

checkBoxList.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        const allFiledVal = [...inputVal].every((input) => {
            return input.value;
        })
        if (allFiledVal) {
            ele.parentElement.classList.toggle("completed");
            const inputId = ele.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed;
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
            progressVal.style.width = `${completedGoalsCount / inputVal.length * 100}%`;
            progressVal.firstElementChild.innerText = `${completedGoalsCount}/${inputVal.length} completed`
            progressLabel.innerText = allQuotes[completedGoalsCount]
            localStorage.setItem("allGoals", JSON.stringify(allGoals))
        } else {
            progressBar.classList.add("show-error")
        }
    })
})


inputVal.forEach((input) => {
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name

        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
        }
    }

    input.addEventListener("focus", () => {
        progressBar.classList.remove("show-error");
    })

    input.addEventListener("input", (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            return input.value = allGoals[input.id].name
        }

        if (allGoals[input.id]) {
            allGoals[input.id].name = input.value
        } else {
            allGoals[input.id] = {
                name: input.value,
                completed: false
            }
        }
        localStorage.setItem("allGoals", JSON.stringify(allGoals))
    })
})

addBtn.addEventListener('click', () => {
    let newGoalsContainer= document.createElement("div");
    let outerContainer = document.querySelector(".container");
    newGoalsContainer.classList.add("goal-container");
    outerContainer.append(newGoalsContainer)
    let newCheckbox= document.createElement("div");
    newCheckbox.classList.add("custom-checkbox")
    newGoalsContainer.append(newCheckbox)
    let newIcon = document.createElement("img");
    newIcon.src = '/images/download.png';
    newIcon.alt = "check-icon";
    newIcon.classList.add("check-icon")
    newCheckbox.append(newIcon)
    let newinput = document.createElement("input");
    newinput.classList.add("goal-input")
    newinput.type ="text",
    newinput.placeholder="Add New goald...."
    newinput.id = inputVal.length+1
    newGoalsContainer.append(newinput)


})

