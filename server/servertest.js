import cors from "cors";
import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());
app.use(cors());


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  login(username, password)
    .then((profile) => {
      res.send(profile);
    })
    .catch((err) => {
      console.error(err);
      res.status(401).send("Invalid username or password");
    });
});


app.get("/fetch-profile", (req, res) => {
  const { username, password } = req.query;
  fetchProfile(username, password)
    .then((profile) => {
      res.send(profile);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while fetching data");
    });
});

app.get("/fetch-courses", (req, res) => {
  const { selectedOption } = req.query;
  fetchCourses(selectedOption)
    .then((courses) => {
      res.send(courses);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while fetching cards");
    });
});

app.get("/fetch-transcript", (req, res) => {
  const { username, password } = req.query;
  fetchTranscript(username, password)
    .then((transcript) => {
      res.send(transcript);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while fetching transcript");
    });
});

const login = async (page, username, password) => {
  await page.goto("https://jinansystem.com/login.php");
  await page.fill('input[name="USER"]', username);
  await page.fill('input[name="PASS"]', password);
  await page.click('input.submit-buttons[type="submit"]');
  await page.waitForSelector(".table_main");
};

const fetchProfile = async (username, password) => {
  // Navigate to the login page
  const { page } = await getBrowserInstance();
  await login(page, username, password);

  // Get the text content of the second <td> element with class "admintable_light"
  const profile = await page.evaluate(() => {
    const tdElements = document.querySelectorAll("td.admintable_light div");
    const semesterOptions = document.querySelectorAll("option");
    let semester = Array.from(semesterOptions)
      .map((option) => option.textContent)
      .slice(1);
    if (tdElements) {
      let major = tdElements[2].textContent;
      if (major === "الفنون الإعلانية والتواصل البصري") {
        major = "Graphic Design";
      }
      return {
        id: tdElements[0].textContent,
        major: major,
        name: tdElements[3].textContent,
        campus: tdElements[4].textContent,
        semester: semester,
      };
    } else {
      throw new Error("No matching element found");
    }
  });

  return profile;
};

const fetchCourses = async (selectedOption) => {
  // Select an option in the <select> element
  const { page } = await getBrowserInstance();
  selectedOption = +selectedOption;
  await page.selectOption('select[name="semId"]', { index: selectedOption });

  // Wait for the page to update
  await page.waitForSelector(".table_main");

  // Scrape the information that appears
  const courses = await page.evaluate(() => {
    try {
      // Select the second 'table_main' and all its rows with class 'admintable_light'
      const table = document.querySelectorAll(".table_main")[1];
      const rows = table.querySelectorAll(".admintable_light");
      // rest of your code...
      const courseselect = Array.from(rows).map((row) => {
        // Use :nth-child to select the right <td> within each row
        const code = row.querySelector(":nth-child(3)").textContent;
        const name = row.querySelector(":nth-child(4)").textContent;
        const credits = row
          .querySelector(":nth-child(5)")
          .textContent.split(".")[0];
        let type = row.querySelector(":nth-child(6)").textContent;
        if (type == "GERElective") {
          type = "Elective";
        } else if (type == "GER") {
          type = "General";
        }
        const grade = row.querySelector(":nth-child(7)").textContent;

        return { code, name, credits, type, grade };
      });
      return courseselect;
    } catch (error) {
      throw new Error("Failed to scrape courses information");
    }
  });

  return courses;
};

const fetchTranscript = async (username, password) => {
  const { page } = await getBrowserInstance();
  await login(page, username, password);
  await page.click('a[href="https://jinansystem.com/student/MyTranscript/index.php"]');
  await page.waitForSelector("#AutoNumber2");
  const transcript = await page.evaluate(() => {
    try {
      const transferred = [];
      const istransfer = (document.querySelector("tr.admintable_light")? true : false);
      const trows = document.querySelectorAll("tr.admintable_light");
      trows.forEach((row, index) => {
        if (index === trows.length - 1) return;
        const code = row.children[0].textContent;
        const name = row.children[1].textContent;
        const credits = row.children[2].textContent;
        transferred.push({ code, name, credits });
      });
      const semesters = [];
      const srows = document.querySelectorAll("tr.header_admin");
      srows.forEach((row, index) => {
        const courses = [];
        if (index === 0 || (index === 1 && istransfer == true)) return;
        const title = row.textContent;
        let nextRow = row.nextElementSibling.nextElementSibling;
        while (nextRow && nextRow.children.length == 5) {
          const cells = nextRow.querySelectorAll('td');
          if (cells.length < 5) return;
            const code = cells[0].textContent.trim();
            const name = cells[1].textContent.trim();
            const credits = cells[2].textContent.trim().split(".")[0];
            const grade = cells[3].textContent.trim().split(" ")[0];
            const average = cells[4].textContent.trim();
            courses.push({ code, name, credits, grade, average });
          nextRow = nextRow.nextElementSibling;
        }
        const extractData = (row) => {
          return {
            attempted: row.children[1].textContent.trim(),
            passed: row.children[2].textContent.trim(),
            average: row.children[3].textContent.trim()
          };
        };
        const trow = nextRow.querySelectorAll("tr")[1];
        const current = [extractData(trow)];
        const crow = trow.nextElementSibling;
        const cumulative = [extractData(crow)];
        semesters.push({ title, courses, current, cumulative});
        })
      return { transferred, semesters };
    } catch (error) {
      throw new Error("Failed to scrape transcript information");
    }
  });
  return transcript;
};

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
