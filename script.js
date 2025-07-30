let jobs = [];
//عرض البيانات السابقة 
window.onload = function () {
  const savedJobs = localStorage.getItem("jobs");
  if (savedJobs) {
    jobs = JSON.parse(savedJobs);
    jobs.forEach((job) => renderRow(job));
  }
};
//اضافة الوظيفة
function addrow() {
  const titleInput = document.getElementById("search");
  const companyInput = document.getElementById("company");
  const statusInput = document.getElementById("status");

  if (
    titleInput.value === "" ||
    companyInput.value === "" ||
    statusInput.value === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  const job = {
    title: titleInput.value,
    company: companyInput.value,
    status: statusInput.value,
  };

  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderRow(job);

  titleInput.value = "";
  companyInput.value = "";
  statusInput.value = "";
}

//وضع الوظائف في الجدول
function renderRow(job) {
  const tbody = document
    .getElementById("jobtable")
    .getElementsByTagName("tbody")[0];
  const newRow = tbody.insertRow();

  newRow.innerHTML = `
        <td>${job.title}</td>
        <td>${job.company}</td>
        <td>${job.status}</td>
        <td>
            <button onclick="editrow(this)">Edit</button>
            <button onclick="deleterow(this)">Delete</button>
        </td>
    `;
}
//حذف الوظيفة 
function deleterow(btn) {
  const row = btn.parentNode.parentNode;
  const title = row.cells[0].innerText;
  const company = row.cells[1].innerText;
  const status = row.cells[2].innerText;

  jobs = jobs.filter(
    (job) =>
      !(job.title === title && job.company === company && job.status === status)
  );

  localStorage.setItem("jobs", JSON.stringify(jobs));
  row.remove();
}
//تعديل الوظيفة
function editrow(btn) {
  const row = btn.parentNode.parentNode;
  const cells = row.getElementsByTagName("td");

  const oldJob = {
    title: cells[0].innerText,
    company: cells[1].innerText,
    status: cells[2].innerText,
  };

  const newTitle = prompt("Enter new title:", oldJob.title);
  const newCompany = prompt("Enter new company:", oldJob.company);
  const newStatus = prompt("Enter new status:", oldJob.status);

  if (newTitle && newCompany && newStatus) {
    cells[0].innerText = newTitle.trim();
    cells[1].innerText = newCompany.trim();
    cells[2].innerText = newStatus.trim();

    jobs = jobs.map((job) => {
      if (
        job.title === oldJob.title &&
        job.company === oldJob.company &&
        job.status === oldJob.status
      ) {
        return {
          title: newTitle.trim(),
          company: newCompany.trim(),
          status: newStatus.trim(),
        };
      }
      return job;
    });

    localStorage.setItem("jobs", JSON.stringify(jobs));
  }
}
//مسح جميع الوظائف
function clearAll() {
  if (confirm("Are you sure you want to clear all jobs?")) {
    jobs = [];
    localStorage.removeItem("jobs");
    document.querySelector("#jobtable tbody").innerHTML = "";
  }
}