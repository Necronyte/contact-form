document.addEventListener("DOMContentLoaded", function () {
    // Radio butonları (Önceden eklediğin kod burada kalıyor)
    const radioOptions = document.querySelectorAll(".radio-option");
    radioOptions.forEach((option) => {
      const radio = option.querySelector("input[type='radio']");
      const icon = option.querySelector(".radio-icon");
      option.addEventListener("click", function () {
        document.querySelectorAll(".radio-option").forEach((opt) => {
          opt.querySelector("input[type='radio']").style.display = "inline-block";
          opt.querySelector(".radio-icon").style.display = "none";
        });
        radio.style.display = "none";
        icon.style.display = "inline-block";
        radio.checked = true;
      });
    });

    const checkboxOptions = document.querySelectorAll(".checkbox-container");
    checkboxOptions.forEach((option) => {
        const checkbox = option.querySelector("input[type='checkbox']");
        const icon = option.querySelector(".checkbox-icon");
        option.addEventListener("click",function(){
            document.querySelectorAll(".checkbox-container").forEach((opt) => {
                opt.querySelector("input[type='checkbox']").style.display = "inline-block";
                opt.querySelector(".checkbox-icon").style.display = "none";
            });
            checkbox.style.display = "none";
            icon.style.display = "inline-block";
            radio.checked = true;
        });
    });
  
    // Form alanları
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const consent = document.getElementById("consent");
    const queryTypeRadios = document.querySelectorAll("input[name='query-type']");

    // Hata mesajı elementleri
    const firstNameError = document.querySelector(".firstname-error");
    const lastNameError = document.querySelector(".lastname-error");
    const emailError = document.querySelector(".email-error");
    const queryTypeError = document.querySelector(".querytype-error");
    const messageError = document.querySelector(".messagebox-error");
    const consentError = document.querySelector(".checkbox-error");

    // Submit butonu
    const submitButton = document.querySelector("button[type='submit']");

    submitButton.addEventListener("click", function(e){
        e.preventDefault();
        let valid = true;

        // First Name kontrolü
        if(firstName.value.trim() === ""){
            valid = false;
            firstName.classList.add("error");
            firstNameError.style.display = "block";
        }else{
            firstName.classList.remove("error");
            firstNameError.style.display = "none";
        }

        // Last Name kontrolü
        if(lastName.value.trim() === ""){
            valid = false;
            lastName.classList.add("error");
            lastNameError.style.display = "block";
        } else{
            lastName.classList.remove("error");
            lastNameError.style.display = "none";
        }

        // Email kontrolü (basit regex ile)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.value.trim() === "" || !emailRegex.test(email.value.trim())){
            valid = false;
            email.classList.add("error");
            emailError.style.display = "block";
        } else{
            email.classList.remove("error");
            emailError.style.display = "none";
        }

        // Query Type kontrolü
        let querySelected = false;
        queryTypeRadios.forEach((radio) => {
            if(radio.checked){
                querySelected = true;
            }
        });
        if(!querySelected){
            valid = false;
            // Hata için radio-group container'a error sınıfı ekleyebiliriz
            document.querySelector(".radio-group").classList.add("error");
            queryTypeError.style.display = "block";
        } else{
            document.querySelector(".radio-group").classList.remove("error");
            queryTypeError.style.display = "none";
        }

        // Message kontrolü
        if(message.value.trim() === ""){
            valid = false;
            message.classList.add("error");
            messageError.style.display = "block";
        } else{
            message.classList.remove("error");
            messageError.style.display = "none";
        }

        // Consent kontrolü
        if(!consent.checked){
            valid = false;
            document.querySelector(".checkbox-container").classList.add("error");
            consentError.style.display = "block";
        } else{
            document.querySelector(".checkbox-container").classList.remove("error");
            consentError.style.display = "none";
        }

        // Eğer tüm alanlar geçerliyse, hata mesajlarını kaldır ve form alanlarını temizle
        if(valid){
            // Hata mesajları zaten gizlendi
            firstName.value = "";
            lastName.value = "";
            email.value = "";
            message.value = "";
            consent.checked = false;

            // Radio butonlarını resetle: her birini görünür hale getir ve ikonları gizle
            queryTypeRadios.forEach((radio) => {
                radio.checked = false;
                radio.style.display = "inline-block";
            });
            document.querySelectorAll(".radio-icon").forEach((icon) => {
                icon.style.display = "none";
            });
            document.getElementById("messagesent-container").style.display = "block";
        }
    });
});