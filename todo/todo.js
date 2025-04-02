let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
        let level = Math.floor(points / 100) + 1;

        function addTask() {
            let taskText = document.getElementById("taskInput").value;
            if (taskText === "") return;
            
            let taskItem = document.createElement("li");
            taskItem.className = "task-item";
            
            let taskDate = document.createElement("div");
            taskDate.className = "task-date";
            let today = new Date();
            let formattedDate = today.getDate().toString().padStart(2, '0') + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getFullYear().toString().slice(-2);
            taskDate.textContent = formattedDate;
            
            let taskContent = document.createElement("div");
            taskContent.className = "task-content";
            
            let checkBtn = document.createElement("button");
            checkBtn.innerHTML = "✔";
            checkBtn.style.color = "green";
            checkBtn.onclick = function () {
                taskItem.classList.toggle("complete");
                if (taskItem.classList.contains("complete")) {
                    points += 5;
                } else {
                    points -= 5;
                }
                updatePoints();
            };

            let deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "❌";
            deleteBtn.style.color = "red";
            deleteBtn.onclick = function () {
                if (taskItem.classList.contains("complete")) {
                    points -= 5;
                }
                taskItem.remove();
                updatePoints();
            };

            let taskTextElement = document.createElement("span");
            taskTextElement.textContent = taskText;

            taskContent.appendChild(checkBtn);
            taskContent.appendChild(taskTextElement);
            taskContent.appendChild(deleteBtn);
            
            taskItem.appendChild(taskDate);
            taskItem.appendChild(taskContent);

            document.getElementById("taskList").appendChild(taskItem);
            document.getElementById("taskInput").value = "";
        }

        function updatePoints()
         {
            localStorage.setItem("points", points);
            document.getElementById("pointValue").textContent = points;
            document.getElementById("levelValue").textContent = Math.floor(points / 100) + 1;
            let levelFill = (points / 5000) * 100; 
            document.getElementById("levelBar").style.height = levelFill + "%";

            if (points >= 5000)
             {
                alert("Thanks for using the app! You are a premium member of this app.");
            }
        }
