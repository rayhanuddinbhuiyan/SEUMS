# Custom Dashboard Icons Directory

Upload all your personally made dashboard icons (PNG, SVG, JPG, etc.) into this specific folder!

## How to use:

1. Place your icon files here (e.g. `lecture.svg`, `attendance.png`, `syllabus.svg`).
2. Open `src/pages/student/StudentDashboard.jsx`.
3. Import the icon at the top of the file:
   ```javascript
   import customLectureIcon from "../../assets/icons/lecture.svg";
   ```
4. Assign it to your `menuItems` list:
   ```javascript
   const menuItems = [
       { icon: customLectureIcon, label: "Today's Lecture",  route: "/student/lecture" },
       ...
   ];
   ```

The dashboard will automatically render your custom image with responsive sizing and elegant hover animations!
