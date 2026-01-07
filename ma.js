const form = document.getElementById("express-checkout-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycbyC179jeI111CUvp4ynkNvu6g5wMdq4nKIo4u3iVW2LFBw_JTrET3Gta0haE00VQ30m/exec", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.result === "success") {
      alert("✅ تم تسجيل الطلب بنجاح");
      form.reset();
    } else {
      alert("❌ وقع مشكل");
      console.error(data);
    }
  })
  .catch(error => {
    alert("❌ وقع خطأ في الإرسال");
    console.error(error);
  });
});
