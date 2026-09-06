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

serviceForm.addEventListener("submit", function (event) {

    event.preventDefault();


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

        estimatedCost:
            document.getElementById("estimatedCost").value,

        amountPaid:
            document.getElementById("amountPaid").value,

        paymentStatus:
            document.getElementById("paymentStatus").value,

        repairStatus:
            document.getElementById("repairStatus").value,

        problemDescription:
            document.getElementById("problemDescription").value

    };


    console.log("Service Request:", formData);


    alert(
        "Service Request Created Successfully!\n\n" +
        "Job ID: " + formData.jobId
    );


    serviceForm.reset();


    closeModal();

});
