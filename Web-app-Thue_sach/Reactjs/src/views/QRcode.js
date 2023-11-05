import React from 'react';
const wrapper = document.querySelector('.wrapper');
const qrInput = document.querySelector('.form input')
const generateButton = document.querySelector('.form button')
const qrImg = document.querySelector('.qr-code img')

generateButton.addEventListener('click', () => {
    let qrValue = qrInput.value;
    if (!qrValue) return;

    generateButton.innerHTML = "Generating QR code..."

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;

    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateButton.innerText = "Generate QR Code";
    })

    wrapper.classList.add('active')
})

qrInput.addEventListener("keyup", () => {
    if (qrInput.value) {
        wrapper.classList.remove("active")
    }
})


export default function QRcode() {
    return (
        <div className="wrapper">
            <header>
                <h1>QR Code Generator</h1>
                <p>Paste a url or enter a text to create a QR code</p>
            </header>
            <div className="form">
                <input type="text" placeholder="Enter text or url" />
                <button>Generate QR Code</button>
            </div>
            <div className="qr-code">
                <img src="" alt="qr-code" />
            </div>
        </div>
    )
}
