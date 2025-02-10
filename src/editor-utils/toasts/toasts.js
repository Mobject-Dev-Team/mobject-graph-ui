import "./toast.css";
export class Toasts {
  constructor(toastContainer) {
    this.toastContainer = toastContainer;
  }

  generateToastId() {
    const randomPart = Math.floor(Math.random() * 1000);
    const id = `${new Date().getTime()}-${randomPart}-toast`;
    return id;
  }

  showToast(title, message, toastType, callbacks = {}) {
    const id = this.generateToastId();
    let bgColor,
      textColor,
      btnColor,
      delay,
      autoHide,
      extraHtml = "";

    // Define styles and behavior based on toastType
    switch (toastType) {
      case "error":
        bgColor = "bg-danger";
        textColor = "text-white";
        btnColor = "btn-close-white";
        delay = 4000;
        autoHide = true;
        break;
      case "warning":
        bgColor = "bg-warning";
        textColor = "text-black";
        btnColor = "btn-close-black";
        delay = 4000;
        autoHide = true;
        break;
      case "success":
        bgColor = "bg-success";
        textColor = "text-white";
        btnColor = "btn-close-white";
        delay = 4000;
        autoHide = true;
        break;
      case "info":
        bgColor = "bg-light";
        textColor = "text-black";
        btnColor = "btn-close-black";
        delay = 4000;
        autoHide = true;
        break;
      case "okCancel":
        bgColor = "bg-light";
        textColor = "text-black";
        btnColor = "btn-close-black";
        delay = 0;
        autoHide = false;
        extraHtml = `
          <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-primary btn-sm me-2" id="${id}-ok-btn">
              OK
            </button>
            <button class="btn btn-secondary btn-sm" id="${id}-cancel-btn">
              Cancel
            </button>
          </div>
        `;
        break;

      default:
        bgColor = "bg-secondary";
        textColor = "text-white";
        btnColor = "btn-close-white";
    }

    const toastHtml = `
            <div id="${id}" class="toast ${bgColor} ${textColor}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="${autoHide}" data-bs-delay="${delay}">
                <div class="toast-header ${bgColor} ${textColor}">
                    <strong class="me-auto">${title}</strong>
                    <button type="button" class="btn-close ${btnColor}" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body ${textColor}">${message}${extraHtml}</div>
            </div>
        `;

    let toastNode = document.createElement("div");
    toastNode.innerHTML = toastHtml;
    this.toastContainer.appendChild(toastNode);

    $(`#${id}`).toast("show");

    this.setupToastEventListeners(id, toastType, callbacks);
  }

  setupToastEventListeners(id, toastType, callbacks) {
    if (toastType === "okCancel") {
      document.getElementById(`${id}-ok-btn`).addEventListener("click", () => {
        if (callbacks.onOk) callbacks.onOk();
        $(`#${id}`).toast("hide");
      });

      document
        .getElementById(`${id}-cancel-btn`)
        .addEventListener("click", () => {
          if (callbacks.onCancel) callbacks.onCancel();
          $(`#${id}`).toast("hide");
        });
    }

    $(`#${id}`).on("hidden.bs.toast", function () {
      this.remove();
    });
  }

  showWarning(title, message) {
    this.showToast(title, message, "warning");
  }

  showError(title, message) {
    this.showToast(title, message, "error");
  }

  showSuccess(title, message) {
    this.showToast(title, message, "success");
  }

  showInfo(title, message) {
    this.showToast(title, message, "info");
  }

  showMessage(title, message) {
    this.showToast(title, message, "");
  }

  showOkCancel(title, message, callbacks) {
    this.showToast(title, message, "okCancel", callbacks);
  }
}
