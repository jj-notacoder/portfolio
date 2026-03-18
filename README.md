# Cinematic Portfolio - Jesher Jebson 🎥

A deeply interactive, highly cinematic personal portfolio engineered to feel more like an A24 title sequence or an Apple Keynote than a traditional website. Built completely from the ground up using **Next.js (App Router)**, **Framer Motion**, **Tailwind CSS**, and raw **Canvas APIs**.

## 🌟 The Experience

*   **Cinematic Scrollytelling**: Two distinct image-sequence `<canvas>` renders (a massive Hero opener and a compact Contact Outro) mathematically bound to scroll position. Pre-rendered frame sequences are linearly interpolated (`lerp`) through `requestAnimationFrame` for buttery-smooth scrubbing tied exactly to viewport movement.
*   **"From the Abyss" 3D Cards**: Advanced hover interactions powered by vanilla JavaScript coordinate mapping within React. Cards independently track the user's cursor (`mousemove`) across a custom CSS 3D plane (`perspective: 1200px`), delivering genuine tilt depth, a perpetually spinning conic-border underglow, and a volumetric inner glow source accurately displacing beneath your cursor.
*   **The Arsenal (Dynamic Carousel)**: An ultra-customized `500vh` sticky section utilizing strict CSS and Frame Motion offsets to build a 3-dimensional stacking slider without relying on external carousel libraries. Cards dynamically adjust their `scale`, `translateX`, `rotateY`, and `blur` based natively on horizontal tracking distance.
*   **Horizontal Scroll Track**: A `300vw` wide experience timeline mounted within a sticky scrolling block, seamlessly translating vertical height into lateral motion.
*   **Volumetric Glassmorphism**: Global implementation of deep void aesthetics utilizing dark blurred backing profiles stacked with luminous cyan and gold linear gradients.

## 🛠️ Tech Stack & Architecture

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Directory Paradigm)
*   **Styling Engine**: [Tailwind CSS](https://tailwindcss.com/) mapped to complex CSS variables and raw CSS `@keyframes` interpolation.
*   **Animation Layer**: [Framer Motion](https://www.framer.com/motion/) handling `whileInView` staggered sequences, interpolation curves, and scroll binding alongside `requestAnimationFrame`.
*   **System Tracking**: Native Intersection Observers and absolute bounds client rendering via standard DOM refs.
*   **Typography**: *Clash Display* (Primary headings) matched against *DM Sans* (Body legibility).

## 🚀 Running Locally

To experience the cinematic scroll locally on your machine:

1.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Start the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

3.  **Explore**: Open [http://localhost:3000](http://localhost:3000) inside your browser. 
    *(Note: For the frame-by-frame canvas rendering to function perfectly, ensure your `frames/` directories are securely placed in the `public` folder mirroring the code indices).*

## 💡 System Design Notes

*   **Z-Index Sandboxing**: The site operates on a strict tri-layer architectural rule. The raw `<canvas>` feeds sit completely divorced at `z-index: 0`. Dark translucent gradient overlays manage readability at `z-index: 10`, while all actual interactive React DOM nodes float purely in `z-index: 30+`.
*   **Vanilla JS over React Overhead**: Complex sub-frame events (specifically the intense `mousemove` tracking responsible for the 3D abyss cards and the underlying image sequence tracking) bypass standard rapid-fire React state updates in favor of direct DOM `ref` manipulation to guarantee flawless 144hz rendering on desktop without garbage collection stuttering.

---
© 2026 Jesher Jebson · Crafted in Abu Dhabi, UAE.
