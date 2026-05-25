document.addEventListener("DOMContentLoaded", () => {

    // =====================
    // Contact Form
    // =====================
  
    const contactForm =
      document.querySelector(".contact-form");
  
    const contactFormMessage =
      document.querySelector(".contact-form__message");
  
    if (contactForm && contactFormMessage) {
  
      contactForm.addEventListener(
        "submit",
        (event) => {
  
          event.preventDefault();
  
          if (!contactForm.checkValidity()) {
  
            contactForm.reportValidity();
  
            return;
          }
  
          contactForm.reset();
  
          contactFormMessage.hidden = false;
  
          contactFormMessage.focus?.();
        }
      );
    }
  
  });