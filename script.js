document.querySelector('.form-inner').addEventListener('submit', async (event) => {
    event.preventDefault();

    const isSignUp = event.submitter.classList.contains('signup-btn');
    console.log(isSignUp);
    if (isSignUp) {
        console.log("signing in");
        const username = event.target.elements.sname.value;
        const password = event.target.elements.spass.value;
        const password2 = event.target.elements.cspass.value;
        const email = event.target.elements.smail.value;
        console.log(email);
        const isAdmin = false;
        const isLogin = false;
        if (password == password2) {
            signUp(username, password, isAdmin, isLogin, email);
        }
        else {
            alert("Confirm Password doesn't match with Password");
        }
    }
    else {
        const email = event.target.elements.uname.value;
        const password = event.target.elements.psw.value;
        login(email, password);
    }
});

async function signUp(username, password, isAdmin, isLogin, email) {
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, isAdmin, isLogin, email }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(error => { throw new Error(error.message) });
            }
        })
        .then((data) => {
            form.reset();
            console.log(data.message);
        })
        .catch((error) => {
            console.log('There was a problem with the signup operation:', error);
        });
    window.location.href = 'index.html';
}

async function login(email, password) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        console.log(data.message);

        const isAdminResponse = await fetch('http://localhost:3000/isAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (isAdminResponse.status === 200) {
            window.location.href = "admin.html";
        } else {
            window.location.href = "student.html";
        }
    } catch (error) {
        console.log('There was a problem with the login operation:', error);
    }
}



