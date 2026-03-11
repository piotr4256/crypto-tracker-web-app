import React, { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const AnimatedBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log("Particles container loaded", container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            interactivity: {
                detectsOn: "window",
                events: {
                    onHover: {
                        enable: true,
                        mode: "attract",
                    },
                    resize: true,
                },
                modes: {
                    attract: {
                        distance: 200,
                        duration: 0.4,
                        factor: 1,
                    },
                },
            },
            particles: {
                color: {
                    value: ["#00d4ff", "#b026ff", "#00ff88"],
                },
                links: {
                    color: "#00d4ff",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 1.5,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 50,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
                shadow: {
                   enable: true,
                   color: "#00d4ff",
                   blur: 10
                }
            },
            detectRetina: true,
        }),
        []
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
                particlesLoaded={particlesLoaded}
                options={options}
            />
        );
    }

    return null;
};

export default AnimatedBackground;
