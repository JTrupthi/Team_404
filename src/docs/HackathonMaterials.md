# SymptomMapper 3D - Hackathon Materials

## 1. Project Summary (120 words)
SymptomMapper 3D is a teleconsultation logging tool designed to bridge the communication gap between patients and doctors during remote visits. Patients often struggle to accurately convey specific pain locations or symptom severity over camera or text. Our solution provides an interactive, 3D anatomical viewer that allows patients to visually select affected body regions and log precise symptoms, including severity and duration. The platform aggregates these inputs into a clean, structured symptom report that can be exported as a PDF or shared directly with healthcare providers. Built with React and Three.js, SymptomMapper 3D accelerates diagnosis, minimizes communication errors, and provides a more intuitive way to capture patient health data before the consultation even begins.

## 2. 5 Demo Talking Points
1. **The Problem:** Point out how hard it is to say "my upper back near the left side hurts" instead of just pointing to it.
2. **Interactive 3D Mannequin:** Show how users can fluidly rotate the simple, optimized 3D body structure and click on any region.
3. **Structured Symptom Input:** Demonstrate logging a symptom with the modal form. Highlight the intuitive severity slider.
4. **Visual Severity Mapping:** Show off the color-coded feedback on the 3D model (yellow to red) based on the logged severity.
5. **Report Generation:** Click 'Generate Report' and download the PDF. Emphasize how much time this saves the doctor by providing a pre-consultation summary.

## 3. 5 Likely Judge Questions and Answers

### Q: Why use 3D instead of just a 2D image map?
**A:** A 3D model allows for much better spatial awareness, especially for the sides and back of joints or torso. Rotating the body replicates the physical exam experience much closer than a static 2D image.

### Q: Is this HIPAA compliant or secure?
**A:** This specific demo is fully localized and runs entirely in the browser using client-side state. No patient data is sent to a backend or saved in a database, ensuring immediate privacy. In a real deployment, we would use an encrypted backend.

### Q: How does this help doctors?
**A:** Doctors spend less time trying to understand where it hurts. The structured PDF gives them the 'Subjective' portion of their SOAP notes immediately, allowing them to focus on the diagnosis rather than data entry.

### Q: Does it work on mobile?
**A:** Yes, the UI is responsive. The 3D viewer supports touch interactions (drag to rotate, tap to select), and the side panel stacks cleanly underneath the viewer on smaller screens.

### Q: How did you build the 3D model?
**A:** We deliberately avoided overly realistic and heavy 3D assets to keep the app highly performant and the code understandable. We used React Three Fiber to compose a stylized mannequin using basic geometric primitives, which ensures fast load times and reliable interaction.
