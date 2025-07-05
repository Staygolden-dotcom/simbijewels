document.addEventListener("DOMContentLoaded", function () {
  // Product data - single source of truth
  const products = [
    {
      id: 1,
      name: "Aichun Face Serum",
      description: "Nourishing serum with coconut extract for a radiant glow.",
      price: 15000,
      image: "images/serum.jpg",
      category: "skincare",
    },
    {
      id: 2,
      name: "Shimmering Face Set",
      description:
        "Nourishing serum with rose quartz extract for a radiant glow.",
      price: 65000,
      image: "images/shimmering.jpg",
      category: "skincare",
    },
    {
      id: 3,
      name: "Narga Face Set",
      description:
        "Nourishing Facial set with rose quartz extract for a radiant glow.",
      price: 50000,
      image: "images/narga.jpg",
      category: "skincare",
    },
    {
      id: 4,
      name: "Rose-Gold Layered Necklace",
      description: "Elegant 18k gold layered necklace for everyday wear.",
      price: 70000,
      image: "images/necklace1.jpg",
      category: "necklaces",
    },
    {
      id: 5,
      name: "Silver Layered Necklace",
      description: "Elegant Premium silver layered necklace for everyday wear.",
      price: 20000,
      image: "images/necklace2.webp",
      category: "necklaces",
    },
    {
      id: 6,
      name: "silver Layered Necklace",
      description: "Elegant silver layered necklace for everyday wear.",
      price: 10000,
      image: "images/necklace3.jpg",
      category: "necklaces",
    },
    {
      id: 7,
      name: "Pearl Drop Earrings",
      description: "Classic freshwater pearl drop earrings with gold accents.",
      price: 4500,
      image: "images/earring2.jpg",
      category: "earrings",
    },
    {
      id: 8,
      name: "Diamond Stud Earrings",
      description: "Timeless diamond studs in 14k white gold setting.",
      price: 78000,
      image: "images/earring1.jpg",
      category: "earrings",
    },
    {
      id: 9,
      name: "Rose-Diamond Stud Earrings",
      description: "Timeless diamond studs in 14k Rose gold setting.",
      price: 120000,
      image: "images/earring3.jpg",
      category: "earrings",
    },
    {
      id: 10,
      name: "Simple Moisturizer",
      description: "Ultra-hydrating moisturizer with hyaluronic acid complex.",
      price: 5500,
      image: "images/simple.jpg",
      category: "skincare",
    },
    {
      id: 11,
      name: "Vintage Gold Ring",
      description: "Handcrafted vintage-inspired ring with intricate details.",
      price: 8500,
      image: "images/ring.avif",
      category: "rings",
    },
    {
      id: 12,
      name: "Vintage Silver Ring",
      description: "Handcrafted vintage-inspired ring with intricate details.",
      price: 85000,
      image: "images/ring3.webp",
      category: "rings",
    },
    {
      id: 13,
      name: "White diamond Ring",
      description: "Handcrafted diamond ring with intricate details.",
      price: 9000,
      image: "images/ring2.webp",
      category: "rings",
    },
  ];

  // DOM elements
  const productGrid = document.getElementById("productGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cartIcon = document.getElementById("cartIcon");
  const cartCount = document.getElementById("cartCount");
  const cartModal = document.getElementById("cartModal");
  const overlay = document.getElementById("overlay");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const continueShopping = document.getElementById("continueShopping");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Initialize cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Display products function
  function displayProducts(productsArray) {
    productGrid.innerHTML = "";

    productsArray.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <span class="product-price">₦${product.price.toLocaleString()}</span>
          <button class="add-to-cart" data-id="${
            product.id
          }">Add to Cart</button>
        </div>
      `;
      productGrid.appendChild(productCard);
    });

    // Add intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".product-card").forEach((card) => {
      observer.observe(card);
    });
  }

  // Filter products function
  function filterProducts(category) {
    if (category === "all") {
      return products;
    }
    return products.filter((product) => product.category === category);
  }

  // Update cart count
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
  }

  // Update cart modal
  function updateCartModal() {
    if (cart.length === 0) {
      cartItems.innerHTML =
        '<p class="empty-cart-message">Your cart is empty</p>';
      cartTotal.textContent = "₦0";
      return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      total += product.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${product.image}" alt="${
        product.name
      }" class="cart-item-image">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${product.name}</h4>
          <span class="cart-item-price">₦${product.price.toLocaleString()} x ${
        item.quantity
      }</span>
          <button class="cart-item-remove" data-id="${
            product.id
          }">Remove</button>
        </div>
      `;
      cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `₦${total.toLocaleString()}`;
  }

  // Add to cart
  function addToCart(productId) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
    cartModal.classList.add("open");
    overlay.classList.add("active");
  }

  // Remove from cart
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
  }

  // Checkout function
  function checkout() {
    if (cart.length === 0) return;

    const whatsappNumber = "2349165622684";
    let message = "Hi, I'd love to order the following items:\n\n";
    let total = 0;

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      message += `${product.name} – ₦${product.price.toLocaleString()} x ${
        item.quantity
      }\n`;
      total += product.price * item.quantity;
    });

    message += `\nTotal: ₦${total.toLocaleString()}\nLet's proceed `;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  // Initialize - show all products
  displayProducts(products);
  updateCartCount();
  updateCartModal();

  // Filter button event listeners
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter and display products
      const category = button.dataset.category;
      const filteredProducts = filterProducts(category);
      displayProducts(filteredProducts);
    });
  });

  // Add to cart event listener
  productGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    }
  });

  // Remove from cart event listener
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-item-remove")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(productId);
    }
  });

  // Cart icon click
  cartIcon.addEventListener("click", () => {
    cartModal.classList.add("open");
    overlay.classList.add("active");
  });

  // Close cart
  closeCart.addEventListener("click", () => {
    cartModal.classList.remove("open");
    overlay.classList.remove("active");
  });

  // Continue shopping
  continueShopping.addEventListener("click", () => {
    cartModal.classList.remove("open");
    overlay.classList.remove("active");
  });

  // Checkout button
  checkoutBtn.addEventListener("click", checkout);

  // Overlay click
  overlay.addEventListener("click", () => {
    cartModal.classList.remove("open");
    overlay.classList.remove("active");
  });

  // Hamburger menu
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Testimonial slider functionality
  let currentTestimonial = 0;
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialControls = document.querySelectorAll(".testimonial-control");

  function showTestimonial(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    testimonialSlides[index].classList.add("active");

    testimonialControls.forEach((control) =>
      control.classList.remove("active")
    );
    testimonialControls[index].classList.add("active");
  }

  // Auto-rotate testimonials
  const testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
  }, 5000);

  // Testimonial controls
  testimonialControls.forEach((control, index) => {
    control.addEventListener("click", () => {
      clearInterval(testimonialInterval);
      currentTestimonial = index;
      showTestimonial(currentTestimonial);
    });
  });

  // Initialize first testimonial
  showTestimonial(0);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });
});
