const { PrismaClient } = require("prisma/client");
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

const prisma = new PrismaClient();

app.get("/", async (req, res, next) => {
  res.send({ message: "api working" });
});

//registration
app.post("/registration", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const post = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    next(error);
  }
  res.json(post);
});

//login
app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const post = await prisma.user.findMany({
      where: {
        email: email,
        password: password,
      },
    });

    const response = {
      success: true,
      message: post,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//create course
app.post("/create-course", async (req, res, next) => {
  const { code, name, description } = req.body;
  try {
    const post = await prisma.course.create({
      data: {
        code,
        name,
        description,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//delete course
app.post("/delete-course", async (req, res, next) => {
  const { id } = req.body;
  try {
    const post = await prisma.course.delete({
      where: {
        id: 1,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//getAllCourse
app.get("/all-course", async (req, res, next) => {
  try {
    const post = await prisma.Course.findMany();
    res.json(post);
  } catch (error) {
    next(error);
  }
});

//getCourseByName
app.get("/course-name", async (req, res, next) => {
  try {
    const post = await prisma.Course.findMany({
      select: {
        name: true,
      },
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

//create course-material
app.post("/create-materials", async (req, res, next) => {
  const { courseID, materials } = req.body;
  try {
    const post = await prisma.materials.create({
      data: {
        courseID,
        materials,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
});
//get all course materials
app.get("/get-materials", async (req, res, next) => {
  try {
    const post = await prisma.materials.findMany();
    res.json(post);
  } catch (error) {
    next(error);
  }
});

//create exam
app.post("/create-exam", async (req, res, next) => {
  const { courseID, description, question1, question2, question3 } = req.body;
  try {
    const post = await prisma.exam.create({
      data: {
        courseID,
        description,
        question1,
        question2,
        question3,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//Added Course
app.post("/added-course", async (req, res, next) => {
  const { courseName, email } = req.body;
  try {
    const post = await prisma.addedCourse.create({
      data: {
        courseName,
        email,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//show added to be developed
app.get("/all-added-course/:email", async (req, res, next) => {
  const email = req.params.email;
  try {
    const post = await prisma.addedCourse.findMany({
      where: {
        email: email,
      },
    });
    res.json(post);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//get exam to be developed
app.get("/get-exam", async (req, res, next) => {
  try {
    const post = await prisma.exam.findMany();
    res.json(post);
  } catch (error) {
    next(error);
    console.log(error);
  }
});
//get exam to be developed
app.get("/get-assignment", async (req, res, next) => {
  try {
    const post = await prisma.assignment.findMany();
    res.json(post);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//create a assignment
app.post("/create-assignment", async (req, res, next) => {
  const { assignmentName } = req.body;
  try {
    const post = await prisma.assignment.create({
      data: {
        assignmentName,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});
//create a assignment
app.post("/grade", async (req, res, next) => {
  const { email, grade } = req.body;
  try {
    const post = await prisma.grades.create({
      data: {
        email,
        grade,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});
//Delete a assignment
app.post("/delete-assignment", async (req, res, next) => {
  const { id } = req.body;
  console.log(req.body);

  try {
    const post = await prisma.assignment.delete({
      where: {
        id: id,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
});
//Delete a exam
app.post("/delete-exam", async (req, res, next) => {
  const { id } = req.body;
  console.log(req.body);

  try {
    const post = await prisma.exam.delete({
      where: {
        id: id,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//set a grade
app.post("/set-grade", async (req, res, next) => {
  const { email, grade } = req.body;
  try {
    const post = await prisma.grades.create({
      data: {
        email,
        grade,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});
//get a grade
app.get("/get-grade/:email", async (req, res, next) => {
  const email = req.params.email;
  try {
    const post = await prisma.grades.findMany({
      where: {
        email: email,
      },
    });
    const response = {
      success: true,
      message: post,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
