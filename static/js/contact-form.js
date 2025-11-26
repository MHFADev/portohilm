// ============================================================================
// Contact Form Handler with EmailJS
// ============================================================================
// This script handles form submissions using EmailJS service for sending emails
// directly from the client-side without needing a backend email server.
//
// SETUP INSTRUCTIONS:
// 1. Create a FREE account at https://www.emailjs.com/
// 2. Add an Email Service (Gmail recommended):
//    - Go to https://dashboard.emailjs.com/admin
//    - Click "Email Services" → "Add New Service"
//    - Select Gmail and connect your account
//    - Copy the SERVICE ID (e.g., 'service_abc1234')
//
// 3. Create an Email Template:
//    - Go to "Email Templates" → "Create New Template"
//    - Design your template using variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//    - Copy the TEMPLATE ID (e.g., 'template_xyz5678')
//
// 4. Get your Public Key:
//    - Click your profile icon → "Account"
//    - Find "API Keys" section
//    - Copy the PUBLIC KEY (e.g., 'abcD1234EfGh5678')
//
// 5. Replace the placeholder values below with your actual credentials
//
// For detailed setup guide, see EMAILJS_SETUP.md in the project root
// ============================================================================

// ============================================================================
// EMAILJS CONFIGURATION
// ============================================================================
// Replace these placeholder values with your actual EmailJS credentials
// Get them from: https://dashboard.emailjs.com/

const EMAILJS_CONFIG = {
    serviceID: "service_e7rkx8l", // From: Email Services → Your Service → Service ID
    templateID: "template_09qycw9", // From: Email Templates → Your Template → Template ID
    publicKey: "9BaQW6pK1Z1tAbR6e", // From: Account → API Keys → Public Key
};

// ============================================================================
// Configuration Check Function
// ============================================================================
// Validates that EmailJS credentials have been properly configured
function checkEmailJSConfiguration() {
    const isConfigured =
        EMAILJS_CONFIG.serviceID.trim() !== "" &&
        EMAILJS_CONFIG.templateID.trim() !== "" &&
        EMAILJS_CONFIG.publicKey.trim() !== "";

    if (!isConfigured) {
        console.warn("⚠️ EmailJS NOT CONFIGURED!");
        console.warn("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.warn(
            "The contact form will NOT work until you set up EmailJS credentials.",
        );
        console.warn("");
        console.warn("📋 Quick Setup Guide:");
        console.warn(
            "1. Go to https://www.emailjs.com/ and create a FREE account",
        );
        console.warn("2. Add an Email Service (Gmail recommended)");
        console.warn("3. Create an Email Template");
        console.warn("4. Get your credentials from the dashboard");
        console.warn("5. Update EMAILJS_CONFIG in static/js/contact-form.js");
        console.warn("");
        console.warn("📖 For detailed instructions, see EMAILJS_SETUP.md");
        console.warn("🔗 Dashboard: https://dashboard.emailjs.com/");
        console.warn("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        return false;
    }

    console.log("✅ EmailJS dikonfigurasi dengan baik!");
    console.log("📧 Form kontak siap mengirim email!");
    return true;
}

// ============================================================================
// EmailJS SDK Initialization Check
// ============================================================================
// Ensures the EmailJS library is properly loaded before attempting to use it
function checkEmailJSLibrary() {
    if (typeof emailjs === "undefined") {
        console.error("❌ EmailJS library not loaded!");
        console.error(
            "Make sure the EmailJS SDK script is included in your HTML:",
        );
        console.error(
            '<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>',
        );
        return false;
    }

    console.log("✅ EmailJS library loaded successfully");
    return true;
}

// ============================================================================
// Initialize EmailJS
// ============================================================================
// This function runs when the page loads to set up EmailJS and verify configuration
function initializeEmailJS() {
    console.log("🚀 Initializing EmailJS Contact Form...");

    // Check if EmailJS library is loaded
    if (!checkEmailJSLibrary()) {
        return false;
    }

    // Check if credentials are configured
    const isConfigured = checkEmailJSConfiguration();

    if (isConfigured) {
        try {
            // Initialize EmailJS with the public key
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log("✅ EmailJS initialized successfully");
            console.log("📧 Contact form is ready to send emails!");
            return true;
        } catch (error) {
            console.error("❌ Failed to initialize EmailJS:", error);
            console.error("Please verify your PUBLIC KEY is correct");
            return false;
        }
    }

    return false;
}

// ============================================================================
// Form Submission Handler
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Initialize EmailJS when page loads
    const isEmailJSReady = initializeEmailJS();

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            console.log("📨 Form submission started...");

            // Clear previous errors and messages
            clearErrors();
            hideMessage();

            // Check if EmailJS is configured before proceeding
            if (!isEmailJSReady) {
                console.error("❌ Cannot send email: EmailJS not configured");
                showMessage(
                    "Maaf, form kontak belum dikonfigurasi. Silakan hubungi administrator website. (EmailJS credentials missing)",
                    "error",
                );
                return;
            }

            // Get form data
            const formData = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                subject: document.getElementById("subject").value.trim(),
                message: document.getElementById("message").value.trim(),
            };

            console.log("📝 Form data collected:", {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                messageLength: formData.message.length + " characters",
            });

            // Validate form
            if (!validateForm(formData)) {
                console.warn("⚠️ Form validation failed");
                return;
            }

            console.log("✅ Form validation passed");

            // Show loading state
            setLoadingState(true);

            try {
                console.log("📤 Sending email via EmailJS...");
                console.log("Service ID:", EMAILJS_CONFIG.serviceID);
                console.log("Template ID:", EMAILJS_CONFIG.templateID);

                const templateParams = {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: "M. Hilmi F.Adi",
                };

                // Send email using EmailJS
                const response = await emailjs.send(
                    EMAILJS_CONFIG.serviceID,
                    EMAILJS_CONFIG.templateID,
                    templateParams,
                );

                console.log("✅ Email sent successfully!", response);
                showMessage(
                    "Pesan Anda berhasil dikirim! Terima kasih telah menghubungi saya. Saya akan segera membalas.",
                    "success",
                );
                contactForm.reset();
            } catch (error) {
                console.error("❌ Failed to send email:", error);

                // Provide specific error guidance
                let errorMessage = "Terjadi kesalahan saat mengirim pesan. ";

                if (error.text) {
                    console.error("Error details:", error.text);

                    // Provide helpful messages based on error type
                    if (
                        error.text.includes("Invalid") ||
                        error.text.includes("not found")
                    ) {
                        errorMessage +=
                            "Kredensial EmailJS tidak valid. Silakan periksa konfigurasi.";
                        console.error(
                            "💡 TIP: Verify your Service ID, Template ID, and Public Key in contact-form.js",
                        );
                    } else if (error.text.includes("limit")) {
                        errorMessage +=
                            "Batas pengiriman email tercapai. Silakan coba lagi nanti.";
                        console.error(
                            "💡 TIP: EmailJS free plan has a limit of 200 emails/month",
                        );
                    } else {
                        errorMessage += "Silakan coba lagi nanti.";
                    }
                } else {
                    errorMessage += "Silakan coba lagi nanti.";
                }

                showMessage(errorMessage, "error");
            } finally {
                setLoadingState(false);
            }
        });
    } else {
        console.warn("⚠️ Contact form element not found on this page");
    }
});

function validateForm(data) {
    let isValid = true;

    // Validate name
    if (data.name.length < 2) {
        showError("nameError", "Nama harus minimal 2 karakter");
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError("emailError", "Email tidak valid");
        isValid = false;
    }

    // Validate subject
    if (data.subject.length < 3) {
        showError("subjectError", "Subjek harus minimal 3 karakter");
        isValid = false;
    }

    // Validate message
    if (data.message.length < 10) {
        showError("messageError", "Pesan harus minimal 10 karakter");
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll(".form-error");
    errorElements.forEach((element) => {
        element.textContent = "";
        element.style.display = "none";
    });
}

function showMessage(message, type) {
    const messageElement = document.getElementById("formMessage");
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.classList.remove("hidden");

        // Auto-hide success message after 5 seconds
        if (type === "success") {
            setTimeout(() => {
                hideMessage();
            }, 5000);
        }
    }
}

function hideMessage() {
    const messageElement = document.getElementById("formMessage");
    if (messageElement) {
        messageElement.classList.add("hidden");
    }
}

function setLoadingState(isLoading) {
    const submitBtn = document.querySelector(".submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    if (isLoading) {
        submitBtn.disabled = true;
        btnText.classList.add("hidden");
        btnLoading.classList.remove("hidden");
    } else {
        submitBtn.disabled = false;
        btnText.classList.remove("hidden");
        btnLoading.classList.add("hidden");
    }
}
