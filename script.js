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
/* =========================================
   SERVICE DETAILS MODAL
========================================= */

.details-modal-content {

    max-width: 850px;

}


.details-section {

    margin-bottom: 25px;

    padding: 20px;

    border: 1px solid #e5e7eb;

    border-radius: 10px;

    background: #fafafa;

}


.details-section h3 {

    margin-bottom: 20px;

    color: #0b2b55;

    font-size: 17px;

}


.details-section h3 i {

    color: #2563eb;

    margin-right: 8px;

}


.details-grid {

    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 20px;

}


.details-grid div {

    display: flex;

    flex-direction: column;

    gap: 7px;

}


.details-grid span {

    font-size: 12px;

    color: #777;

}


.details-grid strong {

    font-size: 15px;

    color: #222;

    word-break: break-word;

}


.problem-box {

    margin-top: 20px;

    padding: 15px;

    background: white;

    border-radius: 8px;

    border-left: 4px solid #2563eb;

}


.problem-box span {

    font-size: 13px;

    font-weight: bold;

}


.problem-box p {

    margin-top: 8px;

    color: #555;

    line-height: 1.6;

}


.status-update-container {

    display: flex;

    gap: 15px;

}


.status-update-container select {

    flex: 1;

    padding: 12px;

    border: 1px solid #d1d5db;

    border-radius: 8px;

    font-size: 15px;

}


@media (max-width: 768px) {

    .details-grid {

        grid-template-columns: 1fr;

    }


    .status-update-container {

        flex-direction: column;

    }

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

/* =========================================
   SERVICE REQUEST DETAILS
========================================= */


let currentRequest = null;


const detailsModal =
    document.getElementById(
        "detailsModal"
    );


const closeDetailsModal =
    document.getElementById(
        "closeDetailsModal"
    );


function openRequestDetails(request) {


    currentRequest = request;


    document.getElementById(
        "detailsJobId"
    ).textContent =
        request["Job ID"] || "-";


    /* CUSTOMER */

    document.getElementById(
        "detailCustomerName"
    ).textContent =
        request["Customer Name"] || "-";


    document.getElementById(
        "detailPhone"
    ).textContent =
        request["Phone"] || "-";


    document.getElementById(
        "detailEmail"
    ).textContent =
        request["Email"] || "-";


    /* DEVICE */

    document.getElementById(
        "detailBrand"
    ).textContent =
        request["Device Brand"] || "-";


    document.getElementById(
        "detailModel"
    ).textContent =
        request["Device Model"] || "-";


    document.getElementById(
        "detailImei"
    ).textContent =
        request["IMEI / Serial Number"] || "-";


    /* SERVICE */

    document.getElementById(
        "detailServiceType"
    ).textContent =
        request["Service Type"] || "-";


    document.getElementById(
        "detailService"
    ).textContent =
        request["Service Required"] || "-";


    document.getElementById(
        "detailEstimatedCost"
    ).textContent =
        "NLe " +
        (
            request["Estimated Cost"] || 0
        );


    document.getElementById(
        "detailProblem"
    ).textContent =
        request["Problem Description"] || "-";


    /* PAYMENT */

    const estimatedCost =
        Number(
            request["Estimated Cost"]
        ) || 0;


    const amountPaid =
        Number(
            request["Amount Paid"]
        ) || 0;


    const balance =
        estimatedCost -
        amountPaid;


    document.getElementById(
        "detailCost"
    ).textContent =
        "NLe " +
        estimatedCost.toFixed(2);


    document.getElementById(
        "detailAmountPaid"
    ).textContent =
        "NLe " +
        amountPaid.toFixed(2);


    document.getElementById(
        "detailBalance"
    ).textContent =
        "NLe " +
        balance.toFixed(2);


    /* STATUS */

    document.getElementById(
        "updateRepairStatus"
    ).value =
        request["Repair Status"] ||
        "Pending";


    detailsModal.classList.add(
        "show"
    );

}
closeDetailsModal.addEventListener(
    "click",
    function () {

        detailsModal.classList.remove(
            "show"
        );

    }
);


window.addEventListener(
    "click",
    function (event) {

        if (
            event.target === detailsModal
        ) {

            detailsModal.classList.remove(
                "show"
            );

        }

    }
);
const saveStatusBtn =
    document.getElementById(
        "saveStatusBtn"
    );


saveStatusBtn.addEventListener(
    "click",
    async function () {


        if (!currentRequest) {

            return;

        }


        const newStatus =
            document.getElementById(
                "updateRepairStatus"
            ).value;


        const originalText =
            saveStatusBtn.innerHTML;


        saveStatusBtn.disabled =
            true;


        saveStatusBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Updating...';


        try {


            await fetch(
                SCRIPT_URL,
                {

                    method: "POST",

                    mode: "no-cors",

                    headers: {

                        "Content-Type":
                            "text/plain"

                    },

                    body: JSON.stringify({

                        action:
                            "updateStatus",

                        jobId:
                            currentRequest["Job ID"],

                        repairStatus:
                            newStatus

                    })

                }
            );


            alert(
                "Repair status updated successfully."
            );


            detailsModal.classList.remove(
                "show"
            );


            await loadDashboardData();


        }

        catch (error) {


            console.error(
                error
            );


            alert(
                "Unable to update repair status."
            );

        }

        finally {


            saveStatusBtn.disabled =
                false;


            saveStatusBtn.innerHTML =
                originalText;

        }

    }
);
