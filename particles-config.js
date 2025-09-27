particlesJS('particles-js',
{
    "particles": {
        "number": {
            "value": 80,  // Increased number of particles
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"  // Changed to white for better visibility
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.4,  // Increased base opacity
            "random": false,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.2,  // Increased minimum opacity
                "sync": false
            }
        },
        "size": {
            "value": 4,  // Increased particle size
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.5,  // Increased minimum size
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",  // Changed to white
            "opacity": 0.3,  // Increased line opacity
            "width": 1.5  // Increased line width
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 0.8  // Increased interaction opacity
                }
            },
            "push": {
                "particles_nb": 4  // Increased particles added on click
            }
        }
    },
    "retina_detect": true
});
