document.addEventListener("DOMContentLoaded", () => {
  const apiuri =
    "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";

  let currentRowToDelete = null; // To store the row to be deleted

  // Get the modal and buttons
  const modal = document.getElementById("deleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");
  const closeModalBtn = document.querySelector(".close-modal");

  // Function to open the modal
  function openModal(row) {
    currentRowToDelete = row;
    modal.style.display = "flex";
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
    currentRowToDelete = null;
  }

  // Event listeners for modal buttons
  confirmDeleteBtn.addEventListener("click", () => {
    if (currentRowToDelete) {
      const tbody = document.querySelector("#poduct-table tbody");
      tbody.removeChild(currentRowToDelete);
      updateCartTotal(); // Update cart total
      closeModal();
    }
  });

  cancelDeleteBtn.addEventListener("click", closeModal);
  closeModalBtn.addEventListener("click", closeModal);

  // Close modal if clicked outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  fetch(apiuri)
    .then((res) => res.json())
    .then((data) => {
      const items = data.items;

      if (!items || items.length === 0) {
        console.error("No items found in the API response.");
        return;
      }

      const tbody = document.querySelector("#poduct-table tbody");

      items.forEach((item) => {
        const row = document.createElement("tr");

        // Product
        const productCell = document.createElement("td");
        productCell.classList = "image-td";
        const productImage = document.createElement("img");
        productImage.src = item.image;
        productCell.appendChild(productImage);
        const productName = document.createElement("span");
        productName.textContent = item.title || "N/A";
        productCell.appendChild(productName);
        row.appendChild(productCell);

        // Price
        const priceCell = document.createElement("td");
        priceCell.textContent = `Rs.${(item.price / 100).toLocaleString()}.00`;
        row.appendChild(priceCell);

        // Quantity
        const quantityCell = document.createElement("td");
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.classList = "quantity-input";
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener("input", function () {
          updateSubtotal(row, item.price);
        });
        quantityCell.appendChild(quantityInput);
        row.appendChild(quantityCell);

        // Subtotal
        const subtotalCell = document.createElement("td");
        subtotalCell.classList = "subtotalCell";
        subtotalCell.textContent = `Rs.${(
          (item.price * item.quantity) /
          100
        ).toLocaleString()}.00`;
        row.appendChild(subtotalCell);

        // Delete button cell
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "assets/icons/delete.png";
        deleteIcon.alt = "Delete";
        deleteIcon.style.width = "21px";
        deleteIcon.style.height = "21.88px";
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener("click", function () {
          openModal(row);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tbody.appendChild(row);
      });

      updateCartTotal();
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function updateSubtotal(row, price) {
  const quantityInput = row.querySelector(".quantity-input");
  const subtotalCell = row.querySelector(".subtotalCell");
  const quantity = parseInt(quantityInput.value, 10) || 0;
  const subtotal = (price * quantity) / 100;
  subtotalCell.textContent = `Rs.${subtotal.toLocaleString()}.00`;

  updateCartTotal();
}

function updateCartTotal() {
  const subtotalCells = document.querySelectorAll(".subtotalCell");
  let total = 0;

  subtotalCells.forEach((cell) => {
    total += parseFloat(cell.textContent.replace("Rs.", "").replace(/,/g, ""));
  });

  document.querySelector(
    "#subtotal"
  ).textContent = `Rs.${total.toLocaleString()}.00`;
  document.querySelector(
    "#total"
  ).textContent = `Rs.${total.toLocaleString()}.00`;
}
