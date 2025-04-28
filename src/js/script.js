// Initialize AOS animation library
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
})

// Get current year for footer
document.getElementById("datee").textContent = new Date().getFullYear()

// Toggle theme
const themeSwitch = document.getElementById("switch")
const body = document.body

// Check for saved theme preference or use default
const currentTheme = localStorage.getItem("theme")
if (currentTheme) {
  body.classList.add(currentTheme)
  if (currentTheme === "dark-mode") {
    themeSwitch.checked = true
  }
}

// Theme switch functionality
themeSwitch.addEventListener("change", function () {
  if (this.checked) {
    body.classList.add("dark-mode")
    localStorage.setItem("theme", "dark-mode")
  } else {
    body.classList.remove("dark-mode")
    localStorage.setItem("theme", "light")
  }
})

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking a nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Dropdown menu for mobile
const dropdownItems = document.querySelectorAll(".dropdown")

dropdownItems.forEach((item) => {
  const link = item.querySelector(".nav-link")

  // For mobile devices
  if (window.innerWidth < 768) {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      item.classList.toggle("active")
    })
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        })
      }
    }
  })
})

// Add active class to nav items on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Back to top button
const backToTopButton = document.querySelector(".back-to-top")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("active")
  } else {
    backToTopButton.classList.remove("active")
  }
})

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    button.classList.add("active")

    const filterValue = button.getAttribute("data-filter")

    projectCards.forEach((card) => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 100)
      } else {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  })
})

// Testimonial slider functionality
const testimonialDots = document.querySelectorAll(".dot")
const testimonialCards = document.querySelectorAll(".testimonial-card")
const prevButton = document.querySelector(".testimonial-prev")
const nextButton = document.querySelector(".testimonial-next")

let currentSlide = 0
const totalSlides = testimonialCards.length

// Initialize testimonial slider
function showSlide(index) {
  // Hide all slides
  testimonialCards.forEach((card) => {
    card.style.display = "none"
  })

  // Remove active class from all dots
  testimonialDots.forEach((dot) => {
    dot.classList.remove("active")
  })

  // Show current slide and activate corresponding dot
  testimonialCards[index].style.display = "block"
  testimonialDots[index].classList.add("active")
}

// Show first slide initially
showSlide(currentSlide)

// Next slide
nextButton.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides
  showSlide(currentSlide)
})

// Previous slide
prevButton.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  showSlide(currentSlide)
})

// Click on dots to navigate
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
  })
})

// Form validation
const contactForm = document.getElementById("contactForm")
const formStatus = document.querySelector(".form-status")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Reset previous error messages
    document.querySelectorAll(".error-message").forEach((error) => {
      error.style.display = "none"
    })

    // Get form fields
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const subject = document.getElementById("subject")
    const message = document.getElementById("message")

    let isValid = true

    // Validate name
    if (name.value.trim() === "") {
      showError(name, "Name is required")
      isValid = false
    }

    // Validate email
    if (email.value.trim() === "") {
      showError(email, "Email is required")
      isValid = false
    } else if (!isValidEmail(email.value)) {
      showError(email, "Please enter a valid email address")
      isValid = false
    }

    // Validate subject
    if (subject.value.trim() === "") {
      showError(subject, "Subject is required")
      isValid = false
    }

    // Validate message
    if (message.value.trim() === "") {
      showError(message, "Message is required")
      isValid = false
    }

    // If form is valid, submit it
    if (isValid) {
      // In a real application, you would send the form data to a server here
      // For demo purposes, we'll just show a success message
      formStatus.textContent = "Your message has been sent successfully!"
      formStatus.classList.add("success")
      contactForm.reset()

      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = ""
        formStatus.classList.remove("success")
      }, 5000)
    }
  })
}

// Show error message
function showError(field, message) {
  const errorElement = field.nextElementSibling
  errorElement.textContent = message
  errorElement.style.display = "block"
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Animate skill progress bars when they come into view
const skillProgressBars = document.querySelectorAll(".skill-progress .progress")

const animateProgressBars = () => {
  skillProgressBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect()
    const isInView = rect.top <= window.innerHeight && rect.bottom >= 0

    if (isInView) {
      const width = bar.style.width
      bar.style.width = "0"
      setTimeout(() => {
        bar.style.width = width
      }, 100)
    }
  })
}

// Run once on page load
animateProgressBars()

// Run on scroll
window.addEventListener("scroll", animateProgressBars)
