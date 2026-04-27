const MASTER_ADMIN_EMAIL = 'ribka8563@gmail.com'; 

function checkAccessAndAdmin() {
    const userEmail = localStorage.getItem('willowUser') || localStorage.getItem('userEmail');
    
    const adminBadges = document.querySelectorAll('.admin-badge, #adminBadge');
    const adminLink = document.getElementById('admin-link');

    if (document.body.classList.contains('private-page') && !userEmail) {
        window.location.href = 'login.html';
        return;
    }

    if (userEmail === MASTER_ADMIN_EMAIL) {
        adminBadges.forEach(badge => badge.style.display = 'inline-block');
        if (adminLink) adminLink.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkAccessAndAdmin();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('userEmail').value;
            localStorage.setItem('willowUser', email.toLowerCase().trim());

            const formData = new FormData(loginForm);
            const object = Object.fromEntries(formData);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(object)
            })
            .then(response => {
                if (response.status === 200) {
                    window.location.href = 'index.html';
                } else {
                    alert("Submission error. Check your Access Key.");
                }
            })
            .catch(() => alert("Connection failed."));
        });
    }
});




function saveMood(mood) {
    const moodLog = document.getElementById('moodLog');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const entry = document.createElement('p');
    entry.innerHTML = `<span>${time}</span>: You felt <strong>${mood}</strong>`;
    moodLog.prepend(entry);
}
window.addEventListener('load', () => {
    checkAccessAndAdmin();
});

function toggleMonth(monthNumber) {

    const monthElement = document.getElementById('item-' + monthNumber);
    
    const isOpen = monthElement.classList.contains('active');

    const allMonths = document.querySelectorAll('.timeline-item');
    allMonths.forEach(item => {
        item.classList.remove('active');
    });

    if (!isOpen) {
        monthElement.classList.add('active');
    }
}
function toggleMonth(num) {
    const element = document.getElementById('item-' + num);
    if (element) {
        element.classList.toggle('active');
    }
}
function toggleMonth(num) {
    const element = document.getElementById('item-' + num);
    if (element) {
        element.classList.toggle('active');
    }
}
function loginUser(user) {
    if (user.status === "pending") {
        alert("Your account is awaiting admin approval. Please check back later!");
        return; 
    } else if (user.status === "active") {
        window.location.href = "dashboard.html"; 
    }
}

function checkAdminStatus(loggedInUserEmail) {
    if (loggedInUserEmail === MASTER_ADMIN_EMAIL) {
        console.log("Access Granted: Welcome Admin");
        showAdminFeatures();
    } else {
        console.log("Access Denied: Standard User");
        hideAdminFeatures();
    }
}
function showAdminFeatures() {
    document.getElementById('admin-link').style.display = "block";
}
function approveUser(userId) {
    const currentUser = getCurrentUser();

    if (currentUser.email !== MASTER_ADMIN_EMAIL) {
        alert("Error: You do not have permission to approve users.");
        return;
    }

    
    console.log("User " + userId + " has been approved by the Admin.");
}
document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = localStorage.getItem("currentUser");

    const chatContainer = document.getElementById("protected-chat-container");
    const loginMessage = document.getElementById("login-message");

    if (loggedInUser) {
    
        chatContainer.style.display = "block";
    } else {
    
        loginMessage.style.display = "block";
        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000);
    }
});
function handleLogin(email) {
    localStorage.setItem("currentUser", email);

    window.location.href = "community.html";
}
if (user.status === "active") {
    chatContainer.style.display = "block";
} else 
    alert("Your account is still pending admin approval!") 


function sendMessage() {
    const input = document.getElementById('messageInput');
    const display = document.getElementById('chatDisplay');
    const userEmail = localStorage.getItem('willowUser');

    if (input.value.trim() !== "") {
    
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', 'my-message');
    
        const userLabel = userEmail ? userEmail.split('@') : "Guest";
        msgDiv.innerHTML = `<small style="display:block; opacity:0.7;">${userLabel}</small>${input.value}`;

        display.appendChild(msgDiv);
        display.scrollTop = display.scrollHeight;

        input.value = "";
    }
}

function handleChatKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }

}


function saveJourneyEntry() {
    const input = document.getElementById('journeyInput');
    const log = document.getElementById('journeyLog');
    
    if (!input.value.trim()) return;

    const timestamp = new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const entryData = {
        text: input.value,
        date: timestamp
    };

    
    let entries = JSON.parse(localStorage.getItem('willowJourney')) || [];
    entries.unshift(entryData);
    
    
    localStorage.setItem('willowJourney', JSON.stringify(entries));

    input.value = ""; 
    displayJourney(); 
}

function displayJourney() {
    const log = document.getElementById('journeyLog');
    if (!log) return;

    const entries = JSON.parse(localStorage.getItem('willowJourney')) || [];
    log.innerHTML = ""; 

    entries.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('journey-card');
        card.innerHTML = `
            <small>${item.date}</small>
            <p>${item.text}</p>
        `;
        log.appendChild(card);
    });
}
window.addEventListener('load', () => {
    checkAccessAndAdmin();
    displayJourney();
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        const email = document.getElementById('userEmail').value;
        const pass = document.getElementById('userPass').value;
        
        
        handleLogin(email, pass);
        
        
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            
            e.preventDefault();

            const email = document.getElementById('userEmail').value;
            const pass = document.getElementById('userPass').value;

        
            localStorage.setItem('willowUser', email.toLowerCase().trim());


            const formData = new FormData(loginForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                if (response.status == 200) {
                    console.log("Notification sent to Admin.");
                    window.location.href = 'index.html';
                } else {
                    console.log(response);
                    alert("Something went wrong. Please try again.");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Submission failed. Check your internet connection.");
            });
        });
    }
});
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "0f3d6693-e4f5-44b1-af49-f0a3cc1e7adf");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
function checkAccessAndAdmin() {
    const userEmail = localStorage.getItem('willowUser');
    const isPrivatePage = document.body.classList.contains('private-page');

    if (isPrivatePage) {
        if (!userEmail) {
        
            window.location.href = 'login.html';
        } else {
    
            document.body.classList.add('access-granted');
        }
    }
}
function updateTracker() {
    const dateInput = document.getElementById('lastPeriod');
    
    if (!dateInput || !dateInput.value) {
        alert("Please select a date first!");
        return;
    }

    const lmp = new Date(dateInput.value);
    const today = new Date();
    const diffInDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffInDays / 7);

    if (weeks < 0 || weeks > 42) {
        alert("Please enter a valid date within the last 9 months.");
        return;
    }

    if(document.getElementById('currentWeek')) 
        document.getElementById('currentWeek').innerText = `Week ${weeks}`;

    if(document.getElementById('percentLabel')) {
        const percentage = Math.min(Math.floor((weeks / 40) * 100), 100);
        document.getElementById('percentLabel').innerText = `${percentage}% Complete`;
        document.getElementById('progressFill').style.width = `${percentage}%`;
    }

    if(document.getElementById('daysRemainingText')) {
        const remaining = 280 - diffInDays;
        document.getElementById('daysRemainingText').innerText = remaining > 0 ? 
            `${remaining} days until you meet your little one!` : "Your big day is here!";
    }

    const sizes = { 0: "a seed", 8: "a Strawberry 🍓", 12: "a Lime 🍋", 20: "a Banana 🍌", 40: "a Pumpkin 🎃" };
    let fruit = "growing beautifully";
    for (let wk in sizes) { if (weeks >= wk) fruit = sizes[wk]; }
    
    if(document.getElementById('sizeText')) {
        document.getElementById('sizeText').innerText = `Your baby is the size of ${fruit}`;
    }
}
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(3000, () => console.log("Server started on port 3000"));
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/adminDemo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, default: 'Rita', required: true },
  email: { type: String, default: 'ribka8563@gmail.com', required: true, unique: true },
  password: { type: String,default: 'ritaloveyou', required: true },
  role: { type: String, enum: ["user", "admin"], default: "admin" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
const User = require("./models/User");
const bcrypt = require("bcryptjs");

app.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

  
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    res.send("User registered successfully!");
  } catch (err) {
    res.status(400).send("Error registering user: " + err.message);
  }
});
const jwt = require("jsonwebtoken");


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(400).send("Error logging in: " + err.message);
  }
});

function isAdmin(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("No token provided");

  try {
    const decoded = jwt.verify(token, "secretkey");
    if (decoded.role === "admin") {
      next();
    } else {
      res.status(403).send("Access denied");
    }
  } catch (err) {
    res.status(403).send("Invalid token");
  }
}

// Example admin-only route
app.get("/admin", isAdmin, (req, res) => {
  res.send("Welcome to the Admin Dashboard");
});
