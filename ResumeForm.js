import React, { useState } from "react";
import "./ResumeForm.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResumeForm() {
  const [data, setData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    location: "",
    about: "",
    education1: "",
    education2: "",
    experience1: "",
    experience2: "",
    skills: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ SAVE TO BACKEND
  const handleSubmit = () => {
    fetch("http://localhost:8081/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        education: `${data.education1} | ${data.education2}`,
        skills: data.skills
      })
    })
      .then((res) => res.json())
      .then(() => alert("Saved successfully!"))
      .catch(() => alert("Error saving data"));
  };

  // ✅ DOWNLOAD PDF
  const downloadPDF = () => {
    const input = document.getElementById("resume");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Resume.pdf");
    });
  };

  return (
    <div className="main">

      {/* FORM */}
      <div className="form">
        <h2>Resume Builder</h2>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />

        <textarea name="about" placeholder="About Me" onChange={handleChange}></textarea>

        <textarea name="education1" placeholder="Education 1" onChange={handleChange}></textarea>
        <textarea name="education2" placeholder="Education 2" onChange={handleChange}></textarea>

        <textarea name="experience1" placeholder="Experience 1" onChange={handleChange}></textarea>
        <textarea name="experience2" placeholder="Experience 2" onChange={handleChange}></textarea>

        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />

        {/* ✅ BUTTONS */}
        <button onClick={handleSubmit}>Save Resume</button>
        <button onClick={downloadPDF} style={{ marginTop: "10px" }}>
          Download PDF
        </button>
      </div>

      {/* RESUME OUTPUT */}
      <div className="resume" id="resume">

        <h1>{data.name || "SEBASTIAN BENNETT"}</h1>
        <h3>{data.title || "Professional Accountant"}</h3>

        <div className="contact">
          <span>{data.phone}</span>
          <span>{data.email}</span>
          <span>{data.location}</span>
        </div>

        <hr />

        <h2>ABOUT ME</h2>
        <p>{data.about}</p>

        <hr />

        <h2>EDUCATION</h2>
        <p>{data.education1}</p>
        <p>{data.education2}</p>

        <hr />

        <h2>WORK EXPERIENCE</h2>
        <p>{data.experience1}</p>
        <p>{data.experience2}</p>

        <hr />

        <h2>SKILLS</h2>
        <div className="skills">
          {data.skills &&
            data.skills.split(",").map((s, i) => (
              <span key={i}>{s}</span>
            ))}
        </div>

      </div>
    </div>
  );
}

export default ResumeForm;