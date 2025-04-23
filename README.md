# Stay Awake

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![TypeScript](https://img.shields.io/badge/code-TypeScript-blue)
![PWA Ready](https://img.shields.io/badge/PWA-ready-green)
![Responsive](https://img.shields.io/badge/Responsive-Design-purple)
![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)


**Stay Awake** is a simple yet powerful web application designed to prevent your device's screen from automatically going into sleep mode. It's perfect for situations where you need your screen to remain active **while actively viewing the tab**, such as reading long articles, monitoring dashboards, or giving a presentation **from the same browser tab**.

> ℹ️ **Note:** The app relies on the Screen Wake Lock API or fallback methods, which require the browser tab to remain in the foreground to be effective.

Beyond its core functionality, Stay Awake provides several handy widgets to enhance your productivity:

- **⏰Digital Clock:** Keep track of the current time and date.
- **🔋Battery Status:** Monitor your device's battery level and charging status (requires browser support).
- **✅To-Do List:** Jot down quick tasks and manage them directly within the app.
- **🍅Pomodoro Timer:** Implement the Pomodoro Technique for focused work sessions and breaks.

The application saves your preferences (like widget visibility, positions, clock format) and To-Do list items locally in your browser. It's also installable as a Progressive Web App (PWA) for an app-like experience.

## 📸 Screenshots
> Here's how Stay Awake looks in action.

<table>
  <tr>
    <th>Almost Sleepy - with all the widgets enabled</th>
    <th>Awake - with all the widgets enabled</th>
  </tr>
  <tr>
    <td><img src="/screenshots/StayAwake_Almost_Sleepy.jpeg" width="500" alt="Stay Awake - Almost Sleepy" /></td>
    <td><img src="/screenshots/StayAwake_Awake.jpeg" width="500" alt="Stay Awake - Awake" /></td>
  </tr>
  <tr>
    <th>Almost Sleepy - with minimal mode enabled</th>
    <th>Awake - with minimal mode enabled</th>
  </tr>
  <tr>
    <td><img src="/screenshots/StayAwake_Minimal_Mode_Almost_Sleepy.jpeg" width="500" alt="Stay Awake - Minimal Mode - Almost Sleepy" /></td>
    <td><img src="/screenshots/StayAwake_Minimal_Mode_Awake.jpeg" width="500" alt="Stay Awake - Minimal Mode - Awake" /></td>
  </tr>
</table>


## 🚀 Features

- **Screen Wake Lock:** Prevents the screen from sleeping **while Stay Awake is the active (foreground) browser tab**, using the Screen Wake Lock API or fallback methods. Ideal for:
  - Reading long articles without interruptions.
  - Keeping dashboards or logs visible.
  - Presenting content from within the Stay Awake tab.
- **Interactive Widgets:**
  - Draggable Clock, Battery, To-Do, and Pomodoro widgets.
  - Resizable To-Do list widget.
  - Persistent widget positions saved in local storage.
  - Toggle widget visibility via settings.
- **Personalization:**
  - Greets you by name (prompts on first visit).
  - Switch between 12-hour and 24-hour clock formats.
- **Minimal Mode:** Hide all widgets for a distraction-free experience.
- **PWA Support:** Installable on desktop and mobile devices for offline access and easy launching.
- **Responsive Design:** Adapts to different screen sizes, from desktop monitors to mobile phones.
- **Shareable:** Easily share the app link via browser's share functionality or by copying the link.

## 🧭 How to Use

1. **Visit the Website:** Open the Stay Awake application in your web browser:  
   🌐 [https://pranavarya37.github.io/StayAwake](https://pranavarya37.github.io/StayAwake)
 
2. **Keep Awake Switch:** The main switch controls the screen wake lock. By default, it's ON, keeping your screen awake. Toggle it OFF if you want your screen to sleep normally.  
3. **Widgets:**
   - **Drag:** Click and hold the header of any widget (except on buttons/icons) to drag it around the screen.
   - **Resize (To-Do):** Click and drag the handle in the bottom-right corner of the To-Do widget to resize it.
   - **Show/Hide:** Click the Settings icon (![Settings Icon](https://i.ibb.co/FkQYL32w/slider-1.png)) in the navbar to toggle individual widget visibility or activate Minimal Mode.
4. **Settings:** Use the Settings dropdown for:
   - Switch between 12/24-hour clock.
   - Toggling widget visibility.
   - Activating Minimal Mode.
   - Copying the app link.
   - Sharing the app.
   - Installing the app (if available).
   - Accessing Help/Troubleshooting.
5. **Install as PWA:** If prompted by your browser, or via the Settings menu, you can install Stay Awake as an app for easier access and offline use.

## 🛠 Technology Stack

- **HTML5:** Structure and content.
- **CSS3:** Styling, layout, responsiveness (using custom properties and flexbox/grid).
- **TypeScript:** Core application logic, state management, and interactivity (compiled to JavaScript).
- **Bootstrap 5:** CSS framework for layout, components (modals, dropdowns), and responsive utilities.
- **Font Awesome 6:** Icons.
- **NoSleep.js (adapted):** Underlying library/logic for the wake lock functionality.
- **Progressive Web App (PWA):** Manifest file and Service Worker for installability and basic offline support.
- **Local Storage:** Storing user preferences, widget state, and To-Do items.

## ⚙️ Development Setup

If you want to run or modify the project locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/PranavArya37/StayAwake.git
    cd StayAwake
    ```

2. **Install Node.js and npm:** If you don't have them, download from [nodejs.org](https://nodejs.org/). This provides `npm`, the package manager.

3. **Install TypeScript:**
    ```bash
    # Global install (optional)
    npm install -g typescript

    # Or install as dev dependency (recommended)
    npm install --save-dev typescript
    ```

4. **Compile TypeScript:**
    ```bash
    # If installed globally
    tsc

    # If installed as dev dependency
    npx tsc

    # Automatically recompile on changes
    npx tsc --watch
    ```

5. **Serve the files:**
    - Using `http-server` (Node.js):
        ```bash
        npx http-server .
        ```
    - Using Python 3:
        ```bash
        python -m http.server
        ```
    - Or using VS Code **Live Server** extension.

6. **Open your browser:** Navigate to the local server address (e.g., `http://localhost:8080` or `http://localhost:8000`).

## ☁️ Deployment Instructions

### 🚀 Deploy on GitHub Pages
1. Push your project to GitHub.
2. Go to your repo **Settings → Pages**.
3. Under "Source", choose the `main` branch and root directory (`/`).
4. Click **Save** — your site will be available at:  
   `https://your-username.github.io/StayAwake`

### 🔥 Deploy on Netlify
1. Go to [https://netlify.com](https://netlify.com)
2. Click "Add New Site" → "Import an Existing Project"
3. Connect your GitHub repository.
4. Use default settings, deploy, and get a custom URL like `stayawake.netlify.app`.

### ☁️ Deploy on Cloudflare Pages
1. Visit [https://pages.cloudflare.com](https://pages.cloudflare.com)
2. Click **"Create a Project"** → Link GitHub → Select repo
3. Choose build settings (usually no build command required)
4. Click **Deploy** → Your app will be hosted at `yourname.pages.dev`


## 🙌 Inspiration & Credits

- Based on [keep-awake](https://github.com/CarolinaMoraes/keep-awake) by Carolina Moraes.
- Inspired by [nosleep.page](https://nosleep.page/).
- Uses wake lock logic adapted from [NoSleep.js](https://github.com/richtr/NoSleep.js).
- Developed by [Pranav Arya](https://pranavarya.in).

## 📄 License

This project is licensed under the MIT License.​

It incorporates or is inspired by the following open-source projects, each also licensed under the MIT License:​

- NoSleep.js by Rich Tibbett</br>
A JavaScript library to prevent display sleep in mobile web browsers.</br>
License: [MIT License](https://github.com/richtr/NoSleep.js/blob/master/LICENSE)

- keep-awake by Carolina Moraes</br>
A web app to prevent screen sleep, utilizing NoSleep.js.</br>
License: [MIT License​](https://github.com/CarolinaMoraes/keep-awake/blob/main/nosleep/LICENSE)

- nosleep.page by Bradley Kemp</br>
A minimalist web page to keep your screen awake.</br>
License: [MIT License](https://github.com/bradleyjkemp/nosleep.page/blob/main/LICENSE)