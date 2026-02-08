
<script>

function enterApp(){
  document.getElementById("loginPage").style.display="none";
  document.getElementById("mainApp").style.display="flex";
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

let selectedProfession="";
let completed=0;
let totalModules=4;

/* ================= Profession ================= */

function selectProfession(type){
  selectedProfession=type;
  loadCourses(type);
  showPage("courses");
}

/* ================= Courses ================= */

function loadCourses(type){
  const container=document.getElementById("courseContainer");
  container.innerHTML="";

  let courses=[];

  if(type==="school"){
    courses=[
      {name:"AI Basics",video:"https://www.w3schools.com/html/mov_bbb.mp4"},
      {name:"Python Intro",video:"https://www.w3schools.com/html/movie.mp4"}
    ];
  }

  if(type==="college"){
    courses=[
      {name:"Machine Learning",video:"https://www.w3schools.com/html/mov_bbb.mp4"},
      {name:"Deep Learning",video:"https://www.w3schools.com/html/movie.mp4"}
    ];
  }

  if(type==="professional"){
    courses=[
      {name:"AI for Industry",video:"https://www.w3schools.com/html/mov_bbb.mp4"},
      {name:"Data Science Advanced",video:"https://www.w3schools.com/html/movie.mp4"}
    ];
  }

  courses.forEach(course=>{
    container.innerHTML+=`
      <div class="glass-card">
        <h3>${course.name}</h3>
        <video width="100%" controls>
          <source src="${course.video}" type="video/mp4">
        </video>

        <h4>📤 Upload Your Study Video</h4>
        <input type="file" accept="video/*" onchange="previewVideo(event)">
        <video id="previewVideo" width="100%" controls style="margin-top:10px;display:none;"></video>

        <button class="primary-btn" onclick="goToRoadmap('${course.name}')">
          Start Course
        </button>
      </div>
    `;
  });
}

/* ================= Video Upload Preview ================= */

function previewVideo(event){
  const file=event.target.files[0];
  const video=document.getElementById("previewVideo");
  if(file){
    video.src=URL.createObjectURL(file);
    video.style.display="block";
  }
}

/* ================= Roadmap ================= */

function goToRoadmap(courseName){
  completed=0;

  document.getElementById("roadmapContainer").innerHTML=`
    <div class="glass-card">
      <h2>${courseName} Roadmap</h2>

      <div style="background:#333;border-radius:20px;overflow:hidden;margin-bottom:15px;">
        <div id="progressBar" style="height:15px;width:0%;background:linear-gradient(45deg,#ff4ecd,#7b2ff7);transition:0.5s;"></div>
      </div>

      <p onclick="completeStep(this)">Module 1 - Basics</p>
      <p onclick="completeStep(this)">Module 2 - Core Concepts</p>
      <p onclick="completeStep(this)">Module 3 - Advanced</p>
      <p onclick="completeStep(this)">Final Project</p>
    </div>
  `;
  showPage("roadmap");
}

/* ================= Module Completion ================= */

function completeStep(el){
  if(!el.classList.contains("done")){
    el.classList.add("done");
    el.innerHTML+=" ✅";
    completed++;

    let percent=(completed/totalModules)*100;
    document.getElementById("progressBar").style.width=percent+"%";
  }

  if(completed===totalModules){
    showMotivation();
  }
}

/* ================= Motivation Popup ================= */

function showMotivation(){

  const quotes=[
    "🔥 You are unstoppable!",
    "🚀 Future AI Leader in making!",
    "💜 Consistency beats talent!",
    "🌟 Keep growing every day!"
  ];

  let random=quotes[Math.floor(Math.random()*quotes.length)];

  const popup=document.createElement("div");
  popup.style.position="fixed";
  popup.style.top="50%";
  popup.style.left="50%";
  popup.style.transform="translate(-50%,-50%)";
  popup.style.background="rgba(0,0,0,0.9)";
  popup.style.padding="40px";
  popup.style.borderRadius="20px";
  popup.style.boxShadow="0 0 40px #ff4ecd";
  popup.style.textAlign="center";
  popup.style.zIndex="9999";
  popup.innerHTML=`<h2>${random}</h2>`;

  document.body.appendChild(popup);

  setTimeout(()=>{
    popup.remove();
  },3000);
}

</script>
<script>

let streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0;
let xp = localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0;
let freeze = localStorage.getItem("freeze") ? parseInt(localStorage.getItem("freeze")) : 1;

function updateStreakUI(){
  document.getElementById("streakDays").innerText = streak;
  document.getElementById("xpText").innerText = "XP: " + xp;

  let offset = 440 - (streak * 20);
  if(offset < 0) offset = 0;
  document.getElementById("progressRing").style.strokeDashoffset = offset;

  let level = "Beginner";
  if(streak >= 5) level = "Consistent Learner";
  if(streak >= 15) level = "Focused Achiever";
  if(streak >= 30) level = "AI Master";

  document.getElementById("levelText").innerText = "Level: " + level;

  let advice = "Consistency builds intelligence.";
  if(streak < 3) advice = "Start small. 20 mins daily.";
  else if(streak < 10) advice = "You are building momentum!";
  else if(streak < 20) advice = "Your neural pathways are strengthening!";
  else advice = "Elite consistency achieved!";

  document.getElementById("streakAdvice").innerText = advice;

  localStorage.setItem("streak", streak);
  localStorage.setItem("xp", xp);
  localStorage.setItem("freeze", freeze);
}

function markToday(){
  streak++;
  xp += 10;
  updateStreakUI();
}

function useFreeze(){
  if(freeze > 0){
    freeze--;
    alert("Streak Freeze Used! You didn't lose streak.");
  } else {
    alert("No Freeze Left!");
  }
}

updateStreakUI();

</script>
