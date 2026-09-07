const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxRDjSBQSw9vO5o4yRI-V9tHKyM9zdSX-OE6_9R6MbTNHpU7i89qo7fx1AfC6KvV2FiXw/exec"
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

const openServiceForm =
    document.getElementById("openServiceForm");

const closeServiceForm =
    document.getElementById("closeServiceForm");

const cancelServiceForm =
    document.getElementById("cancelServiceForm");

const serviceModal =
    document.getElementById("serviceModal");

const serviceForm =
    document.getElementById("serviceForm");

const jobId =
    document.getElementById("jobId");

const serviceType =
    document.getElementById("serviceType");

const serviceRequired =
    document.getElementById("serviceRequired");


/* MOBILE MENU */

menuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("active");

});


/* GENERATE JOB ID */

function generateJobId() {

    const year = new Date().getFullYear();

    const randomNumber =
        Math.floor(1000 + Math.random() * 9000);

    return `WIZ-${year}-${randomNumber}`;

}


/* OPEN SERVICE FORM */

openServiceForm.addEventListener("click", function () {

    jobId.value = generateJobId();

    serviceModal.classList.add("show");

});


/* CLOSE SERVICE FORM */

function closeModal() {

    serviceModal.classList.remove("show");

}


closeServiceForm.addEventListener("click", closeModal);

cancelServiceForm.addEventListener("click", closeModal);


/* CLOSE WHEN CLICKING OUTSIDE */

window.addEventListener("click", function (event) {

    if (event.target === serviceModal) {

        closeModal();

    }

});


/* SERVICE OPTIONS */

const hardwareServices = [

    "Screen Replacement",
    "Charging Port Repair",
    "Battery Replacement",
    "Camera Repair",
    "Speaker Repair",
    "Water Damage Repair",
    "Motherboard Repair"

];


const softwareServices = [

    "Phone Unlocking",
    "Data Recovery",
    "Operating System Repair",
    "Software Update",
    "Phone Diagnostics",
    "Virus Removal",
    "Application Repair"

];


/* UPDATE SERVICES */

serviceType.addEventListener("change", function () {

    serviceRequired.innerHTML =
        '<option value="">Select Service</option>';

    let services = [];


    if (serviceType.value === "Hardware") {

        services = hardwareServices;

    }


    if (serviceType.value === "Software") {

        services = softwareServices;

    }


    services.forEach(function (service) {

        const option =
            document.createElement("option");

        option.value = service;

        option.textContent = service;

        serviceRequired.appendChild(option);

    });

});


/* SUBMIT FORM */

/* SUBMIT FORM */

serviceForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const submitButton =
        serviceForm.querySelector(".submit-btn");


    const originalButtonText =
        submitButton.innerHTML;


    submitButton.disabled = true;

    submitButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';


    const formData = {

        jobId:
            document.getElementById("jobId").value,

        customerName:
            document.getElementById("customerName").value,

        phone:
            document.getElementById("phone").value,

        email:
            document.getElementById("email").value,

        deviceBrand:
            document.getElementById("deviceBrand").value,

        deviceModel:
            document.getElementById("deviceModel").value,

        imei:
            document.getElementById("imei").value,

        serviceType:
            document.getElementById("serviceType").value,

        serviceRequired:
            document.getElementById("serviceRequired").value,

        problemDescription:
            document.getElementById("problemDescription").value,

        estimatedCost:
            document.getElementById("estimatedCost").value || 0,

        amountPaid:
            document.getElementById("amountPaid").value || 0,

        paymentStatus:
            document.getElementById("paymentStatus").value,

        repairStatus:
            document.getElementById("repairStatus").value

    };


    try {

        await fetch(SCRIPT_URL, {

            method: "POST",

            body: JSON.stringify(formData)

        });


        alert(
            "Service Request Created Successfully!\n\n" +
            "Job ID: " + formData.jobId
        );


        serviceForm.reset();

        closeModal();


        /* Optional:
           Refresh dashboard data later */

    }


    catch (error) {

        console.error(error);


        alert(
            "Unable to save the service request.\n" +
            "Please check your internet connection and try again."
        );

    }


    finally {

        submitButton.disabled = false;

        submitButton.innerHTML =
            originalButtonText;

    }

});

/* ========================================
   LOAD DASHBOARD DATA FROM GOOGLE SHEETS
======================================== */

async function loadDashboardData() {

    try {

        const response =
            await fetch(SCRIPT_URL);


        const result =
            await response.json();


        if (!result.success) {

            console.error(
                "Unable to load dashboard data:",
                result.message
            );

            return;

        }


        const requests =
            result.requests || [];


        updateDashboardStatistics(requests);


        displayRecentRequests(requests);


    }

    catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );

    }

}
function updateDashboardStatistics(requests) {


    /* UNIQUE CUSTOMERS */

    const customers =
        new Set(
            requests.map(
                request =>
                    request["Customer Name"]
            )
        );


    const totalCustomers =
        customers.size;


    /* PENDING REPAIRS */

    const pendingRepairs =
        requests.filter(
            request =>
                request["Repair Status"] ===
                "Pending"
        ).length;


    /* IN PROGRESS */

    const inProgressRepairs =
        requests.filter(
            request =>
                request["Repair Status"] ===
                "In Progress"
        ).length;


    /* COMPLETED */

    const completedRepairs =
        requests.filter(
            request =>
                request["Repair Status"] ===
                "Completed"
        ).length;


    document.getElementById(
        "totalCustomers"
    ).textContent =
        totalCustomers;


    document.getElementById(
        "pendingRepairs"
    ).textContent =
        pendingRepairs;


    document.getElementById(
        "inProgressRepairs"
    ).textContent =
        inProgressRepairs;


    document.getElementById(
        "completedRepairs"
    ).textContent =
        completedRepairs;

}
function displayRecentRequests(requests) {


    const table =
        document.getElementById(
            "serviceRequestsTable"
        );


    table.innerHTML = "";


    /* NO REQUESTS */

    if (requests.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center;">

                    No service requests found.

                </td>

            </tr>

        `;

        return;

    }


    /* DISPLAY ONLY 10 LATEST */

    const recentRequests =
        requests.slice(0, 10);


    recentRequests.forEach(
        request => {


            const row =
                document.createElement("tr");


            const jobId =
                request["Job ID"] || "-";


            const customer =
                request["Customer Name"] || "-";


            const deviceBrand =
                request["Device Brand"] || "";


            const deviceModel =
                request["Device Model"] || "";


            const service =
                request["Service Required"] || "-";


            const status =
                request["Repair Status"] || "Pending";


            row.innerHTML = `

                <td>
                    ${jobId}
                </td>


                <td>
                    ${customer}
                </td>


                <td>
                    ${deviceBrand}
                    ${deviceModel}
                </td>


                <td>
                    ${service}
                </td>


                <td>

                    <span class="status
                        ${getStatusClass(status)}">

                        ${status}

                    </span>

                </td>


                <td>

                    <button
                        class="view-btn">

                        View

                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );

}
function getStatusClass(status) {


    switch (status) {


        case "Pending":

            return "pending-status";


        case "Diagnosing":

            return "diagnosing-status";


        case "In Progress":

            return "progress-status";


        case "Completed":

            return "completed-status";


        default:

            return "pending-status";

    }

}
document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboardData();

    }
);
