const mail = document.querySelector('.mail');
const pass = document.querySelector('.pass');
const btn = document.querySelector('.btn');
const datashow = document.querySelector('.datashow');

// جلب البيانات من السيرفر وعرضها
function show() {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => {
      datashow.innerHTML = '';
      data.forEach((user, index) => {
        datashow.innerHTML += `
          <tr>
            <td>${user.mail}</td>
            <td>${user.pass}</td>
          </tr>
        `;
      });
    });
}

btn.addEventListener('click', () => {
  const user = { mail: mail.value, pass: pass.value };

  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) alert(data.error);
      mail.value = '';
      pass.value = '';
      show();
    });
});

// عرض البيانات أول مرة
show();
