"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, User, Briefcase, Mail, Github, Linkedin } from "lucide-react";

export const Navbar = () => {
    const navItems = [
        { name: "Home", link: "#", icon: <Home className="h-4 w-4" /> },
        { name: "About", link: "#about", icon: <User className="h-4 w-4" /> },
        { name: "Projects", link: "#projects", icon: <Briefcase className="h-4 w-4" /> },
        { name: "Contact", link: "#contact", icon: <Mail className="h-4 w-4" /> },
    ];

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-6 inset-x-0 z-[5000] flex justify-center px-4"
        >
            <nav className="flex items-center gap-1 glass px-6 py-3 rounded-full shadow-2xl">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.link}
                        className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <span className="md:hidden">{item.icon}</span>
                        <span className="hidden md:block">{item.name}</span>
                        <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 bg-primary/5 rounded-full z-[-1] opacity-0 group-hover:opacity-100"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    </Link>
                ))}
                <div className="h-4 w-px bg-border mx-2" />
                <div className="flex items-center gap-3">
                    <a href="https://github.com/Rajapranata512" target="_blank" className="text-muted-foreground hover:text-foreground">
                        <Github className="h-4 w-4" />
                    </a>
                    <a href="https://linkedin.com/in/raja-adi-pranata-507704251/" target="_blank" className="text-muted-foreground hover:text-foreground">
                        <Linkedin className="h-4 w-4" />
                    </a>
                </div>
            </nav>
        </motion.div>
    );
};
